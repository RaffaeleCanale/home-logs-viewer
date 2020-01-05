// import { getLogger } from 'js-utils/logger';
import isPlainObject from 'lodash/isPlainObject';
import EventEmitter from '~/lib/EventEmitter';

function getLogger(prefix) {
    return {
        info(...args) {
            console.log(prefix, ...args);
        },
        error(...args) {
            console.error(prefix, ...args);
        },
    };
}

function backOff() {
    return 30 * 1000;
}
export default class WsSocket extends EventEmitter {
    constructor(arg) {
        super();
        if (isPlainObject(arg)) {
            this.address = arg.host;
            this.log = getLogger(`socket@${this.address}`);
        } else {
            this.ws = arg;
            // @ts-ignore
            // eslint-disable-next-line
            this.log = getLogger(`socket@${this.ws._socket.remoteAddress}:${this.ws._socket.remotePort}`);
            this.ws.on('message', (data) => {
                try {
                    console.log('<=', JSON.parse(data));
                    this.emit('message', JSON.parse(data));
                } catch (error) {
                    this.log.error(error);
                }
            });
            this.ws.on('error', (error) => {
                this.log.error('Error', error);
                this.disconnect();
            });
            this.ws.on('close', (error) => {
                this.log.error('Connection closed', error);
                this.disconnect();
            });
        }
        this.reconnectCounter = 0;
    }

    connect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = undefined;
        }
        return new Promise((resolve, reject) => {
            if (!this.address) {
                reject(new Error('Socket has no address'));
                return;
            }
            try {
                this.ws = new WebSocket(this.address);
            } catch (error) {
                reject(error);
                return;
            }
            this.ws.onmessage = ({ data }) => {
                try {
                    console.log('<=', JSON.parse(data));
                    this.emit('message', JSON.parse(data));
                } catch (error) {
                    this.log.error(error);
                }
            };
            this.ws.onopen = () => {
                this.log.info('Connected');
                this.reconnectCounter = 0;
                this.emit('connect');
                resolve();
            };
            this.ws.onerror = (error) => {
                this.log.error('Error', error);
                this.disconnect();
                this.tryReconnect();
                reject(error);
            };
            this.ws.onclose = (error) => {
                this.log.error('Connection closed', error);
                this.disconnect();
                this.tryReconnect();
                reject(error);
            };
        });
    }

    async send(message) {
        if (!this.isConnected) {
            if (!this.address) {
                throw new Error('Socket is disconnected');
            }
            await this.connect();
        }

        console.log('=>', message);
        this.ws.send(JSON.stringify(message));
    }

    sendSafe(message) {
        this.send(message)
            .catch(error => this.log.error('Cannot send message', error));
    }

    get isConnected() {
        return !!this.ws;
    }

    disconnect() {
        if (this.ws) {
            this.emit('closed');
            this.ws.close();
            delete this.ws;
            this.ws = undefined;
        }
    }

    tryReconnect() {
        if (this.reconnectTimeout) {
            return;
        }
        this.reconnectCounter += 1;
        const time = backOff(this.reconnectCounter);
        this.log.info('Reconnecting', { counter: this.reconnectCounter, time });
        this.reconnectTimeout = setTimeout(() => this.connect().catch(() => { }), time);
    }
}
