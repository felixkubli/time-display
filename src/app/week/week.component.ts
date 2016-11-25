import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
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
  total_diff: number;
  subscription;
  week: Week = new Week();
  svg_calc: SvgCalculator;

  constructor(private weekService: WeekService) {
    this.goal = localStorage.getItem('goal_today');
    this.progress.goal = this.goal * 5;
    this.svg_calc = new SvgCalculator();
  }

  ngOnInit() {
    this.subscription = this.weekService.getEntrys()
      .subscribe(response => this.week = response);
  }

  ngDoCheck() {
    if (!_.isEmpty(this.week)) {
      this.mergeWeek(this.week.week_totals);

      _.each(this.days, (day) => {
        day.diff = this.calcDifference(day.time);
      });

      this.total_diff = this.calcDifference(this.week.total_grand, 5);
      this.progress.getProgress(this.week.total_grand, this.total_diff);
    }
  }

  mergeWeek(time: any[]) {
    for (let i = 0; i < this.days.length; i++) {
      this.days[i].time = time[i];
    }
  }

  calcDifference(value, goalMultiplier = 1) {
    let diff = _.round(value - (this.goal * goalMultiplier), 1);
    if (diff >= 0) {
      diff = '+' + diff;
    }
    return diff;
  }

  getDiffClass(diff) {
    if (diff >= 0) {
      return 'difference positive';
    } else {
      return 'difference negative';
    }
  }
}
