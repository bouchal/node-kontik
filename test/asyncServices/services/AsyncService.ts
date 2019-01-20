class AsyncService {
    private readonly value?: any;

    constructor(services: any, config: any) {
        this.value = config.testValue;
    }

    getValue() {
        return this.value;
    }
}

export default async (services: any, config: any) => {
    return new AsyncService(services, config);
}