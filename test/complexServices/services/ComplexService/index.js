export default class ComplexService {
    constructor(services, config) {
        this._value = config.getValue();
        this._secondService = services.getSecondService();
    }

    getValue() {
        return this._value;
    }

    getValueFromSecondService() {
        return this._secondService.getValue();
    }
}