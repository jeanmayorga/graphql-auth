import { db } from '../database';
import { logger } from '../utils';

const connection = {
  isConnected: false,
};

export async function connectDatabase() {
  if (connection.isConnected) {
    logger.info('database is connected from cache.');
    return true;
  }
  try {
    await db.authenticate();
    connection.isConnected = true;
    logger.info('database is connected.');
    return true;
  } catch (error) {
    logger.child({ error }).error('database connection failed.');
    return false;
  }
}
