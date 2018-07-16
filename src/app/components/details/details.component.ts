import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toArray';

import * as _ from 'lodash';
import * as moment from 'moment';

import { CommonService } from '../../services/common.service';
import { IEvent } from '../../models/event';
import { IUser } from '../../models/user';
import { Observable } from 'rxjs/Observable';

enum DetailsComponentMode {
  create,
  edit
}

interface IEventViewModel extends IEvent {
  date?: Date;
  startTime?: Date;
  endTime?: Date;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input()
  public mode: DetailsComponentMode = DetailsComponentMode.create;

  public usersList: IUser[] = [];

  public event: IEventViewModel = {};

  public isDialogDisplayed = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly service: CommonService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.service.getEvent$(parseInt(params.get('id'), 10)))
      .subscribe(data => this.event = this.map(data));
    this.service.getUsers$
      .subscribe(data => this.usersList = data);
  }

  public get isCreateMode(): boolean {
    return this.mode === DetailsComponentMode.create;
  }

  public get title(): string {
    return this.isCreateMode ? 'Новая встреча' : 'Редактирование встречи';
  }

  public onSaveClick(): void {
    const event = this.mapBack(this.event);
    const subscription = this.service.updateEvent(event).subscribe(() => subscription.unsubscribe());
  }

  public onCancelClick(): void {
    this.router.navigate(['/']);
  }

  public onClearClick(): void {
    if (this.event) {
      this.event.title = '';
    }
  }

  public map(event: IEvent): IEventViewModel {
    return {
      ...event,
      date: this.adoptDateForPicker(event.dateStart),
      startTime: this.adoptDateForPicker(event.dateStart),
      endTime: this.adoptDateForPicker(event.dateEnd)
    };
  }

  public mapBack(viewModel: IEventViewModel): IEvent {
    const dateStart = this.mergeDateTime(viewModel.date, viewModel.startTime);
    const dateEnd = this.mergeDateTime(viewModel.date, viewModel.endTime);
    return {
      ...viewModel,
      dateStart: this.adoptDateForPicker(dateStart, true).toISOString(),
      dateEnd: this.adoptDateForPicker(dateEnd, true).toISOString()
    } as IEvent;
  }

  private mergeDateTime(date: Date, time: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
  }

  // workaround for ng-pick-datetime
  public adoptDateForPicker(date: string | Date, reverse: boolean = false) {
    const offset = new Date().getTimezoneOffset() / 60;
    return moment.utc(date).add((reverse ? -offset : offset), 'hour').toDate();
  }

  public onRemoveUserClick(user: IUser): void {
    _.pull(this.event.users, this.event.users.find(u => u.id === user.id));
  }

  public getUsersOptions(): IUser[] {
    return this.usersList && this.event && this.event.users ?
      _.differenceWith(this.usersList, this.event.users, (a, b) => a.id === b.id) :
      [];
  }

  public onUserSelected(userOption: IUser): void {
    this.event.users = [...this.event.users, userOption];
  }

  public onDeleteClicked(): void {
    this.isDialogDisplayed = true;
  }

  public onDeleteConfirmed(): void {
    this.router.navigate(['/', 'index']);
  }

  public onRoomCloseClick(): void {
    delete this.event.room;
  }
}
