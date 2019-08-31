export default class KontikError extends Error {
    /* istanbul ignore next */
    constructor(message?: string) {
        super(message)

        Object.setPrototypeOf(this, KontikError.prototype)
    }
}
