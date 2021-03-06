import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { WeekService } from './week.service';
import { Week } from './week.model';
import { WeeklySettings } from './weekly_settings.interface';
import { SvgCalculator } from '../utils/svg_calculator';
import { Progress } from '../utils/progress';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  days: any = {
    withValue: 1,
    setValue: undefined,
    all: [
      { day: 'Monday', time: 0.1 },
      { day: 'Tuesday', time: null },
      { day: 'Wednesday', time: null },
      { day: 'Thursday', time: null },
      { day: 'Friday', time: null },
      { day: 'Saturday', time: null },
      { day: 'Sunday', time: null }
    ]
  };
  progress: Progress = new Progress();
  goal: number;
  total_diff: number;
  subscription: Subscription;
  week: Week = new Week();
  settings: WeeklySettings;
  date: Date;
  svg_calc: SvgCalculator;

  constructor(private weekService: WeekService) {
    this.goal = +localStorage.getItem('goal_today');
    this.svg_calc = new SvgCalculator();
    this.settings = {
      goal: {
        day: this.goal,
      },
      date: moment().format('YYYY-[W]WW'),
      numOfDays: undefined
    };
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
    _.each(this.days.all, (day) => {
      day.diff = this.calcDifference(day.time);
    });
    if (this.settings.numOfDays) { this.days.withValue = this.settings.numOfDays; }
    this.total_diff = this.calcDifference(this.week.total_grand, this.days.withValue);
    this.progress.getProgress(this.week.total_grand, this.goal * this.days.withValue, this.total_diff);
  }

  reSubscribeService() {
    this.subscription.unsubscribe();
    this.subscribeService();
  }

  mergeWeek(time: any[]) {
    let value = 0;
    for (let i = 0; i < this.days.all.length; i++) {
      this.days.all[i].time = time[i];
      if (time[i] != null) {
        value += 1;
      }
    }
    this.setNumberOfDays(value);
  }

  setNumberOfDays (value) {
    if (this.days.setValue) {
      this.days.withValue = this.days.setValue;
    } else {
      this.days.withValue = value;
    }
  }

  calcDifference(value: number, multiplier = 1) {
    return _.round(value - this.goal * multiplier, 2);
  }

  getDiffClass(diff) {
    if (diff >= 0) {
      return 'difference positive';
    } else {
      return 'difference negative';
    }
  }

  moveWeekUp() {
    this.date = moment(this.date).add(1, 'week').toDate();
    this.reSubscribeService();
  }

  moveWeekDown() {
    this.date = moment(this.date).subtract(1, 'week').toDate();
    this.reSubscribeService();
  }

  setSettings(settings: WeeklySettings, date: Date) {
    this.goal = settings.goal.day;
    this.date = date;
    this.days.setValue = Math.abs(settings.numOfDays);
    localStorage.setItem('goal_today', this.goal + '');
    if (date) {
      localStorage.setItem('week', this.date + '');
      this.reSubscribeService();
    }
    return true;
  }

  formattedDate() {
    let date = moment(this.date).days(1);
    return date.format('YYYY-MM-DD') + ' - ' + date.add(6, 'days').format('YYYY-MM-DD');
  }
}
