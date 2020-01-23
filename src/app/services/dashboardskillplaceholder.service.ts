import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { baseUrlSkill } from '../baseUrl';
import { EmployeeSkillPlaceholder } from '../model/EmployeeSkillPlaceholder';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from './handleerror.service';

@Injectable()
export class DashBoardSkillPlaceHolderService {

    private apiRoot = baseUrlSkill;
    constructor(private http: HttpClient, private handler: ErrorHandler) { }

    getemployeeSkillPlaceholder(): Observable<EmployeeSkillPlaceholder> {
        let date = new Date();
        console.log(date);
        const url = `${this.apiRoot}/getEmployeeSkillPlaceholder`;
        console.log("going to call get" + url);
        return this.http.get<EmployeeSkillPlaceholder>(url)
            .pipe(
                catchError(this.handler.handleError)
            );
    }

}
