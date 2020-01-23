import { Injectable } from '@angular/core';
import { baseUrlTraining } from '../baseUrl';
import { Observable } from 'rxjs/Observable';
import { TrainingDomain } from '../model/training-domain';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from './handleerror.service';
import { httpOptions } from '../httpheaders';

@Injectable()
export class AddNewTrainingService {

    private apiRoot = baseUrlTraining;

    constructor(private http: HttpClient, private handler: ErrorHandler) { }

    public saveNewTraining(training: TrainingDomain): Observable<TrainingDomain> {
        return this.saveTraining(training);
    }

    public updateNewTraining(training: TrainingDomain): Observable<TrainingDomain> {
        return this.updateTraining(training);
    }

    saveTraining(training: TrainingDomain): Observable<TrainingDomain> {
        const url = `${this.apiRoot}/add`;
        return this.http.post<TrainingDomain>(url,training,httpOptions)
            .pipe(
                catchError(this.handler.handleError)
            );
    }

    updateTraining(training: TrainingDomain): Observable<TrainingDomain> {
        const url = `${this.apiRoot}/update`;

        return this.http.post<TrainingDomain>(url, training,httpOptions)
            .pipe(
                catchError(this.handler.handleError)
            );
    }

}
