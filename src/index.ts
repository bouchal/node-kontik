import {Options} from "./interfaces/Options"
import Kontik from "./Kontik"
import FileProviderDefinitionRepo from "./repositories/FileProviderDefinitionRepo"
import * as path from "path"
import {Provider} from "./types/Provider"
import {Providers} from "./types/Providers"
import {ProviderDefinitionRepo} from "./interfaces/ProviderDefinitionRepo"
import {ProvidersStorage} from "./types/ProvidersStorage"
import KontikError from "./errors/KontikError"
import ProviderDefinitionNotFoundError from "./errors/ProviderDefinitionNotFoundError"

export {
    /** MAIN DEFINITIONS */
    Kontik,

    /** SECONDARY DEFINITIONS */
    Options,
    Provider,
    Providers,
    ProvidersStorage,
    ProviderDefinitionRepo,

    /** ERROR DEFINITIONS */
    KontikError,
    ProviderDefinitionNotFoundError,
}

export default (
    config: any,
    options?: Options
): Providers => {
    const dir = options && options.dir ? options.dir : `${process.cwd()}${path.sep}providers`
    const providers = options && options.providers ? options.providers : {}

    const providerDefinitionRepo = new FileProviderDefinitionRepo(dir)

    return new Kontik(providerDefinitionRepo, config, providers)
}
