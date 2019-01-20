export default class DirService {
    private readonly testValue: any;

    constructor(services: any, config: any) {
        this.testValue = config.testValue;
    }

    getTestValue() {
        return this.testValue;
    }
}