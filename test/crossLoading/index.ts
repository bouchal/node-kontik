import kontik from '../../src';

const TEST_VALUE = Math.random();

const services = kontik({
    testValue: TEST_VALUE
}, {
    dir: __dirname + '/services'
})

describe('Cross loading', () => {
    it('should load service with second called inside constructor', async () => {
        const service = await services.ServiceOne;

        if (service.constructor.name != 'ServiceOne') {
            throw new Error('Service container doesn\'t return right service');
        }

        if (await service.getClassNameOfServiceTwo() != 'ServiceTwo') {
            throw new Error('Service inside loaded service is not right instance');
        }
    });
})