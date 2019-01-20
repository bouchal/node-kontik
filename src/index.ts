import * as path from "path";

export interface Options {
    dir?: string,
    services?: { [key: string]: any }
}

export interface Services { [key: string]: Promise<any> }

class Kontik {
    /**
     * Config passed to service provider when it's initializing.
     * It's passed to Kontik instance through constructor.
     */
    private readonly config: object;

    private readonly options: Options = {
        dir: process.cwd() + path.sep + 'services',
        services: {}
    };

    /**
     * List of already initialized services.
     */
    private services: Services = {};

    /**
     * List of initialized providers which isn't finished yet.
     */
    private initializedPromises: Services = {};

    /**
     * This object is must be set after Kontik container is created because it refer to proxy of itself.
     */
    private proxy?: any;

    public constructor(config: any, options?: Options) {
        this.config = config;
        this.options = {
            ...this.options,
            ...options
        };
    }


    /**
     * Return promise with initialized service through service provider.
     *
     * @param name
     */
    public async getService(name: string): Promise<any> {
        // First check if service isn't passed in options.
        if (this.options.services && this.options.services[name]) {
            return await this.options.services[name];
        }

        // Check if service isn't already finished or initialized
        return this.services[name]
            || this.initializedPromises[name]
            || (this.initializedPromises[name] = this.initService(name));
    }

    private async initService(name: string): Promise<any> {
        const config = this.config;
        const services = this.proxy;

        let initializer = await import(this.options.dir + path.sep + name);
        initializer = initializer.default || initializer;

        let executedInitializer = null;

        try {
            executedInitializer = new initializer(services, config);
        } catch (err) {
            if (err.message.indexOf('is not a constructor') === -1) {
                throw err;
            }

            executedInitializer = initializer(services, config);
        }

        const service = await executedInitializer;

        delete this.initializedPromises[name];
        this.services[name] = service;

        return service;
    }


    public setProxy(proxy: any): void {
        this.proxy = proxy;
    }
}

const createServicesProxy = (services: Kontik): any => {
    const ServicesProxy = new Proxy(services, {
        get: function (target: any, name: string) {
            return target.getService(name);
        }
    });

    services.setProxy(ServicesProxy);

    return ServicesProxy;
};

export default (config: any, options: Options = {}): Services => {
    return createServicesProxy(new Kontik(config, options));
};