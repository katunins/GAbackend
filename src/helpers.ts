import { env } from './environments/environments';
import { sign, verify, decode } from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Schema } from 'mongoose';

interface IGetAccessToken {
  id: string;
  deviceId: string;
}

interface IDecodeToken {
  id: string;
  deviceId: string;
  exp: number;
}

export const getAccessToken = async ({ id, deviceId }: IGetAccessToken) => {
  const accessToken = await sign({
    id,
    deviceId,
  }, env.secret, { expiresIn: '1h' });
  return accessToken;
};

export const decodeToken = async (accessToken: string) => {
  const result: IDecodeToken = await decode(accessToken);
  if (result?.id && result?.deviceId) {
    return { ...result, expired: new Date() > new Date(result.exp * 1000)  };
  }
  throw new HttpException('Не верный токен', HttpStatus.FORBIDDEN);
};
