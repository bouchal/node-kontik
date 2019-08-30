import {ProviderDefinitionRepo} from "../interfaces/ProviderDefinitionRepo"
import {Provider} from "../types/Provider"
import * as path from "path"

export default class FileProviderDefinitionRepo implements ProviderDefinitionRepo {
    constructor(
        protected readonly dirPath: string
    ) {
    }

    public async get(providerName: string): Promise<Provider> {
        /**
         * Provider definition is imported from file.
         * Because definition can be exported through `module.exports` or `export default`,
         * we need to check if default property is not exported too.
         */
        let definition = await import(this.dirPath + path.sep + providerName)
        definition = definition.default || definition

        return definition
    }
}