import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { env } from 'process';

export function getTenantConnection(dbName: string): Promise<Connection> {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(dbName)) {
    const connection = connectionManager.get(dbName);
    return Promise.resolve(
      connection.isConnected ? connection : connection.connect(),
    );
  }

  return createConnection({
    name: dbName,
    type: 'mysql',
    host: env.MYSQLHOST,
    port: parseInt(env.MYSQLPORT),
    username: env.MYSQLUSERNAME,
    password: env.MYSQLPASSWORD,
    database: dbName,
    entities: ['dist/**/*.entity{.ts,.js}'], //regix for entity loading
    synchronize: false, //always set false otherwise alter the tables
  });
}
