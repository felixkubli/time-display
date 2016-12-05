import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { WeekService } from './week.service';
import { Week } from './week.model';
import { SvgCalculator } from '../utils/svg_calculator';
import { Progress } from '../utils/progress';

@Component({
  selector: 'my-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  days: any[] = [
    {day: 'Monday', time: 0.1},
    {day: 'Tuesday', time: null},
    {day: 'Wednesday', time: null},
    {day: 'Thursday', time: null},
    {day: 'Friday', time: null},
    {day: 'Saturday', time: null},
    {day: 'Sunday', time: null}
  ];
  progress: Progress = new Progress();
  goal: number;
  input_goal_day: number;
  week_goal: number;
  input_goal_week: number;
  total_diff: number;
  subscription;
  week: Week = new Week();
  date: Date;
  input_date: string;
  svg_calc: SvgCalculator;


  constructor(private weekService: WeekService) {
    this.goal = +localStorage.getItem('goal_today');
    this.input_goal_day = this.goal;
    this.week_goal = this.goal * 5;
    this.input_goal_week = this.week_goal;
    this.svg_calc = new SvgCalculator();
    this.input_date = moment().format('YYYY-[W]W');
  }

  ngOnInit() {
    this.subscribeService();
  }

  subscribeService() {
    this.subscription = this.weekService.getEntrys(this.date)
      .subscribe(response => {
        this.week = response;
        this.updateValues();
      });
  }
  updateValues() {
    this.mergeWeek(this.week.week_totals);
    _.each(this.days, (day) => {
      day.diff = this.calcDifference(day.time);
    });
    this.total_diff = this.calcDifference(this.week.total_grand, false);
    this.progress.getProgress(this.week.total_grand, this.goal * 5, this.total_diff);
  }

  reSubscribeService() {
    this.subscription.unsubscribe();
    this.subscribeService();
  }

  mergeWeek(time: any[]) {
    for (let i = 0; i < this.days.length; i++) {
      this.days[i].time = time[i];
    }
  }

  calcDifference(value, day = true) {
    if (day === true) {
      return _.round(value - this.goal, 1);
    } else {
      return _.round(value - this.week_goal, 1);
    }
  }

  getDiffClass(diff) {
    if (diff >= 0) {
      return 'difference positive';
    } else {
      return 'difference negative';
    }
  }

  setSettings(goal: number, date: Date) {
    this.goal = goal;
    this.date = date;
    console.log(this.goal);
    localStorage.setItem('goal_today', this.goal + '');
    if (date) {
      localStorage.setItem('week', this.date + '');
      this.reSubscribeService();
    }
    return true;
  }

  setWeekGoal() {
    this.input_goal_week = this.input_goal_day * 5;
  }

  setDayGoal() {
    this.input_goal_day = _.round((this.input_goal_week / 5), 1);
  }
}
