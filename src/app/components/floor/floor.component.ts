import { Input, Component, OnInit } from '@angular/core';

import { IFloor } from '../../models/floor';
import { IEvent } from '../../models/event';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  @Input()
  public floor: IFloor;

  constructor() { }

  ngOnInit() {
  }

}
