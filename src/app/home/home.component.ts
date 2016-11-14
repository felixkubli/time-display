import {Component} from '@angular/core';
import {TimeTodayComponent} from '../time_today/time_today.component';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [TimeTodayComponent]
})

export class HomeComponent {

  constructor() {

  }

}
