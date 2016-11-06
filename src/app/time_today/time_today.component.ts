import { Component } from '@angular/core';
import { TimeTodayService } from './time_today.service';
import { TimeToday } from './time_today.model';

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
  timeToday: TimeToday[] = [];
  subscription;

  constructor(private timeTodayService: TimeTodayService) {

  }

  ngOnInit() {
    this.subscription = this.timeTodayService.getEntries().subscribe(timeToday => this.timeToday = timeToday);
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
    this.reached = 0;
    this.timeToday.forEach((ticket) => {
      this.reached += ticket.duration;
    });

    return this.reached;
  }

  public getDifference() {
    this.difference = Math.round((this.reached - this.goal) * 100) / 100;

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
