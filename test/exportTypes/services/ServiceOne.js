class ServiceOne {
    constructor(services, config) {
        this._testValue = config.testValue;
    }

    getTestValue() {
        return this._testValue;
    }
}

export default ServiceOne;