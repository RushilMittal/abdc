import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingDomain } from '../../../model/training-domain';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AvailableTrainingService } from '../../../services/availabletraining.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-available-trainings',
  templateUrl: './available-trainings.component.html',
  styleUrls: ['./available-trainings.component.css']
})
export class AvailableTrainingsComponent implements OnInit {
  trainingAvailable: TrainingDomain[] = [];
  errorMessage: any;
  date: Date;
  currMonth: number;
  currYear: number;
  month: number;
  year: number;
  closeResult: string;
  showSpinner = false;
  canEdit = false;
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
  constructor(private availableTrainingService: AvailableTrainingService, private router: Router,
    private modalService: NgbModal, private toastrService: ToastrService,
    private employeeService: EmployeeService) { }

  trainingDomainToSend: TrainingDomain;


  ngOnInit() {
    this.showSpinner = true;

    console.log('initialized')
    this.availableTrainingService.getAvailableTraining()
      .subscribe(trainingAvailable => {
        this.trainingAvailable = trainingAvailable;
        this.errorMessage = "No Trainings in this month";
      },
        error => {
          this.errorMessage = <any>error,
            this.showSpinner = false;
        },

        () => {
          this.showSpinner = false;

        }
      );


    this.date = new Date();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.currMonth = this.date.getMonth();
    this.currYear = this.date.getFullYear();
  }


  previous() {
    this.month--;
    if (this.month == -1) {
      this.month = 11;
      this.year--;
    }

  }

  next() {
    this.month++;
    if (this.month == 12) {
      this.month = 0;
      this.year++;
    }
  }

  enrollTraining(trainingId: string) {
    this.availableTrainingService.postEnroll(trainingId).subscribe(
      () => {
        console.log('Training Enrollment API');

        let newTrainingAvail = this.trainingAvailable.filter((trainingAvail: any) => trainingAvail.training.id !== trainingId);
        this.trainingAvailable = newTrainingAvail;
      },
      (error: any) => {
        this.errorMessage = <any>error;
        this.toastrService.error("Unable to Delete");
      }, () => {
        this.toastrService.success('Enrolled Successfully');
      });
  }

  open(content, trainingdom: TrainingDomain) {
    this.trainingDomainToSend = trainingdom;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  canEditFunction(email): boolean {
    console.log(this.trainingAvailable);
    if (email === this.employeeService.employeeDetails.mail)
      return true;
    return false;
  }

}
