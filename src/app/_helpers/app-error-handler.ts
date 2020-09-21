import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor() {}
    handleError(error): void{
        if (error.status !== 403 && error.status !== 401){
            let msg = error.statusText;
            if (error.eror !== 'undefined'){
                msg = error.error;
            }
        }
    }
}
