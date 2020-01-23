import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthHelper } from "./authHelper.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {

  token: String = null;

  constructor(private router: Router, private authHelperService: AuthHelper) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkloggedIn();
  }

  checkloggedIn(): boolean {

    return true;
  }
}
