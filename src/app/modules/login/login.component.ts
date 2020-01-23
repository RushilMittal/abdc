import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHelper } from "../../services/authHelper.service";
import { JwtRequest } from "../../model/JwtRequest";
import { AuthenticateService } from "../../services/Authenticate.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  jwtRequest: JwtRequest = new JwtRequest();
  access_token: string;
  constructor(
    private authHelperService: AuthHelper,
    private router: Router,
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit() {
    //Call authhelper, determine if user is logged in, if not redirect to login
    if (this.authHelperService.isOnline()) {
      this.router.navigate(["/dashboard"]);
    }
  }

  signIn() {
    console.log(this.jwtRequest);
    this.authenticateService.callAuthenticate(this.jwtRequest).subscribe(
      data => {
        console.log(data);
        this.access_token = data.token;
      },
      (error: any) => {},
      () => {
        //call the authservice api to update the online function.
        this.authHelperService.setAccessToken(this.access_token);
      }
    );
    //call the authenticate api and save the jwt token as Access_Token
    //call the authservice to update is online function.
  }
}
