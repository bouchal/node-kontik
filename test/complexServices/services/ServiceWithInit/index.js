import ServiceWithInit from './ServiceWithInit';

export default (services, config) => {
    return new ServiceWithInit(config.testValue, config.testValue);
}