import { Subscription } from 'rxjs';
import * as moment from 'moment';

export abstract class Time {
  protected serviceSubscription: Subscription;
  date: Date;

  constructor() {

  }

  protected resubscribeService() {
    this.serviceSubscription.unsubscribe();
    this.subscribeService();
  }

  abstract subscribeService();

  moveUp(times, dateStep) {
    this.date = moment(this.date).add(times, dateStep).toDate();
    this.resubscribeService();
  }

  moveDown(times: number, dateStep) {
    this.date = moment(this.date).subtract(times, dateStep).toDate();
    this.resubscribeService();
  }

  getDiffClass(diff: number) {
    if (diff >= 0) {
      return 'difference positive';
    } else {
      return 'difference negative';
    }
  }
}
