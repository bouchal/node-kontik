import {Options} from "./interfaces/Options"
import Kontik from "./Kontik"
import FileProviderDefinitionRepo from "./repositories/FileProviderDefinitionRepo"
import * as path from "path"
import {Provider} from "./types/Provider"
import {Providers} from "./types/Providers"
import {ProviderDefinitionRepo} from "./interfaces/ProviderDefinitionRepo"
import {ProvidersStorage} from "./types/ProvidersStorage"

export {
    Kontik,
    Options,
    Provider,
    Providers,
    ProvidersStorage,
    ProviderDefinitionRepo
}

export default (
    config: object,
    options?: Options
): Kontik => {
    const dir = options && options.dir ? options.dir : `${process.cwd()}${path.sep}providers`
    const providers = options && options.providers ? options.providers : {}

    const providerDefinitionRepo = new FileProviderDefinitionRepo(dir)

    return new Kontik(providerDefinitionRepo, config, providers)
}
