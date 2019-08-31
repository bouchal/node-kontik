import {Provider, Providers} from "../../../../src";

export class DirService {
    public c() {}
}

const provider: Provider<DirService> = async (providers: Providers, config: any) => {
    return new DirService()
}

export default provider