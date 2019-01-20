export default class PredefinedService {
    private readonly testValue?: any;

    constructor(testValue: any) {
        this.testValue = testValue;
    }

    getTestValue(): any {
        return this.testValue;
    }
}