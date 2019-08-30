import {ProvidersStorage} from "./types/ProvidersStorage"
import {ProviderDefinitionRepo} from "./interfaces/ProviderDefinitionRepo"

export default class Kontik {
    /**
     * List of initialized providers which isn't finished yet.
     */
    protected initializedPromises: ProvidersStorage = {}

    public constructor(
        protected readonly providerDefinitionRepo: ProviderDefinitionRepo,
        protected readonly config: any,
        protected readonly providers: ProvidersStorage = {}
    ) {
    }


    /**
     * Return promise with initialized service through service provider.
     *
     * @param providerName
     */
    public async get<T = any>(providerName: string): Promise<T> {
        // First check if service isn't passed in options.
        if (this.providers && this.providers[providerName]) {
            return await this.providers[providerName]
        }

        // Check if service isn't already finished or initialized
        return this.providers[providerName]
            || this.initializedPromises[providerName]
            || (this.initializedPromises[providerName] = this.initProvider(providerName))
    }

    protected async initProvider(name: string): Promise<any> {
        const initializedProviderDefinition = (await this.providerDefinitionRepo.get(name))(this, this.config)

        const service = await initializedProviderDefinition

        this.providers[name] = service
        delete this.initializedPromises[name]

        return service
    }
}
