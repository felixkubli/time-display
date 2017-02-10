import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WeekComponent } from './week.component';
import { NumberDiffPipe } from '../utils/number_diff.pipe';
import { NumberTimePipe } from '../utils/number_time.pipe';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { WeekService} from './week.service';
import { HttpModule } from '@angular/http';

fdescribe('WeekComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeekComponent,
        NumberDiffPipe,
        NumberTimePipe
      ],
      imports: [
        Ng2BootstrapModule.forRoot(),
        HttpModule
      ],
      providers: [
        WeekService
      ]
    });
  });

  let fixture: ComponentFixture<WeekComponent>;
  let component: WeekComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
  });

  it('can create a component', () => {
    expect(component).toBeTruthy();
  });

  
});

