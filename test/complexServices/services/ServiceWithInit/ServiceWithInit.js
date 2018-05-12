export default class ServiceWithInit
{
    constructor(one, two)
    {
        this._value = one + two;
    }

    getValue()
    {
        return this._value;
    }
}