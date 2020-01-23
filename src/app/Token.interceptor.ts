import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthHelper } from "./services/authHelper.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authHelperService: AuthHelper) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("INside the interceptor");
    if (!(req.url.includes("authenticate") || req.url.includes("register"))) {
      // console.log("not an authenticate call");
      if (!this.authHelperService.isOnline()) {
        this.authHelperService.login();
      }
      if (req.headers.has("Authorization")) {
        return next.handle(req);
      } else if (!req.headers.has("Authorization")) {
        if (this.authHelperService.isOnline()) {
          let token = this.authHelperService.getUser();
          if (token !== null) {
            const headers = req.headers.set("Authorization", "Bearer " + token);

            const reqClone = req.clone({
              headers
            });
            return next.handle(reqClone);
          } else {
            this.authHelperService.login();
          }
        } else {
          this.authHelperService.login();
        }
      }
    } else {
      return next.handle(req);
    }
  }
}
