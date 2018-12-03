import { Connection } from 'typeorm/connection/Connection';

export interface IRespondCreator {
  getConnection(): Connection;
}
