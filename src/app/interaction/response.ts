export class Response<T> {
    hasErrors: boolean;
    errors: Error[];
    result: T
}

export class Error {
    message: string;
    code: string;
}




