import {expect} from 'chai'
import * as sinon from 'sinon'
import {ProviderDefinitionRepo} from "./interfaces/ProviderDefinitionRepo";
import {Provider} from "./types/Provider";
import Kontik from "./Kontik";
import {Providers} from "./types/Providers";

describe('Kontik', function () {
    it('should pass right arguments to providers', async function () {
        const FAKE_CONFIG = {
            conf1: true,
            conf2: "fake"
        }

        const PROVIDED_VALUE = new Date().toISOString()

        let providers: Kontik

        const FAKE_PROVIDER: Provider = sinon.spy(async (providedProviders: Providers, config: any) => {
            expect(providedProviders).to.be.eql(providers)
            expect(config).to.be.eql(FAKE_CONFIG)

            return PROVIDED_VALUE
        })

        const FAKE_PROVIDER_DEFINITION_REPO: ProviderDefinitionRepo = {
            get: async (name: string) => {
                return FAKE_PROVIDER
            }
        }

        providers = new Kontik(FAKE_PROVIDER_DEFINITION_REPO, FAKE_CONFIG)

        await providers.get('fakeName')
    })

    it('should provide right instance by name', async function () {
        const PROVIDED_VALUE = new Date().toISOString()

        const FAKE_PROVIDER: Provider = sinon.spy(async () => {
            return PROVIDED_VALUE
        })

        const FAKE_PROVIDER_DEFINITION_REPO: ProviderDefinitionRepo = {
            get: async (name: string) => {
                return FAKE_PROVIDER
            }
        }

        const providers = new Kontik(FAKE_PROVIDER_DEFINITION_REPO, {})

        const value = await providers.get('fakeName')

        expect(value).to.be.eql(PROVIDED_VALUE)
    })

    it('should return same instance when it is called multiple times in series', async function () {
        const PROVIDED_VALUE = new Date().toISOString()

        let count = 0

        const FAKE_PROVIDER: Provider = sinon.spy(async () => {
            count++

            return PROVIDED_VALUE
        })

        const FAKE_PROVIDER_DEFINITION_REPO: ProviderDefinitionRepo = {
            get: async (name: string) => {
                return FAKE_PROVIDER
            }
        }

        const providers = new Kontik(FAKE_PROVIDER_DEFINITION_REPO, {})

        await providers.get('fakeName')
        await providers.get('fakeName')
        await providers.get('fakeName')
        await providers.get('fakeName')

        expect(count).to.be.eql(1)
    })

    it('should return same instance when it is called multiple times parallel', async function () {
        const PROVIDED_VALUE = new Date().toISOString()

        let count = 0

        const FAKE_PROVIDER: Provider = sinon.spy(async () => {
            count++

            return PROVIDED_VALUE
        })

        const FAKE_PROVIDER_DEFINITION_REPO: ProviderDefinitionRepo = {
            get: async (name: string) => {
                return FAKE_PROVIDER
            }
        }

        const providers = new Kontik(FAKE_PROVIDER_DEFINITION_REPO, {})

        const values = await Promise.all([
            providers.get('fakeName'),
            providers.get('fakeName'),
            providers.get('fakeName'),
            providers.get('fakeName'),
        ])

        expect(count).to.be.eql(1)
        expect(values.every( (val, i, arr) => val === arr[0] )).to.be.eql(true)
    })

    it('should provide instances passed through constructor firstly', async function () {
        const PROVIDED_VALUE = new Date().toISOString()

        const FAKE_PREDEFINED_VALUES = {
            myPredefinedValue: PROVIDED_VALUE
        }

        const FAKE_PROVIDER: Provider = sinon.spy(async () => {
            return "never"
        })

        const FAKE_PROVIDER_DEFINITION_REPO: ProviderDefinitionRepo = {
            get: async (name: string) => {
                return FAKE_PROVIDER
            }
        }

        const providers = new Kontik(FAKE_PROVIDER_DEFINITION_REPO, {}, FAKE_PREDEFINED_VALUES)

        const value = await providers.get('myPredefinedValue')

        expect(value).to.be.eql(PROVIDED_VALUE)
    })
})