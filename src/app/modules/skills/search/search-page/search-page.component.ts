import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
 selector: 'app-search-page',
 templateUrl: './search-page.component.html',
 styleUrls: ['./search-page.component.css'],

})
export class SearchPageComponent implements OnInit {

 constructor(private location: Location) {

 }

filter: string;

goBack(): void {
  this.location.back();
}

 ngOnInit() {
   const x = document.getElementById('modelSkill-search');
   x.focus();
 }

}

