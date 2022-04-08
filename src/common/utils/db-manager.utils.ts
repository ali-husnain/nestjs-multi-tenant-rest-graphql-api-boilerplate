import { Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from 'src/tenancy/tenancy.symbol';
import { Connection, getConnectionManager } from 'typeorm';

@Injectable()
export class DbManager {
  public _masterDb: Connection;
  public _db: Connection;
  constructor(@Inject(CONNECTION) connection: Connection) {
    this._masterDb = getConnectionManager().get(); //this will default connection
    this._db = connection; //this will return tenant connection---if not mts then default database connection
  }
}
