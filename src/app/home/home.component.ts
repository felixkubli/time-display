import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  input_goal: number;
  input_date: Date;
  date_string: string;

  constructor() {
    this.input_goal = parseFloat(localStorage.getItem('goal_today')) || 0;
    this.input_date = new Date();
    this.date_string = moment(this.input_date).format('YYYY-MM-DD');
  }

}
