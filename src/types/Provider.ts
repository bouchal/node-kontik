import {Providers} from "./Providers"

export type Provider<TProvided = any> = (providers: Providers, config: any) => Promise<TProvided> | TProvided