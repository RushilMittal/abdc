import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { SubSkill } from '../model/SubSkill';
import { baseUrlSkill } from '../baseUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AllSubSkillService {
  private apiRoot = baseUrlSkill;

  constructor(private http: HttpClient) { }

  getSubSkill(): Observable<SubSkill> {
    // console.log('inside getSkill');
    const url = `${this.apiRoot}/all`;
    // console.log(url);

    // we need to fetch the modelSkill of employee except the rated ones.
    return this.http.get(url).catch(this.handleError);

  }

  private handleError(error: any): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
