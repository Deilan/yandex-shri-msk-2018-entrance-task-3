import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import * as moment from 'moment';
// import 'moment/locale/ru';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { DetailsComponent } from './components/details/details.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CommonService } from './services/common.service';
import { FloorComponent } from './components/floor/floor.component';
import { RoomComponent } from './components/room/room.component';
import { RoomEventComponent } from './components/room-event/room-event.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'create-event', component: DetailsComponent },
  { path: 'events/:id', component: DetailsComponent },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full',
  },
];

moment.locale('ru');

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DetailsComponent,
    PageHeaderComponent,
    FloorComponent,
    RoomComponent,
    RoomEventComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'ru' },
    CommonService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache()
    });
  }
}
