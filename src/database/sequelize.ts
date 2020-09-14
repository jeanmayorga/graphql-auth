import { Sequelize } from 'sequelize';
import { env } from '../config';

export const db = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: 'mysql',
});
