import { env } from './environments/environments';
import { sign, verify, decode } from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './users/dto/user.dto';
import { Error } from 'mongoose';
import { extname } from 'path';

interface IGetAccessToken {
  id: string;
  deviceId: string;
}

interface IDecodeToken extends IGetAccessToken {
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
  try {
    const result: IDecodeToken = await decode(accessToken);
    return { ...result, expired: new Date() > new Date(result.exp * 1000) };
  } catch (error) {
    throw new HttpException('Не верный формат токена', HttpStatus.UNAUTHORIZED);
  }

};

export const removeUserPassword = (data: UserDto) => {
  const user = JSON.parse(JSON.stringify(data));
  delete user.password;
  return user;
};

export const generateFilename = (file) => {
  const ext = extname(file.originalname);
  const name = file.originalname.split(ext)[0];
  return `${name}__${Date.now()}${ext}`;
};

export const generatePath = (requestPath) => {
  return `${env.upload.path}/${requestPath}`;
};

export const splitToken = (accessToken: string) => {
  return accessToken.split(' ')[1];
};
