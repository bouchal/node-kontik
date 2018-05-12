import Kontik from '../../src';

const TEST_VALUE = Math.random();

const services = new Kontik({
    testValue: TEST_VALUE
}, {
    dir: __dirname + '/services'
});

describe('Complex services', () => {
    it('should load complex service with custom config and service decorator', (done) => {
        const service = services.ComplexService;

        if (service.constructor.name != 'ComplexService') {
            return done('Service container doesn\'t return right service');
        }

        if (service.getValue() != TEST_VALUE) {
            return done('Service doesn\'t return value from custom config decorator');
        }

        if (service.getValueFromSecondService() != services.SecondService.getValue()) {
            return done('Inner service doesn\'t return right value');
        }

        done();
    });

    it('should load service with own initializer', (done) => {
        const service = services.ServiceWithInit;

        if (service.getValue() == TEST_VALUE + TEST_VALUE) {
            return done();
        }

        return done('Inner service doesn\'t return right value');
    })
})