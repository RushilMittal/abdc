import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Training } from '../model/Training';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from './handleerror.service';

@Injectable()
export class DashboardTrainingPlaceholder {

    url = '../assets/training.json';

    constructor(private http: HttpClient,private handler:ErrorHandler) { }

    gettTrainingData(): Observable<Training[]> {
        // let url = `${this.apiRoot}`;

        return this.http.get<Training[]>(this.url)
            .pipe(
                catchError(this.handler.handleError)
            );
    }

}
