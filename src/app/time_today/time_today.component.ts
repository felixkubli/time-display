import { Component, OnInit } from '@angular/core';
import { TimeTodayService } from './time_today.service';
import { TimeToday } from './time_today.model';
import * as _ from 'lodash';

@Component({
  selector: 'my-time-today',
  templateUrl: './time_today.component.html',
  styleUrls: ['./time_today.component.scss'],
  providers: [TimeToday]
})

export class TimeTodayComponent implements OnInit {
  difference_class: string = 'difference';
  progress_type: string = 'primary';
  reached: number = 0;
  difference;
  goal: number = 8.4;
  date: Date;
  timeToday: TimeToday = new TimeToday();
  subscription;

  constructor(private timeTodayService: TimeTodayService) {
    this.goal = parseFloat(localStorage.getItem('goal_today')) || 0;
  }

  ngOnInit() {
    this.subscription = this.subscribeToService();
  }

  subscribeToService() {
    return this.timeTodayService.getEntries(this.date).subscribe(timeToday => {
      this.updateValues(timeToday);
    });
  }

  updateValues(timeToday) {
    this.timeToday = timeToday;
    this.getReached();
    this.difference = this.getDifference();
  }

  reSubscribeService() {
    this.subscription.unsubscribe();
    this.subscription = this.subscribeToService();
  }

  getReached() {
    this.reached = this.timeToday.total_grand;
  }

  public getDifference() {
    this.difference = _.round((this.reached - this.goal), 1);

    if (this.difference < 0) {
      this.difference_class = 'difference negative';
      this.progress_type = 'primary';
    } else if (this.difference >= 0) {
      this.difference_class = 'difference positive';
      this.progress_type = 'success';
    }
    return this.difference;
  }

  setSettings(goal: number, date: Date) {
    if (date && goal) {
      this.goal = goal;
      this.date = date;
      localStorage.setItem('goal_today', this.goal + '');
      localStorage.setItem('date', this.date + '');
      this.reSubscribeService();
      return true;
    } else {
      return false;
    }
  }
}
