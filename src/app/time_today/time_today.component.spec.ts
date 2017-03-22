import {TestBed, ComponentFixture} from '@angular/core/testing';

import { TimeTodayComponent, TimeTodayService } from '../time_today';
import { Ng2BootstrapModule, ProgressbarConfig } from 'ng2-bootstrap';
import { DateTodayPipe } from '../utils/date_today.pipe';
import { NumberDiffPipe } from '../utils/number_diff.pipe';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TimeTodayMock } from '../mock/time_today.mock';
import { NumberTimePipe } from '../utils/number_time.pipe';

describe('TimeTodayComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeTodayComponent,
        DateTodayPipe,
        NumberTimePipe,
        NumberDiffPipe
      ],
      imports: [
        Ng2BootstrapModule,
        HttpModule
      ],
      providers: [
        TimeTodayService,
        ProgressbarConfig
      ]
    });
  });

  let fixture: ComponentFixture<TimeTodayComponent>;
  let component: TimeTodayComponent;
  let service: TimeTodayService;
  let mock: TimeTodayMock;

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTodayComponent);
    component = fixture.componentInstance;
  });

  it('can create component', () => {
    expect(component).toBeTruthy();
  });

  describe('component with service', () => {
    beforeEach(() => {
      service = TestBed.get(TimeTodayService);
      mock = new TimeTodayMock();
    });

    it('can call the service', () => {
      spyOn(service, 'getEntries').and.returnValue(Observable.of(component.updateValues(mock.getEntrys())));
      expect(component.timeToday).not.toBeUndefined();
      expect(component.timeToday.total_grand).toEqual(6.4);
    });

    describe('subscription', () => {
      beforeEach(() => {
        spyOn(service, 'getEntries').and.returnValue(Observable.of(mock.getEntrys()));
      });

      it('subscribe to service', () => {
        component.subscribeService();
        expect(component.reached).toEqual(6.4);
      });

      it('calls ngOnInit', () => {
        component.ngOnInit();
        expect(component.reached).toEqual(6.4);
      });

      it('resubscribes to service', () => {
        component.ngOnInit();
        let sub = component['serviceSubscription'];
        expect(component.reached).toEqual(6.4);
        component['resubscribeService']();
        expect(component['serviceSubscription']).not.toEqual(sub);
      });
    });
  });

  describe('getDifference', () => {
    describe('positive difference', () => {
      beforeEach(() => {
        component.reached = 9;
        component.goal = 7;
      });

      it('calculates the difference', () => {
        expect(component.getDifference()).toEqual(2);
      });

      it('sets instance variables', () => {
        component.getDifference();
        expect(component.difference).toEqual(2);
        expect(component.difference_class).toEqual('difference positive');
        expect(component.progress_type).toEqual('success');
      });

      it('difference of 0', () => {
        component.reached = 8;
        component.goal = 8;
        expect(component.getDifference()).toEqual(0);
      });

      it('undefined', () => {
        component.goal = undefined;
        component.date = undefined;
        expect(component.getDifference()).toBeFalsy();
      });
    });

    describe('negative difference', () => {
      beforeEach(() => {
        component.reached = 6;
        component.goal = 8;
      });

      it('calculates the difference', () => {
        expect(component.getDifference()).toEqual(-2);
      });

      it('sets instance variables', () => {
        component.getDifference();
        expect(component.difference).toEqual(-2);
        expect(component.difference_class).toEqual('difference negative');
        expect(component.progress_type).toEqual('primary');
      });
    });
  });

  describe('setSettings', () => {
    beforeEach(() => {
      component.goal = 8;
      component.date = new Date();
      component.ngOnInit();
      spyOn(service, 'getEntries').and.returnValue(Observable.of(mock.getEntrys()));
    });

    it('sets the goal', () => {
      let newGoal = 4;
      component.setSettings(4, new Date());
      expect(component.goal).toEqual(newGoal);
    });

    it('sets new Date', () => {
      let newDate = new Date(2016, 3, 10);
      component.setSettings(8, newDate);
      expect(component.date).toEqual(newDate);
    });

    it('undefined', () => {
      expect(component.setSettings(undefined, undefined)).toBeFalsy();
    });
  });
});
