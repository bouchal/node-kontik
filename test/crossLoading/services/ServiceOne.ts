class ServiceOne {
    private readonly serviceTwo: any;

    constructor(services: any) {
        this.serviceTwo = services.ServiceTwo;
    }

    async getClassNameOfServiceTwo() {
        return (await this.serviceTwo).constructor.name;
    }
}

export default ServiceOne;