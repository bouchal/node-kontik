export default class PredefinedService {
    constructor(testValue) {
        this._testValue = testValue;
    }

    getTestValue() {
        return this._testValue;
    }
}