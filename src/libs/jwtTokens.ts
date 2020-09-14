import jwt from 'jsonwebtoken';

import { env, consts } from '../config';
import { JwtToken } from '../services/auth';

const refreshTokens: string[] = [];

export async function generateAccessToken(options: { payload: JwtToken }) {
  return jwt.sign(options.payload, env.JWT_SECRET || '', { expiresIn: consts.EXPIRES_TOKEN_IN });
}

export async function verifyAccessToken(options: { token: string }) {
  return jwt.verify(options.token, env.JWT_SECRET) as JwtToken;
}

export async function generateRefreshToken(options: { payload: JwtToken }) {
  const refreshToken = jwt.sign(options.payload, env.JWT_REFRESH_TOKEN_SECRET || '');
  refreshTokens.push(refreshToken);

  return refreshToken;
}

export async function verifyRefreshToken(options: { token: string }) {
  if (!refreshTokens.includes(options.token)) {
    throw new Error('no token was found');
  }

  const payload = jwt.verify(options.token, env.JWT_REFRESH_TOKEN_SECRET || '') as JwtToken;

  return generateAccessToken({ payload });
}
