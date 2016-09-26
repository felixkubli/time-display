import {Component} from '@angular/core';
import {TimeToday} from '../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TimeToday]
})

export class HomeComponent {
  difference_class: string = 'difference';
  progress_type: string = 'primary';
  reached: number = 0;

  constructor(private time: TimeToday) {
    this.getReached();
  }

  getReached() {
    this.time.tickets.forEach((ticket) => {
      this.reached += ticket.duration;
    });
    return this.reached;
  }

  public getDifference() {
    let difference: number = this.reached - this.time.goal;
    difference = Math.round(difference * 100) / 100;

    if (difference >= 0) {
      this.difference_class = 'difference positive';
      this.progress_type = 'success';
      return '+' + difference;
    } else {
      this.difference_class = 'difference negative';
      return difference;
    }
  }
}
