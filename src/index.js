import fs from "fs";

class Services {
    constructor(config, {
        dir,
        configDecoratorFile,
        servicesDecorationFile,
        services = {},
        async
    } = {}) {
        this._config = config;
        this._dir = dir;
        this._configDecoratorFile = configDecoratorFile;
        this._servicesDecoratorFile = servicesDecorationFile;
        this._async = async;

        this._initializedServices = [];
        this._initialPromises = [];
        this._services = services;
    }

    getService(name) {
        return this._async
            ? this._getAsyncService(name)
            : this._getSyncService(name);
    }

    _getSyncService(name) {
        if (!this._services[name]) {
            this.createService(name);
        }

        return this._services[name];
    }

    async _getAsyncService(name) {
        if (!this._services[name]) {
            return this._initialPromises[name] || this.createService(name);
        }

        return await this._services[name];
    }

    createService(name) {
        if (this._initializedServices[name]) {
            throw Error('Circular services reference detected');
        }

        this._initializedServices[name] = true;

        const basePath = this._dir + '/' + name;

        let config = this._config;
        let services = this._proxy;

        if (this._isDirectory(basePath)) {
            config = this._getDecoratedConfig(basePath);
            services = this._getDecoratedServices(basePath);
        }

        let initializer = require(this._dir + '/' + name);
        initializer = initializer.default || initializer;

        const executedInitializer = this._isClass(initializer)
            ? initializer(services, config)
            : new initializer(services, config);

        if (!this._async || !this._isPromise(executedInitializer)) {
            this._services[name] = executedInitializer;
            return this._services[name];
        }

        this._initialPromises[name] = executedInitializer;

        executedInitializer.then((service) => {
            delete this._initialPromises[name];
            this._services[name] = service;
        });

        return executedInitializer;
    }

    _isClass(v) {
        return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
    }

    _isDirectory(path) {
        if (!fs.existsSync(path)) {
            return false;
        }

        return fs.statSync(path).isDirectory();
    }

    _isPromise(subject) {
        return typeof subject.then === 'function';
    }

    _getDecoratedConfig(basePath) {
        const configDecoratorPath = basePath + '/' + this._configDecoratorFile;

        if (!fs.existsSync(configDecoratorPath)) {
            return this._config;
        }

        const configDecorator = require(configDecoratorPath);

        return configDecorator.default
            ? configDecorator.default(this._config)
            : configDecorator(this._config);
    }

    _getDecoratedServices(basePath) {
        const servicesDecoratorPath = basePath + '/' + this._servicesDecoratorFile;

        if (!fs.existsSync(servicesDecoratorPath)) {
            return this._proxy;
        }

        const servicesDecorator = require(servicesDecoratorPath);

        return servicesDecorator.default
            ? servicesDecorator.default(this._proxy)
            : servicesDecorator(this._proxy);
    }

    setProxy(proxy) {
        this._proxy = proxy;
    }
}

const createServicesProxy = (services) => {
    const ServicesProxy = new Proxy(services, {
        get: function (target, name, receiver) {
            return target.getService(name);
        }
    });

    services.setProxy(ServicesProxy);

    return ServicesProxy;
};

const defaultOptions = {
    dir: process.cwd() + '/services',
    configDecoratorFile: '_config.js',
    servicesDecorationFile: '_services.js',
    async: false
};

export default (config, options = {}) => {
    return createServicesProxy(new Services(config, {
        ...defaultOptions,
        ...options
    }));
};