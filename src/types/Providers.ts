export type Providers = {
    get: <T>(name: string) => Promise<T>
}
