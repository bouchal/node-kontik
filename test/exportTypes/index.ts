import kontik from '../../src';

const TEST_VALUE = Math.random();

const services = kontik({
    testValue: TEST_VALUE
}, {
    dir: __dirname + '/services'
})

describe('Export types', () => {
    it('should load simple stand alone service exported as ES6 module', async () => {
        const service = await services.ServiceOne;
        if (service.constructor.name !== 'ServiceOne') {
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
});