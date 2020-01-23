import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SubSkill } from '../model/SubSkill';
import { baseUrlSkill } from '../baseUrl';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch'

@Injectable()
export class MySubSkillService {
  private apiRoot = baseUrlSkill;

  constructor(private http: HttpClient) { }

  getEmployeeSubSkillExceptRatedSubSkill(skillId: string): Observable<SubSkill[]> {
    const url = `${this.apiRoot}/getSubSkillsBySkill?skillName=${skillId}`;
    return this.http.get<SubSkill[]>(url)
      .catch(this.handleError);
  }

  getEmployeeSubSkillById(subSkillId: string): Observable<SubSkill> {
    const url = `${this.apiRoot}/getBySubSkillId?subSkillId=${subSkillId}`;
    return this.http.get<SubSkill>(url)
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}


