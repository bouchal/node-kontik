class ServiceOne {
    private readonly predefinedService?: Promise<any>;

    constructor(services: any, config: any) {
        this.predefinedService = services.PredSer;
    }

    async getValueFromPassedService() {
        return (await this.predefinedService).getTestValue();
    }
}

export default ServiceOne;