import {ProviderDefinitionRepo} from "../interfaces/ProviderDefinitionRepo"
import {Provider} from "../types/Provider"
import * as path from "path"
import ProviderDefinitionNotFoundError from "../errors/ProviderDefinitionNotFoundError"

export default class FileProviderDefinitionRepo implements ProviderDefinitionRepo {
    constructor(
        protected readonly dirPath: string
    ) {
    }

    public async get(providerName: string): Promise<Provider> {
        let definition

        try {
            definition = await import(this.dirPath + path.sep + providerName)
        } catch (e) {
            if (e.code === 'MODULE_NOT_FOUND') {
                throw new ProviderDefinitionNotFoundError(providerName)
            }

            throw e
        }

        /**
         * Provider definition is imported from file.
         * Because definition can be exported through `module.exports` or `export default`,
         * we need to check if default property is not exported too.
         */
        definition = definition.default || definition

        return definition
    }
}
