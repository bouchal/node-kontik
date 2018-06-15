Simple services container for creating and managing singletons.

# Kontik

Define all services as separate files/folders on one place and call them as singleton from one injected manager.

## Usage

### Creating services manager

```javascript
import kontik from 'kontik';

const config = {
    value: 42
};

const options = {
    dir: __dirname + "/services" // Default is process.cwd()
}

const services = kontik(config, options);

console.log(services.SimpleService.getValue());
```

### Services definition

Services is created in one directory (default `[ CURRENT_WORKING_DIRECTORY ]/services`).
In this directory you can create file or folder (with `index.js`) with service name.
You can define them as class or function.

__Function definition:__

```javascript
module.exports = function (services, config) {
    var value = config.value;
    
    return {
        getValue: function () {
            return value;
        }
    }
}
```

__ES6 class definition:__

```javascript
export default class SimpleService
{
    constructor(services, config) {
        this._value = config.value;
    }
    
    getValue() {
        return this._value;
    }
}
```

### Predefined services

Sometimes you need create services with different way or you need to initialize them on different place, but work
with them inside services initialized in Kontik.

That's why here is solution how you can pass already initialized object to Kontik constructor.

```javascript
import kontik from 'kontik';

const config = {...}

const services = kontik(config, {
    services: {
        PredefinedService: new SomeService()
    }
});

console.log(services.PredefinedService.getSomeValue());
```

### Decorate input parameters

If you define service in folder, you can add files with exported function `_config.js` and `_services.js` for decorate
them before it's pass to service definition.

__\_config.js__

```javascript
export default (config) {
    return {
        getValue: () => {
            return config.value
        }
    }
}
```

__\_services.js__

```javascript
class Services
{
    constructor(simpleService) {
        this._simpleService = simpleService;
    }
    
    getSimpleService() {
        return this._simpleService;
    }
}

export default (services) => {
    return new Services(services.SimpleServices);
}
```


 
