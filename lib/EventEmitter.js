import isEqual from 'lodash/isEqual';

function triggerListener(listener, args) {
    return Promise.resolve(listener.callback.apply(listener.context, args));
}
export const ANY = Symbol('any');
export default class EventEmitter {
    constructor() {
        this.listeners = [];
    }

    on(id, callback, context) {
        this.listeners.push({ id, callback, context });
    }

    emit(id, ...args) {
        const promises = this.listeners
            .filter(listener => listener.id === ANY || isEqual(id, listener.id))
            .map(listener => triggerListener(listener, args));
        return Promise.all(promises);
    }

    off(callback) {
        this.listeners = this.listeners.filter(l => l.callback === callback);
    }
}
