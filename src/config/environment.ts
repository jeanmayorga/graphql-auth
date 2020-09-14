import * as envalid from 'envalid';
import path from 'path';

const { str } = envalid;

export const env = envalid.cleanEnv(
  process.env,
  {
    NODE_ENV: str(),
    DB_NAME: str(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_HOST: str(),
    JWT_SECRET: str(),
    JWT_REFRESH_TOKEN_SECRET: str(),
  },
  { strict: true, dotEnvPath: path.resolve(__dirname, '../../.env') },
);
