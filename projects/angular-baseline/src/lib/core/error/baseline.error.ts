export class BaseError extends Error {

    constructor(
        public override readonly message: string,
        cause?: Error
    ) {
        super(message, { cause });
        this.name = this.constructor.name;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

}
