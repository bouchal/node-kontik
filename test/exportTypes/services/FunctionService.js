module.exports = (services, config) => {
    const value = config.testValue;

    return {
        getValue: () => {
            return value
        }
    }
};