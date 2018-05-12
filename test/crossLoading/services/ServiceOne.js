class ServiceOne {
    constructor(services) {
        this._serviceTwo = services.ServiceTwo;
    }

    getClassNameOfServiceTwo() {
        return this._serviceTwo.constructor.name;
    }
}

export default ServiceOne;