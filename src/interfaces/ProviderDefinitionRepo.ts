import {Provider} from "../types/Provider"

export interface ProviderDefinitionRepo {
    /**
     *
     * @param providerName
     * @throws ProviderDefinitionNotFoundError
     */
    get(providerName: string): Promise<Provider>
}
