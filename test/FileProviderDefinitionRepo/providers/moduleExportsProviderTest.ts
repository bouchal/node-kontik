import {Provider} from "../../../src/types/Provider";
import {Providers} from "../../../src/types/Providers";
import {ModuleProvidedClass} from "./ModuleProvidedClass";

const provider: Provider<ModuleProvidedClass> = async (providers: Providers, config: any) => {
    return new ModuleProvidedClass()
}

module.exports = provider
