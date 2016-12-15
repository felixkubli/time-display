import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  input_goal: number;
  date: Date;
  input_date: string;

  constructor() {
    this.input_goal = parseFloat(localStorage.getItem('goal_today')) || 0;
    this.date = new Date();
    this.input_date = moment(this.date).format('YYYY-MM-DD');
  }

}
