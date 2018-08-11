import Kontik from '../../src';
import AsyncService from './services/AsyncService';

const TEST_VALUE = Math.random();

const services = new Kontik({
    testValue: TEST_VALUE
}, {
    dir: __dirname + '/services',
    async: true
});

const isPromise = (subject) => {
    return typeof subject.then === 'function';
};

describe('Async services', () => {
    it('should load return all services as async', (done) => {
        if (!isPromise(services.PromiseService) || !isPromise(services.SyncService)) {
            return done('Some service don\'t return promise');
        }

        done();
    });

    it('should be loaded though promise resolver', (done) => {
        Promise.all([
            services.PromiseService,
            services.SyncService
        ]).then((ser) => {
            const [s1, s2] = ser;

            if (s1.getValue() != TEST_VALUE || s2.getValue() != TEST_VALUE) {
                return done('Some service didn\'t return correct test value');
            }

            done();
        });
    });

    it('should return one object when it\'s called multiple time before it\'s initialized', (done) => {
        Promise.all([
            services.DelayService,
            services.DelayService,
            services.DelayService,
            services.DelayService,
        ]).then((ser) => {
            const [s1, s2, s3, s4] = ser;

            if (s1 === s2 && s1 === s3 && s1 === s4) {
                return done();
            }

            done('Services is not initialized as singleton');
        });
    });

    if (process.env.TRAVIS_NODE_VERSION === '6') {
        return;
    }
    
    it ('should load services via async functions', (done) => {
        services.AsyncService.then((service) => {
            if (service.getValue() !== TEST_VALUE) {
                return done('Some service didn\'t return correct test value');
            }

            done();
        })
    });
});