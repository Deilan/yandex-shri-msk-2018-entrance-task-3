import { Input, Component, OnInit } from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';
import { IEvent } from '../../models/event';
import { IRoom } from '../../models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Input()
  public room: IRoom;

  constructor() { }

  ngOnInit() {
  }
}
