import { IRoom } from './room';

export interface IFloor {
  number: number;
  rooms: IRoom[];
}
