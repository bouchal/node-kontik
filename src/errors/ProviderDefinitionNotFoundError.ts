import KontikError from "./KontikError"

export default class ProviderDefinitionNotFoundError extends KontikError {
    /* istanbul ignore next */
    constructor(providerName: string) {
        super(`Provider definition "${providerName}" was not found`)

        Object.setPrototypeOf(this, ProviderDefinitionNotFoundError.prototype)
    }
}
