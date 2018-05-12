import Kontik from '../../src';

const TEST_VALUE = Math.random();

const services = new Kontik({
    testValue: TEST_VALUE
}, {
    dir: __dirname + '/services'
})

describe('Export types', () => {
    it('should load simple stand alone service exported as ES6 module', (done) => {
        const service = services.ServiceOne;

        if (service.constructor.name == 'ServiceOne') {
            return done();
        }

        done('Services container doesn\'t return right service');
    });

    it('should load simple stand alone service exported as ES5 module', (done) => {
        const service = services.ServiceTwo;

        if (service.constructor.name == 'ServiceTwo') {
            return done();
        }

        done('Services container doesn\'t return right service');
    });

    it('should load function service', (done) => {
        const service = services.FunctionService;

        if (service.getValue() == TEST_VALUE) {
            return done();
        }

        done('Service doesn\'t return right value');
    });
});