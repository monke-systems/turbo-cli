import * as crypto from 'crypto';
// import { Connection } from 'typeorm';

export const getRandomString = (length: number) =>
  crypto.randomBytes(Math.floor(length / 2)).toString('hex');
//
// const generateDatabaseName = () => {
//   return `nestjs_test_db_${getRandomString(10)}`;
// };
//
// export const initTestDatabase = async (connection: Connection): Promise<string> => {
//   const dbName = generateDatabaseName();
//   await connection.synchronize(true);
//   return dbName;
// };
//
// export const deleteTestDatabase = async (connection: Connection) => {
//   await connection.dropDatabase();
// };
