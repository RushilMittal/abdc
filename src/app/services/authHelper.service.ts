import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelper } from "./JwtHelper";


@Injectable()
export class AuthHelper {
  public access_token = null;

  private app: any;
  public user = null;
  public isAuthenticated = false;

  constructor(private router: Router) {}

  public login() {
    console.log("Login called");
    // Calling the login page.
    this.router.navigate(["/login"]);

  }

  public getUser(): string {
    let toReturn = null;
    if (localStorage.getItem("Access_Token"))
      toReturn = localStorage.getItem("Access_Token");
    else this.login();

    // console.log("id token " + toReturn);
    if (!(toReturn !== null && this.isValid(toReturn))) {
      toReturn = null;
    }
    return toReturn;
  }
  public setAccessToken(access_token: string) {
    this.access_token = access_token;
    localStorage.setItem("Access_Token", access_token);
    this.isAuthenticated = true;
    if (this.isOnline) this.router.navigate(["/dashboard"]);
  }
  public getAccessToken(): string {
    let toReturn = null;
    if (this.isOnline()) toReturn = localStorage.getItem("Access_Token");
    else this.login();

    if (!(toReturn !== null && this.isValid(toReturn))) {
      toReturn = null;
    }
    return toReturn;
  }
  public logout() {
    // this.app.logout();
    this.isAuthenticated = false;
    this.user = null;
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  public isOnline(): boolean {
    return this.getUser() != null;
  }

  public getCurrentLogin() {
    const user = this.app.getUser();
    return user;
  }

  public getMSGraphAccessToken() {
    return this.getUser();
  }

  public isValid(token: string): boolean {
    var jwtHelper = new JwtHelper();
    var parsedToken = jwtHelper.decodeToken(token);
    let exp = parsedToken.exp * 1000;
    // console.log("expired in " + exp);

    let a = new Date(exp).getTime();
    let b = new Date().getTime();
    if (a < b) {
      return false;
    }
    return true;
  }

  // Function for updation of token value
  refreshToken(tokenName: string, tokenValue: string) {
    localStorage.removeItem(tokenName);
    localStorage.setItem(tokenName, tokenValue);
  }
}
