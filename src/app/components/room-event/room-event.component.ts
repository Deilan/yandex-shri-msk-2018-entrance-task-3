import { Input, Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';
import { IEvent } from '../../models/event';
import { IRoom } from '../../models/room';

@Component({
  selector: 'app-room-event',
  templateUrl: './room-event.component.html',
  styleUrls: ['./room-event.component.css']
})
export class RoomEventComponent implements OnInit {

  @Input()
  public event: IEvent = {};

  @Input()
  public roomTitle = '';

  @ViewChild('timelineItem')
  public timelineItem: ElementRef;

  @ViewChild('details')
  public details: ElementRef;

  constructor() { }

  ngOnInit() {
    document.addEventListener('click', () => {
      this.timelineItem.nativeElement.classList.remove('timeline__item--active');
    });
  }

  public onMeetingClick(event: any): void {
    event.stopPropagation();
    const target = this.timelineItem.nativeElement;
    target.classList.add('timeline__item--active');
    this.details.nativeElement.style.marginLeft = `${target.offsetWidth / 2}px`;
  }

  public getNgClass(event: IEvent): string {
    return `${this.getStarTimeClass(event)} ${this.getDurationClass(event)}`;
  }

  public getStarTimeClass(event: IEvent) {
    const dateStart = moment.utc(event.dateStart);
    // const dateEnd = moment.utc(event.dateEnd);
    return `meeting--start-time--${dateStart.hour()}-${dateStart.minute()}`;
  }

  public getDurationClass(event: IEvent) {
    const dateStart = moment.utc(event.dateStart);
    const dateEnd = moment.utc(event.dateEnd);
    let minutes = dateEnd.diff(dateStart, 'minutes');
    const hours = Math.floor(minutes / 60);
    minutes = minutes % hours;
    return `meeting--duration--${hours}-${minutes}`;
  }

  public getDate(event: IEvent) {
    return moment.utc(event.dateStart).format('DD MMMM');
  }

  public getStartTime(event: IEvent) {
    return moment.utc(event.dateStart).format('HH:mm');
  }

  public getEndTime(event: IEvent) {
    return moment.utc(event.dateEnd).format('HH:mm');
  }

  public get owner() {
    return this.event.users[0];
  }

  public get attendeesCount(): number {
    return this.event.users.length - 1;
  }
}
