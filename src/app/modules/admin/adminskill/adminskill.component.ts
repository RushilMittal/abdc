import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../../services/adminService';
import { SubSkill } from '../../../model/SubSkill';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adminskill',
  templateUrl: './adminskill.component.html',
  styleUrls: ['./adminskill.component.css']
})
export class AdminskillComponent implements OnInit {
  source: SubSkill[];
  settings = {
    actions: {
      delete: false
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {

      subSkill: {
        title: 'Sub Skill'
      },
      modelSkill: {
        title: 'Skill'
      },
      modelSkillGroup: {
        title: 'Skill Group'
      },
      modelSubSkillDesc: {
        title: 'Sub Skill Description'
      }

    },
    pager: {
      display: true,
      perPage: 10
    }
  };
  closeResult: string;
  value = "1";
  constructor(private adminService: AdminServices,
    private toastrService: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadSource();

  }

  open(content) {
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

  loadSource() {
    this.adminService.getAllAdminSkill().subscribe(
      data => {
        this.source = data;

      }, error => {
        console.log("error error" + error);
      }
    );
  }

  // method called while updating the new row.
  onSaveConfirm(event) {
    console.log(event.newData);

    if (this.validateData(event)) {
      console.log(event.newData['id']);


      this.adminService.UpdateNewSkill(this.convertToSubskillObject(event.newData['id'], event.newData)).subscribe(
        () => console.log('Product Passed to savefunction'),
        (error: any) => {
          this.toastrService.error("Unable to Save Some Error Occured");
          event.confirm.reject();
        },
        () => {
          this.toastrService.success("Skill Updated");
          event.confirm.resolve(event.newData);
          this.loadSource();
        });
    }
  }

  //method called on the addition of new row.
  onCreateConfirm(event) {
    if (this.validateData(event)) {
      let a = this.source.length + 1;
      console.log("on create" + a.toString());

      this.adminService.SaveNewSkill(this.convertToSubskillObject(a.toString(), event.newData)).subscribe(
        () => console.log('Product Passed to savefunction'),
        (error: any) => {
          this.toastrService.error("Unable to Save Some Error Occured");
          event.confirm.reject();
        },
        () => {
          this.toastrService.success("New Skill Added to the List");
          event.confirm.resolve(event.newData);

          this.loadSource();
        });
    }
  }

  //method used to validate the data received on save or edit
  validateData(event): boolean {
    if ((event.newData['subSkill']) || (event.newData['modelSkill']) || (event.newData['modelSkillGroup']) || (event.newData['modelSubSkillDesc'])) {
      return true;
    }
    return false;
  }

  convertToSubskillObject(id: string, event): SubSkill {
    let toReturn = new SubSkill();
    toReturn.id = id;
    toReturn.modelSkill = event['modelSkill'];
    toReturn.modelSkillGroup = event['modelSkillGroup'];
    toReturn.subSkill = event['subSkill'];
    toReturn.modelSubSkillDesc = event['modelSubSkillDesc'];
    toReturn.modelPractice = event['modelPractice'];
    return toReturn;
  }



}
