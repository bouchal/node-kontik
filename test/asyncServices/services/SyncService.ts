class SyncService {
    private readonly value?: any;

    constructor(services: any, config: any) {
        this.value = config.testValue;
    }

    getValue() {
        return this.value
    }
}

module.exports = SyncService;