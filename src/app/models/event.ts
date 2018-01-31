import { IRoom } from './room';
import { IUser } from './user';

export interface IEvent {
  id?: string;
  title?: string;
  dateStart?: string;
  dateEnd?: string;
  users?: IUser[];
  room?: IRoom;
}
