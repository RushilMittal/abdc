import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-allskill',
  templateUrl: './allskill.component.html',
  styleUrls: ['./allskill.component.css']
})
export class AllskillComponent implements OnInit {
  @Input() skills: string[];
  @Input() modelSkillGroup: string;
  errorMessage: any;
  constructor() { }
  ngOnInit() {

  }


}
