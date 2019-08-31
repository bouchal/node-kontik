import {Provider, Providers} from "../../../src";

export class SyncTestService {
    public d() {}
}

const provider: Provider<SyncTestService> = (providers: Providers, config: any) => {
    return new SyncTestService()
}

export default provider