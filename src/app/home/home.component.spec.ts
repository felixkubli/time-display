// This shows a different way of testing a component, check about for a simpler one

import { TestBed, async, inject } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TimeTodayComponent } from '../time_today/time_today.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { DateTodayPipe } from '../utils/date_today.pipe';
import { NumberDiffPipe } from '../utils/number_diff.pipe';
import { TimeTodayService } from '../time_today/time_today.service';
import { HttpModule } from '@angular/http';

describe('Home Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        Ng2BootstrapModule,
        HttpModule
      ],
      providers: [
        TimeTodayService,
        HomeComponent,
        TimeTodayComponent,
        DateTodayPipe,
        NumberDiffPipe
      ]
    });
  });

  let component: HomeComponent;

  beforeEach(async(inject([HomeComponent], (_component: HomeComponent) => {
    component = _component;
  })));

  it('input date should have the right format', () => {
    expect(component['input_date']).toMatch(/[0-9]+-[0-9]+-[0-9]+/);
  });

});
