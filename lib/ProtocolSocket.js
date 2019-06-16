import WsSocket from '~/lib/WsSocket';

const TIMEOUT = 10000;
const TYPES = {
    HANDSHAKE: 'handshake',
    REQUEST: 'request',
    RESPONSE: 'response',
    MESSAGE: 'message',
};
export class WsHandler {
    onMessage(message, socket) {
        this.onRequest(message, socket);
    }
}
export default class ProtocolSocket extends WsSocket {
    constructor(arg) {
        super(arg);
        this.pendingRequests = {};
        this.lastId = 1;
        // @ts-ignore
        this.handshake = {};
        this.handshake.promise = new Promise((resolve, reject) => {
            this.handshake.resolve = resolve;
            this.handshake.reject = reject;
        });
        this.on('message', message => this.onMessage(message));
        this.on('closed', () => {
            // @ts-ignore
            this.handshake = {};
            this.handshake.promise = new Promise((resolve, reject) => {
                this.handshake.resolve = resolve;
                this.handshake.reject = reject;
            });
        });
    }

    setHandler(handler) {
        this.handler = handler;
    }

    async connect(channelId) {
        channelId = channelId || this.channelId;
        if (!channelId) {
            throw new Error('No channel id specified');
        }
        await super.connect();
        await super.send({
            type: TYPES.HANDSHAKE,
            channelId,
        });
        this.channelId = channelId;
        this.handshake.resolve(channelId);
    }

    waitForHandshake() {
        if (!this.handshake.timeout) {
            this.handshake.timeout = setTimeout(() => {
                if (!this.channelId) {
                    this.handshake.reject(new Error('Handshake timed out'));
                }
            }, TIMEOUT);
        }
        return this.handshake.promise;
    }

    onMessage(message) {
        const { type, content } = message;
        if (type !== TYPES.HANDSHAKE && !this.channelId) {
            this.log.error('Ignore message before handshake', message);
            return;
        }
        switch (type) {
        case TYPES.MESSAGE:
            this.handler.onMessage(content, this);
            break;
        case TYPES.REQUEST:
            this.handleRequest(message);
            break;
        case TYPES.RESPONSE:
            this.handleResponse(message);
            break;
        case TYPES.HANDSHAKE:
            this.handleHandshake(message);
            break;
        default:
            this.log.error('Invalid message type received', message);
            break;
        }
    }

    sendMessage(message) {
        return super.send({ type: TYPES.MESSAGE, content: message });
    }

    sendRequest(request) {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-plusplus
            const id = ++this.lastId;
            const timeout = setTimeout(() => {
                const pendingRequest = this.pendingRequests[id];
                if (pendingRequest) {
                    pendingRequest.reject(new Error('Request timed out'));
                    delete this.pendingRequests[id];
                }
            }, TIMEOUT);
            this.pendingRequests[id] = { resolve, reject, timeout };
            super.send({
                id,
                type: TYPES.REQUEST,
                content: request,
            }).catch((error) => {
                clearTimeout(timeout);
                delete this.pendingRequests[id];
                reject(error);
            });
        });
    }

    handleHandshake(message) {
        if (this.handshake.timeout) {
            clearTimeout(this.handshake.timeout);
            this.handshake.timeout = null;
        }
        const { channelId } = message;
        if (!channelId) {
            this.log.error('Handshake failed, no channel id', message);
            this.handshake.reject(new Error('No channel id provided'));
            return;
        }
        this.channelId = channelId;
        this.handshake.resolve(channelId);
    }

    async handleRequest(message) {
        const { id, content } = message;
        if (!id) {
            this.log.error('Cannot handle request, missing id', message);
            return;
        }
        try {
            const response = await this.handler.onRequest(content, this);
            await super.send({ id, type: TYPES.RESPONSE, response });
        } catch (error) {
            await super.send({ id, type: TYPES.RESPONSE, error: error.message });
        }
    }

    handleResponse(message) {
        const { id, response, error } = message;
        if (!id) {
            this.log.error('Failed to handle response because of missing ID', message);
            return;
        }
        const request = this.pendingRequests[id];
        if (!request) {
            this.log.warn('No request found for response', message);
            return;
        }
        if (error) {
            request.reject(new Error(error));
        } else {
            request.resolve(response);
        }

        clearTimeout(request.timeout);
        delete this.pendingRequests[id];
    }
}
