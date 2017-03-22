import { Component, OnInit } from '@angular/core';
import { TimeTodayService } from './time_today.service';
import { TimeToday } from './time_today.model';
import * as _ from 'lodash';
import { Time } from '../time/time';

@Component({
  selector: 'my-time-today',
  templateUrl: './time_today.component.html',
  styleUrls: ['./time_today.component.scss'],
  providers: [TimeToday]
})

export class TimeTodayComponent extends Time implements OnInit {
  difference_class: string = 'difference';
  progress_type: string = 'primary';
  reached: number = 0;
  difference;
  goal: number = 8.4;
  timeToday: TimeToday = new TimeToday();

  constructor(private timeTodayService: TimeTodayService) {
    super();
    this.goal = parseFloat(localStorage.getItem('goal_today')) || 0;
  }

  ngOnInit() {
    this.subscribeService();
  }

  subscribeService() {
    this.serviceSubscription =  this.timeTodayService.getEntries(this.date).subscribe(timeToday => {
      this.updateValues(timeToday);
    });
  }

  updateValues(timeToday) {
    this.timeToday = timeToday;
    this.getReached();
    this.difference = this.getDifference();
  }

  getReached() {
    this.reached = this.timeToday.total_grand;
  }

  getDifference() {
    this.difference = _.round((this.reached - this.goal), 2);

    if (this.difference < 0) {
      this.progress_type = 'primary';
    } else if (this.difference >= 0) {
      this.progress_type = 'success';
    }
    this.difference_class = this.getDiffClass(this.difference);

    return this.difference;
  }

  setSettings(goal: number, date: Date) {
    if (date && goal) {
      this.goal = goal;
      this.date = date;
      localStorage.setItem('goal_today', this.goal + '');
      localStorage.setItem('date', this.date + '');
      this.resubscribeService();
      return true;
    } else {
      return false;
    }
  }
}
