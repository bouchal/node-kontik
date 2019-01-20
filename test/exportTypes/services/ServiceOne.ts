class ServiceOne {
    private readonly testValue: any;

    constructor(services: any, config: any) {
        this.testValue = config.testValue;
    }

    getTestValue() {
        return this.testValue;
    }
}

export default ServiceOne;