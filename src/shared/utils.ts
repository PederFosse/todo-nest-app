import { Logger } from "@nestjs/common";
import { getConnection, getConnectionOptions } from "typeorm";
import * as bcrypt from 'bcrypt';

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>(resolve => { resolve(data); });
}

export const getDbConnectionOptions = async (connetionName: string = 'default') => {
  const options = await getConnectionOptions(process.env.NODE_ENV || 'development');
  return {
    ...options,
    name: connetionName,
  };
};

export const getDbConnection = async (connectionName: string = 'default') => {
  return await getConnection(connectionName);
}

export const runDbMigrations = async (connectionName: string = 'default') => {
  const conn = await getDbConnection(connectionName);
  await conn.runMigrations();
}

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};