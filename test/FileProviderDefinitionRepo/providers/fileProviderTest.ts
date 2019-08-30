import {Provider} from "../../../src/types/Provider";
import {Providers} from "../../../src/types/Providers";

export class TestProvidedClass {
    public a() {
        return "a"
    }
}

const provider: Provider<TestProvidedClass> = async (providers: Providers, config: any) => {
    return new TestProvidedClass()
}

export default provider

