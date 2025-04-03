export class BaseError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
    }
}
