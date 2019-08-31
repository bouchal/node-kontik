import {expect} from 'chai'
import * as path from 'path'
import FileProviderDefinitionRepo from "./FileProviderDefinitionRepo";
import {TestProvidedClass} from "../../test/FileProviderDefinitionRepo/providers/fileProviderTest";
import {ModuleProvidedClass} from "../../test/FileProviderDefinitionRepo/providers/ModuleProvidedClass";
import {DirService} from "../../test/FileProviderDefinitionRepo/providers/dirService";
import {SyncTestService} from "../../test/FileProviderDefinitionRepo/providers/syncProvider";
import ProviderDefinitionNotFoundError from "../errors/ProviderDefinitionNotFoundError";

describe('FileProviderDefinitionRepo', function () {
    it('should load provider from file by name', async function () {
        const definitionProvider = new FileProviderDefinitionRepo(`${__dirname}${path.sep}..${path.sep}..${path.sep}test${path.sep}FileProviderDefinitionRepo${path.sep}providers`)

        const providerDefinition = await definitionProvider.get('fileProviderTest')

        const FAKE_PROVIDERS: any = {
            get: async () => "FAKE"
        }

        const instance = await providerDefinition(FAKE_PROVIDERS, undefined)

        expect(instance).to.be.instanceof(TestProvidedClass)
    })

    it('should load provider from file by name exported through module.exports', async function () {
        const definitionProvider = new FileProviderDefinitionRepo(`${__dirname}${path.sep}..${path.sep}..${path.sep}test${path.sep}FileProviderDefinitionRepo${path.sep}providers`)

        const providerDefinition = await definitionProvider.get('moduleExportsProviderTest')

        const FAKE_PROVIDERS: any = {
            get: async () => "FAKE"
        }

        const instance = await providerDefinition(FAKE_PROVIDERS, undefined)

        expect(instance).to.be.instanceof(ModuleProvidedClass)
    })

    it('should load provider from directory', async function () {
        const definitionProvider = new FileProviderDefinitionRepo(`${__dirname}${path.sep}..${path.sep}..${path.sep}test${path.sep}FileProviderDefinitionRepo${path.sep}providers`)

        const providerDefinition = await definitionProvider.get('dirService')

        const FAKE_PROVIDERS: any = {
            get: async () => "FAKE"
        }

        const instance = await providerDefinition(FAKE_PROVIDERS, undefined)

        expect(instance).to.be.instanceof(DirService)
    })

    it('should load sync provider as async', async function () {
        const definitionProvider = new FileProviderDefinitionRepo(`${__dirname}${path.sep}..${path.sep}..${path.sep}test${path.sep}FileProviderDefinitionRepo${path.sep}providers`)

        const providerDefinition = await definitionProvider.get('syncProvider')

        const FAKE_PROVIDERS: any = {
            get: async () => "FAKE"
        }

        const instance = await providerDefinition(FAKE_PROVIDERS, undefined)

        expect(instance).to.be.instanceof(SyncTestService)
    })

    it('should throw ProviderDefinitionNotFoundError when service is not found', async function () {
        const definitionProvider = new FileProviderDefinitionRepo(`${__dirname}${path.sep}..${path.sep}..${path.sep}test${path.sep}FileProviderDefinitionRepo${path.sep}providers`)

        try {
            await definitionProvider.get('nonExistProvider')
        } catch (e) {
            expect(e).to.be.instanceof(ProviderDefinitionNotFoundError)
            return
        }

        throw new Error('should never happened')
    })

    it('should throw other errors when cant open provider definition', async function () {
        const definitionProvider = new FileProviderDefinitionRepo(`${__dirname}${path.sep}..${path.sep}..${path.sep}test${path.sep}FileProviderDefinitionRepo${path.sep}providers`)

        try {
            await definitionProvider.get('providerWithError')
        } catch (e) {
            expect(e).to.be.instanceof(Error)
            return
        }

        throw new Error('should never happened')
    })
})