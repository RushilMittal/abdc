import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { baseUrlRole, baseUrlAdmin } from "../baseUrl";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandler } from "./handleerror.service";
import { SubSkill } from "../model/SubSkill";
import { catchError } from "rxjs/operators";
import { AuthHelper } from "./authHelper.service";
import { Certification } from "../model/Certification";
import { Role } from "../model/Role";

@Injectable()
export class AdminServices {
  private apiRoot = baseUrlAdmin;
  private apiRole = baseUrlRole;
  private _headers = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private handler: ErrorHandler,
    private authHelper: AuthHelper
  ) {}

  getAllAdminRoles(): Observable<Role[]>
  {
    const url = `${this.apiRole}/adminRoles`;

    return this.http
      .get<Role[]>(url, { headers: this._headers })
      .pipe(catchError(this.handler.handleError));
  }

  getAllAdminSkill(): Observable<SubSkill[]>
  {
    const url = `${this.apiRoot}/getAllAdminSkills`;
    console.log(url);

    return this.http
      .get<SubSkill[]>(url, { headers: this._headers })
      .pipe(catchError(this.handler.handleError));
  }

  UpdateNewSkill(subSkill: SubSkill): Observable<SubSkill> {
    const url = `${this.apiRoot}/updateNewSkill`;
    let token = this.authHelper.getAccessToken();
    let idToken = this.authHelper.getUser();

    console.log("inside the admin calls " + token);
    if (!this._headers.has("Authorization")) {
      const graphToken = token;
      this._headers = this._headers.set("Token", graphToken);
      this._headers = this._headers.set("Authorization", "Bearer " + idToken);
    }

    return this.http
      .put<SubSkill>(url, subSkill, { headers: this._headers })
      .pipe(catchError(this.handler.handleError));
  }

  SaveNewRole(role: Role): Observable<Role> {
    const url = `${this.apiRole}/addAdminRole`;
    let token = this.authHelper.getAccessToken();
    let idToken = this.authHelper.getUser();

    console.log("inside the admin calls " + token);
    if (!this._headers.has("Authorization")) {
      const graphToken = token;
      this._headers = this._headers.set("Token", graphToken);
      this._headers = this._headers.set("Authorization", "Bearer " + idToken);
    }
    return this.http
      .post<Role>(url, role, { headers: this._headers })
      .pipe(catchError(this.handler.handleError));
  }

  SaveNewSkill(subSkill: SubSkill): Observable<SubSkill> {
    const url = `${this.apiRoot}/addNewSkill`;
    let token = this.authHelper.getAccessToken();
    let idToken = this.authHelper.getUser();

    console.log("inside the admin calls " + token);
    if (!this._headers.has("Authorization")) {
      const graphToken = token;
      this._headers = this._headers.set("Token", graphToken);
      this._headers = this._headers.set("Authorization", "Bearer " + idToken);
    }
    return this.http
      .post<SubSkill>(url, subSkill, { headers: this._headers })
      .pipe(catchError(this.handler.handleError));
  }

  UpdateCertificate(certification: Certification): Observable<Certification> {
    const url = `${this.apiRoot}/updateCertificate`;
    let token = this.authHelper.getAccessToken();
    let idToken = this.authHelper.getUser();

    console.log("inside the admin calls " + token);
    if (!this._headers.has("Authorization")) {
      const graphToken = token;
      this._headers = this._headers.set("Token", graphToken);
      this._headers = this._headers.set("Authorization", "Bearer " + idToken);
    }

    return this.http
      .put<Certification>(url, certification, { headers: this._headers })
      .pipe(catchError(this.handler.handleError));
  }

  deleteRole(role: Role): Observable<Role> {
    const url = `${this.apiRole}/deleteRole?id=${role.id}`;
    let token = this.authHelper.getAccessToken();
    let idToken = this.authHelper.getUser();
    if (!this._headers.has("Authorization")) {
      const graphToken = token;
      this._headers = this._headers.set("Token", graphToken);
      this._headers = this._headers.set("Authorization", "Bearer " + idToken);
    }

    return this.http
      .delete<Role>(url, { headers: this._headers })
      .pipe(catchError(this.handler.handleError));
  }
}
