class Config {
    constructor(value) {
        this._value = value;
    }

    getValue() {
        return this._value;
    }
}

export default (config) => {
    return new Config(config.testValue);
}