import {Component} from '@angular/core';
import {TimeToday} from '../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TimeToday]
})

export class HomeComponent {
  goal: number;
  reached: number;
  difference_class: string = 'difference';
  progress_type: string = 'primary';

  constructor(private time: TimeToday) {
    this.goal = time.goal;
    this.reached = time.reached;
  }

  public getDifference() {
    let difference: number = this.reached - this.goal;
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
