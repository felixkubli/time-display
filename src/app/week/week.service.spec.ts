import { TestBed } from '@angular/core/testing';
import { WeekService } from './week.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, Http, Response, ResponseOptions} from '@angular/http';
import { Week } from './week.model';
import { WeekMock } from '../mock/week.mock';

describe('WeekService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeekService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  let mockBackend: MockBackend;
  let service: WeekService;
  let model: Week;
  let weekMock: WeekMock;

  beforeEach(() => {
    mockBackend = TestBed.get(MockBackend);
    service = TestBed.get(WeekService);
    weekMock = new WeekMock();
  });

  describe('#setUrl', () => {
    let date = '2017-01-27';
    it('returns the url with set data', () => {
      service.date = date;
      expect(service['setUrl']()).toContain(date);
    });

    it('sets instance variable', () => {
      service.date = date;
      service['setUrl']();
      expect(service.url).toContain(date);
    });
  });

  describe('#getEntrys', () => {
    beforeEach(() => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            status: 200,
            body: weekMock.data
          })
        ));
      });
    });

    it('returns week object', () => {
      service.getEntrys().subscribe(response => model = response);
      expect(model.total_grand).toEqual(39.42);
    });

    it('accepts date parameter', () => {
      let dateString = '2017-01-23';
      service.getEntrys(new Date(2017, 0, 27));
      expect(service.date).toEqual(dateString);
      expect(service.url).toContain(dateString);
    });
  });
});

