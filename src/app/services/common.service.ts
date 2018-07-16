import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';

import { mapTo } from 'rxjs/operators/mapTo';
import { combineLatest } from 'rxjs/observable/combineLatest';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import * as _ from 'lodash';

import { IRoom } from '../models/room';
import { IEvent } from '../models/event';
import { IUser } from '../models/user';

@Injectable()
export class CommonService {
  // tslint:disable:member-ordering

  private readonly queryRooms = gql`
    query {
      rooms {
        id, title, capacity, floor, events {
          id, title, dateStart, dateEnd, users {
            id, login, homeFloor, avatarUrl
          }
        }
      }
    }
  `;

  private readonly queryEvents = gql`
    query {
      events {
        id, title, dateStart, dateEnd, users {
          id, login, homeFloor, avatarUrl
        }, room {
          id, title, capacity, floor
        }
      }
    }
  `;

  private readonly queryUsers = gql`
    query {
      users {
        id, login, homeFloor, avatarUrl
      }
    }
  `;

  private queryEvent(id: number) {
    return gql`
      query {
        event(id: ${id}) {
          id, title, dateStart, dateEnd, users {
            id, login, homeFloor, avatarUrl
          }, room {
            id, title, capacity, floor
          }
        }
      }
    `;
  }

  private updateEventMutation(event: IEvent) {
    return gql`
      mutation {
        updateEvent(id: ${event.id}, input: {
          title: "${event.title}",
          dateStart: "${event.dateStart}",
          dateEnd: "${event.dateEnd}"
        }) {
          id
        }
      }
    `;
  }

  private setUsersOfEventMutation(event: IEvent) {
    return gql`
      mutation {
        setUsersOfEvent(id: ${event.id}, usersIds: [${event.users.map(user => user.id).join(', ')}]) {
          id
        }
      }
    `;
  }

  public getRooms$ = this.apollo.watchQuery({ query: this.queryRooms })
    .valueChanges
    // https://github.com/apollographql/apollo-angular/issues/306
    .map(({ data }: { data: any }) => _.cloneDeep(data.rooms) as IRoom[]);

  public getEvents$ = this.apollo.watchQuery({ query: this.queryEvents })
    .valueChanges
    // https://github.com/apollographql/apollo-angular/issues/306
    .map(({ data }: { data: any }) => _.cloneDeep(data.events) as IEvent[]);

  public getUsers$ = this.apollo.watchQuery({ query: this.queryUsers })
    .valueChanges
    // https://github.com/apollographql/apollo-angular/issues/306
    .map(({ data }: { data: any }) => _.cloneDeep(data.users) as IUser[]);

  public getEvent$(id: number) {
    return this.apollo.watchQuery({ query: this.queryEvent(id) })
      .valueChanges
      .map(({ data }: { data: any }) => _.cloneDeep(data.event) as IEvent);
  }

  public updateEvent(event: IEvent) {
    return this.apollo.mutate({ mutation: this.updateEventMutation(event) })
      .concatMap(() => this.apollo.mutate({ mutation: this.setUsersOfEventMutation(event) }))
      .map(({ data }: { data: any }) => _.cloneDeep(data.setUsersOfEvent) as IEvent);
  }

  constructor(private readonly apollo: Apollo) {
  }
  // tslint:enable:member-ordering
}
