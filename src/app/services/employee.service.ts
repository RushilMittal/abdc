import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmployeeDetails } from "../model/EmployeeDetail";
import { ErrorHandler } from "./handleerror.service";
import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Role } from "../model/Role";
import { AdminServices } from "./adminService";
import { AuthenticateService } from "./Authenticate.service";

@Injectable()
export class EmployeeService {
  public employeeDetails: EmployeeDetails;
  private _headers = new HttpHeaders();
  public isAdmin = false;
  source: Role[];

  constructor(
    private httpClient: HttpClient,
    private handler: ErrorHandler,
    private router: Router,
    private adminService: AdminServices,
    private authenticateService: AuthenticateService
  ) {}


  /*
   * Function used to initialize the userdetails.
   * Called at login time.
   */
  initializeEmployeeDetails() {
    this.authenticateService.getEmployeeDetails().subscribe(
      data => {
        this.employeeDetails = data;
      },
      (error: any) => {
        console.log(error);
        this.router.navigate(["/dashboard"]);
      },
      () => {
        this.loadSource();
      }
    );
  }

  /*
   * Function to fetch all the roles present in the Collection
   * fills the source Roles array with data
   */
  loadSource() {
    console.log("loading source");
    this.source = null;
    this.adminService.getAllAdminRoles().subscribe(
      data => {
        this.source = data;
        console.log(data);
      },
      error => {
        console.log("error error" + error);
      },
      () => {
        this.checkRoleAdmin();
      }
    );
  }

  /*
   * Function to determie whether the user is allowed to access the admin resources.
   * returns true for admin roles and viceversa
   */
  checkRoleAdmin(): boolean {
    console.log("check admin role called");
    console.log(this.employeeDetails);
    if (this.employeeDetails) {
      let check =
        this.checkUser(this.employeeDetails.jobTitle) ||
        this.checkUser(this.employeeDetails.mail);
      if (check) {
        this.isAdmin = true;
        return true;
      } else {
        this.isAdmin = false;
        return false;
      }
     // this.router.navigate(["/dashboard"]);
    } else {
      console.log("inside the else no employeedetails found");
      this.initializeEmployeeDetails();
    }
  }

  /*
   * Helper function used in determine the admin role for the particular user.
   * param : role (jobtitle of the user) from graph.
   */
  checkUser(role: string): boolean {
    if (this.source) {
      let i = 0;
      for (i = 0; i < this.source.length; i++) {
        if (role === this.source[i].userRole) return true;
      }
    } else {
      this.loadSource();
      return false;
    }
  }

}
