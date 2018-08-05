class SyncService {
    constructor(services, config) {
        this._value = config.testValue;
    }

    getValue() {
        return this._value
    }
}

module.exports = SyncService;