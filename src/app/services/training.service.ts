import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { Training } from '../model/Training';
import 'rxjs/add/operator/map'


@Injectable()
export class trainingService {
    url = 'http://localhost:4200/assets/training.json';
    constructor(private http: Http) {}
    getTrainingData(): Observable<Training> {
        return this.http.get(this.url).map((response: Response) => <Training>response.json());
    }

}

