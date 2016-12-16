

import { TestBed, inject } from '@angular/core/testing';
import { TimeTodayService } from './time_today.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Response, ResponseOptions, BaseRequestOptions, Http} from '@angular/http';
import {TimeTodayMock} from '../mock/time_today.mock';
import {TimeToday} from './time_today.model';

describe('TimeTodayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeTodayService,
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
  let service: TimeTodayService;
  let mock: TimeTodayMock;
  let model: TimeToday;

  beforeEach(inject([MockBackend, TimeTodayService], (_mockBackend: MockBackend, _service: TimeTodayService) => {
    mockBackend = _mockBackend;
    service = _service;
    mock = new TimeTodayMock();
  }));

  it('gets service', () => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          status: 200,
          body: mock.data
        })
      ));
    });

    service.getEntries().subscribe(response => model = response);
    expect(model.total_grand).toEqual(6.4);
  });
});
