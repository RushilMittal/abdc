import { Injectable } from "@angular/core";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthHelper } from "./authHelper.service";
import { Observable, throwError } from "rxjs";

@Injectable()
export class ErrorHandler{

    constructor(private authHelper: AuthHelper){}

    public handleError(error: HttpErrorResponse)
    {

        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else
        {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(error);
            console.error(
                `Backend returned code , ${error.status}` +
                `body  was: ${error.error}`);

            // Handling Client Errors.
            if (error.status === 400) {

              return throwError('Client Error:- Bad Request');
            }
            else if (error.status === 401) {
              this.authHelper.login();
              return throwError('Session Expired, Login Again');
            }
            else if (error.status === 403) {

              return throwError('Sorry,Access denied');
            }
            else if (error.status === 404) {

              return throwError('Resource Not Found');
            }
            // Handling Server Error
            else if (error.status === 500) {

              return throwError('Server Error, reload the page');
            }
            else if (error.status === 504) {

              return throwError('Make sure you are connected to the Internet');

            }else{

              return throwError('Some Error Occured');
            }

        }
    };

}
