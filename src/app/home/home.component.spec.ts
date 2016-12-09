// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TimeTodayComponent } from '../time_today/time_today.component';

describe('Home Component', () => {
  const html = '<my-home></my-home>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [HomeComponent, TimeTodayComponent]});
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
