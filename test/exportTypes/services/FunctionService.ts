module.exports = (services: any, config: any) => {
    const value = config.testValue;

    return {
        getValue: () => {
            return value
        }
    }
};