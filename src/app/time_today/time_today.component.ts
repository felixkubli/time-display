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
  timeToday: TimeToday = new TimeToday();
  subscription;

  constructor(private timeTodayService: TimeTodayService) {
    this.goal = parseFloat(localStorage.getItem('goal_today'));
  }

  ngOnInit() {
    this.subscription = this.timeTodayService.getEntries().subscribe(timeToday => {
      this.timeToday = timeToday;
    });
  }
  ngDoCheck() {
    this.getReached();
    this.difference = this.getDifference();
  }

  reSubscribe() {
    this.subscription.unsubscribe();
    this.subscription = this.timeTodayService.getEntries().subscribe(timeToday => this.timeToday = timeToday);
  }

  getReached() {
    this.reached = this.timeToday.total_grand;
  }  

  setNewGoal(goal) {
    this.goal = goal;
    console.log(this.goal);
    localStorage.setItem('goal_today', <string>this.goal);
  }

  public getDifference() {
    this.difference = _.round((this.reached - this.goal), 1);

    if (this.difference >= 0) {
      this.difference_class = 'difference positive';
      this.progress_type = 'success';
      return '+' + this.difference;
    } else {
      this.difference_class = 'difference negative';
      this.progress_type = 'primary';
      return this.difference;
    }
  }
}
