import {expect} from 'chai'
import * as path from 'path'
import FileProviderDefinitionRepo from "./FileProviderDefinitionRepo";
import {TestProvidedClass} from "../../test/FileProviderDefinitionRepo/providers/fileProviderTest";
import {ModuleProvidedClass} from "../../test/FileProviderDefinitionRepo/providers/ModuleProvidedClass";

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
})