import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TrainingDomain } from '../model/training-domain';
import { baseUrlTraining } from '../baseUrl';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from './handleerror.service';

@Injectable()
export class AvailableTrainingService {

  apiRoot = baseUrlTraining;
  constructor(private httpClient: HttpClient, private handler: ErrorHandler) { }



  getAvailableTraining(): Observable<TrainingDomain[]> {
    console.log(this.apiRoot);
    const url = this.apiRoot + "/getalltraining";
    // console.log(url);
    return this.httpClient.get<TrainingDomain[]>(url)
      .pipe(
        catchError(this.handler.handleError)
      );

  }

  postEnroll(trainingId: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.apiRoot + "/enroll?trainingId=" + trainingId;
    console.log(url)
    console.log(trainingId)
    return this.httpClient.post(url, options).pipe(
      catchError(this.handler.handleError)
    );

  }
}
