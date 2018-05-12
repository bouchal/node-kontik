class ServiceTwo {
    constructor(services, config) {
        this._testValue = config.testValue;
    }

    getValue() {
        return this._testValue;
    }
}

module.exports = ServiceTwo;