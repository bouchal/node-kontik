import {expect} from 'chai'
import {default as kontikFactory} from './index'
import Kontik from "./Kontik";

describe('index', function () {
    it('should return instance of Kontik', function () {
        expect(kontikFactory({})).to.be.instanceof(Kontik)
        expect(kontikFactory({}, {
            dir: 'fake-dir',
            providers: {}
        })).to.be.instanceof(Kontik)
    })
})