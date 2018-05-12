class CustomServices {
    constructor(secondService) {
        this._secondService = secondService;
    }

    getSecondService() {
        return this._secondService;
    }
}

export default (services) => {
    return new CustomServices(services.SecondService);
}