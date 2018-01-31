import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

import { IRoom } from '../../models/room';
import { IEvent } from '../../models/event';
import { IFloor } from '../../models/floor';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  private getRoomsSubscription: Subscription;
  public floors: IFloor[];
  public events: IEvent[];

  constructor(private readonly service: CommonService) { }

  ngOnInit() {
    this.getRoomsSubscription = this.service.getRooms$.subscribe(data => {
      this.floors = _.chain(data)
        .groupBy(room => room.floor)
        .mapValues((rooms, floor): IFloor => ({
          number: parseInt(floor, 10),
          rooms: rooms
        }))
        .values<IFloor>()
        .value();
        console.log(this.floors);
    });
    this.service.getEvents$.subscribe(data => {
      // data.forEach(x => console.log(this.getDate(x)));
    });
  }


  // .groupBy((feedline: IFeedlinePayload) => feedline.batchNumber)
  // .mapValues((batchFeedlines: IFeedlinePayload[], batchNumber: string) =>
  //     this.convertBatchFeedlines(batchFeedlines, parseInt(batchNumber, 10)))
  // .values<IBatch>()

  ngOnDestroy() {
    this.getRoomsSubscription.unsubscribe();
  }

}
