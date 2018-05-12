export default class ServiceOne {
    constructor(services) {
        this._complexService = services.ComplexService;
    }

    getValueFromComplexService() {
        this._complexService.getValue();
    }
}