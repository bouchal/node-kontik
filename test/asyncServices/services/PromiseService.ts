class PromiseService {
    private readonly value?: any;

    constructor(services: any, config: any) {
        this.value = config.testValue;
    }

    getValue() {
        return this.value;
    }
}

export default (services: any, config: any) => {
    return new Promise((resolve, reject) => resolve(new PromiseService(services, config)));
}