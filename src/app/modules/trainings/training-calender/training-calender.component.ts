import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ap-angular-fullcalendar/src/calendar/calendar';
import { EventService } from '../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-calender',
  templateUrl: './training-calender.component.html',
  styleUrls: ['./training-calender.component.css']
})
export class TrainingCalenderComponent implements OnInit {

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  errorMessage: any;

  calendarOptions: Object = {
    editable: false,
    eventLimit: true,
    height: 500,
    fixedWeekCount: false,
    showNonCurrentDates: false,
    header: {
      left: 'prev,next, today, title',
      center: 'false',
      right: 'false'
    },

    events: null,

    eventClick: (event) => this.onRefresh(event.url,new Date(event.start).getMonth(),new Date(event.start).getFullYear())

  };
  events: Event[];

  constructor(private eventService: EventService, private toastrService: ToastrService,
    private router: Router ) { }


  onRefresh(url :string ,month?:number, year?:number){

    this.router.navigate(['./trainings/myenrolledtrainings/traininglist',{ month :month, year: year }]);
  }

  ngOnInit() {

    this.eventService.getEvents()
      .subscribe( events=>{

         this.calendarOptions = events;
        },
        (error: any) => {
          this.errorMessage = <any>error;
          this.toastrService.error("Unable to Save Some Error Occured");
        }

      );
  }
}
