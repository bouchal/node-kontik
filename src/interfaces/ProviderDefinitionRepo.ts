import {Provider} from "../types/Provider"

export interface ProviderDefinitionRepo {
    get(providerName: string): Promise<Provider>
}