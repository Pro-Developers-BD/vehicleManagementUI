import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor() {}

  // tslint:disable-next-line:typedef
    handleError(error){
        console.log(error);
        if (error.status !== 403 && error.status !== 401){
            let msg = error.statusText;
            if (error.eror !== 'undefined'){
                msg = error.error;
            }
        }
    }
}
