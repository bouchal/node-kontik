import kontik from '../../src';
import ServiceOne from "./services/ServiceOne";

const TEST_VALUE = Math.random();

const services = kontik({
    testValue: TEST_VALUE
}, {
    dir: __dirname + '/services'
})

describe('Export types', () => {
    it('should load simple stand alone service exported as ES6 module', async () => {
        const service = await services.ServiceOne;
        if (!(service instanceof ServiceOne)) {
            throw new Error('Services container doesn\'t return right service');
        }
    });

    it('should load simple stand alone service exported as ES5 module', async () => {
        const service = await services.ServiceTwo;

        if (service.constructor.name !== 'ServiceTwo') {
            throw new Error('Services container doesn\'t return right service');
        }
    });

    it('should load function service', async () => {
        const service = await services.FunctionService;

        if (service.getValue() !== TEST_VALUE) {
            throw new Error('Service doesn\'t return right value');
        }
    });

    it('should load service from directory', async () => {
        const service = await services.DirService;

        if (service.getTestValue() !== TEST_VALUE) {
            throw new Error('Service doesn\'t return right value');
        }
    });

    it('should load service through getService method', async() => {
        const service = await services.getService<ServiceOne>('ServiceOne');

        if (!(service instanceof ServiceOne)) {
            throw new Error('Services container doesn\'t return right service');
        }
    });
});