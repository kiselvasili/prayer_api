class ErrorHandler {
    private errorCode: any;
    public handleError(error: any, res: any, code?: number) {
        if (error instanceof Error) {
            if (!code) {
                this.errorCode = 500;
            }
            return res.status(this.errorCode).send(error.message);
        }
    }
}

export const handleError = new ErrorHandler().handleError;