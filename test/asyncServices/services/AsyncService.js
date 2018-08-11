class AsyncService {
    constructor(services, config) {
        this._value = config.testValue;
    }

    getValue() {
        return this._value;
    }
}


export default async (services, config) => {
    return new AsyncService(services, config);
}