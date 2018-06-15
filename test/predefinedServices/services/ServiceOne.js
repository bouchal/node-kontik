class ServiceOne {
    constructor(services, config) {
        this._predefinedService = services.PredSer;
    }

    getValueFromPassedService() {
        return this._predefinedService.getTestValue();
    }
}

export default ServiceOne;