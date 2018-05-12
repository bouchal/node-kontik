import Kontik from '../../src';

const TEST_VALUE = Math.random();

const services = new Kontik({
    testValue: TEST_VALUE
}, {
    dir: __dirname + '/services'
})

describe('Cross loading', () => {
    it('should load service with second called inside constructor', (done) => {
        const service = services.ServiceOne;

        if (service.constructor.name != 'ServiceOne') {
            return done('Service container doesn\'t return right service');
        }

        if (service.getClassNameOfServiceTwo() != 'ServiceTwo') {
            return done('Service inside loaded service is not right instance');
        }

        done();
    });
})