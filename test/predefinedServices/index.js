import Kontik from '../../src';
import PredefinedService from './PredefinedService';

const TEST_VALUE = Math.random();

const predefinedService = new PredefinedService(TEST_VALUE);

const services = new Kontik({}, {
    dir: __dirname + '/services',
    services: {
        PredSer: predefinedService
    }
});

describe('Predefined services', () => {
    it('should correctly load predefined service', (done) => {
        const service = services.PredSer;

        if (service.getTestValue() == TEST_VALUE) {
            return done();
        }

        done('Service doesn\'t return right value');
    });

    it ('should correctly pass predefined service to other service', (done) => {
        const service = services.ServiceOne;

        if (service.getValueFromPassedService() == TEST_VALUE) {
            return done();
        }

        done('Service doesn\'t return right value');
    })
});