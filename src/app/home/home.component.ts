import {Component} from '@angular/core';
import {TimeToday} from "../shared";

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TimeToday]
})

export class HomeComponent {
  goal: number;
  reached: number;

  constructor(private time: TimeToday) {
    this.goal = time.goal;
    this.reached = time.reached;
  }
}
