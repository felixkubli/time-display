import { TestBed, async, inject } from '@angular/core/testing';

import { TimeTodayComponent } from '../time_today/time_today.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DateTodayPipe } from '../utils/date_today.pipe';
import { NumberDiffPipe } from '../utils/number_diff.pipe';
import { TimeTodayService } from '../time_today/time_today.service';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';

describe('TimeTodayComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeTodayComponent,
        DateTodayPipe,
        NumberDiffPipe
      ],
      imports: [
        Ng2BootstrapModule,
        HttpModule
      ],
      providers: [
        TimeTodayService,
      ]
    });
  });

  let component: any;
  let service: TimeTodayService;

  // beforeEach(async(inject([TimeTodayComponent], (_component: TimeTodayComponent) => {
  //   component = _component;
  // })));

  beforeEach(() => {
    component = TestBed.createComponent(TimeTodayComponent);
    service = TestBed.get(TimeTodayService);
  });

  it('can create component', () => {
    expect(component).toBeTruthy();
  });

  it('can call the service', () => {
    let data = {};
    spyOn(service, 'getEntries').and.returnValue(Observable.of(data));
    component.subscribeToService();
    expect(component.timeToday).toEqual(data);
  });

});
