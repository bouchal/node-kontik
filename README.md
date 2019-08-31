![kontik logo](https://raw.githubusercontent.com/bouchal/node-kontik/master/doc/images/logo.png)

Easy to understand and simple container for providing singletons.

[![Coverage Status](https://coveralls.io/repos/github/bouchal/node-kontik/badge.svg?branch=master)](https://coveralls.io/github/bouchal/node-kontik?branch=master)

Define providers of services or other instances separated files and load them as singletons.

## Philosophy

For clean architecture development you need container which will provide access to all defined dependencies that you need.

When you define this dependencies, you should have access to two things. ... Container itself (for loading
dependent components) and application config. 
 

## Usage

__Create instance of kontik providers container__

```typescript
import kontik, {Options} from 'kontik'

// Application custom config. Will be provide to all provider definition
const config = {...}

const options: Options = {
    dir: 'customProviderDir' // Default `$CWD/providers`
}

const providers = kontik(config, options)
```

__Create provider definition__

For every provider you need to create file in providers dir. For example `customServiceProvider.ts`

```typescript
import {Provider, Providers} from 'kontik'
import CustomService from './services/CustomService'
import FakeDependService from './services/FakeDependService'

const provider: Provider<CustomService> = async (providers: Providers, config: any) => {
    const fakeDependService = await providers.get<FakeDependService>('fakeDependService')
    const valueFromConfig = config.some.defined.value
     
    return new CustomService(valueFromConfig, fakeDependService)
}

export default provider
```

__Load and use provided instance__

```typescript
import CustomService from './services/CustomService'

const loadService = async () => {
    return await providers.get<CustomService>('customServiceProvider')
}

loadService()
```

### Predefined services

Sometimes you need create providers through different way or you need to initialize them on different place, but work
with them inside services initialized in Kontik.

That's why here is solution how you can pass already initialized object to Kontik constructor.

```typescript
import kontik, {Options} from 'kontik';
import SomeService from './services/SomeService'

const options: Options = {
    providers: {
        predefinedServiceProvider: new SomeService()
    }
}

const providers = kontik({...config}, options);

const loadService = async () => {
    return await providers.get<CustomService>('predefinedServiceProvider')
}

loadService()
```