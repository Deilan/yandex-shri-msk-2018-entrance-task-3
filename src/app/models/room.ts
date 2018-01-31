import { IEvent } from './event';

export interface IRoom {
  id?: string;
  title?: string;
  capacity?: number;
  floor?: number;
  events?: IEvent[];
}
