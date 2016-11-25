import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ApiService } from './shared';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TimeTodayComponent } from './time_today/time_today.component';
import { TimeTodayService } from './time_today/time_today.service';
import { DetailsComponent } from './details/details.component';
import { WorkspaceService } from './details/workspace.service';
import { DateTodayPipe } from './utils/date_today.pipe';
import { WeekComponent } from './week/week.component';
import { WeekService } from './week/week.service';

@NgModule({
  imports: [
    BrowserModule,
    Ng2BootstrapModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TimeTodayComponent,
    DetailsComponent,
    WeekComponent,
    DateTodayPipe
  ],
  providers: [
    ApiService,
    TimeTodayService,
    WorkspaceService,
    WeekService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
