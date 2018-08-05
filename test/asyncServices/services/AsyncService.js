class AsyncService {
    constructor(services, config) {
        this._value = config.testValue;
    }

    getValue() {
        return this._value;
    }
}


export default (services, config) => {
    return new Promise((resolve, reject) => resolve(new AsyncService(services, config)));
}