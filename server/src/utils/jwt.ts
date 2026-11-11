import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'knightora-access-secret-change-in-prod';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'knightora-refresh-secret-change-in-prod';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateAccessToken = (user: Pick<IUser, '_id' | 'email' | 'role'>): string => {
  return jwt.sign(
    { userId: String(user._id), email: user.email, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user: Pick<IUser, '_id' | 'email' | 'role'>): string => {
  return jwt.sign(
    { userId: String(user._id), email: user.email, role: user.role },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
};
