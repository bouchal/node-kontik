class ServiceTwo {
    private readonly testValue: any;

    constructor(services: any, config: any) {
        this.testValue = config.testValue;
    }

    getValue() {
        return this.testValue;
    }
}

module.exports = ServiceTwo;