import kontik from '../../src';
import PredefinedService from './PredefinedService';

const TEST_VALUE = Math.random();

const predefinedService = new PredefinedService(TEST_VALUE);

const services = kontik({}, {
    dir: __dirname + '/services',
    services: {
        PredSer: predefinedService
    }
});

describe('Predefined services', () => {
    it('should correctly load predefined service', async () => {
        const service = await services.PredSer;

        if (service.getTestValue() !== TEST_VALUE) {
            throw new Error('Service doesn\'t return right value');
        }
    });

    it ('should correctly pass predefined service to other service', async () => {
        const service = await services.ServiceOne;

        if (await service.getValueFromPassedService() !== TEST_VALUE) {
            throw new Error('Service doesn\'t return right value');
        }
    })
});