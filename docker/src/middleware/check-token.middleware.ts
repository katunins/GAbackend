import { HttpException, HttpStatus, Injectable, NestMiddleware, Query, Req, Res, Response } from '@nestjs/common';
import { decodeToken, getAccessToken, splitToken } from '../helpers';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {

  async use(@Req() req, @Res() res, next: () => void) {
    const userId = req.headers?.userid;
    const userDeviceId = req.headers?.deviceid;
    const bearer = req.headers?.authorization;
    const route = req.route;

    const needToCheck = !(route.path === '/users/' && (route.methods?.get || route.methods?.post)) && !(route.path === '/auth/' && route.methods?.post);

    if (needToCheck) {
      if (!bearer) {
        throw new HttpException('Не верный формат токена', HttpStatus.UNAUTHORIZED);
      }
      const accessTokenArr = bearer.split(' ');
      if (accessTokenArr.length !== 2) {
        throw new HttpException('Не верный формат токена', HttpStatus.UNAUTHORIZED);
      }
      const { id, deviceId, expired } = await decodeToken(accessTokenArr[1]);
      if (id !== userId) {
        throw new HttpException('Не верный токен ', HttpStatus.UNAUTHORIZED);
      }
      if (expired || deviceId !== userDeviceId) {
        throw new HttpException('Истекло время токена. Авторизуйтесь заново', HttpStatus.UNAUTHORIZED);
      }
      if (deviceId !== userDeviceId) {
        throw new HttpException('Приложение открыто на другом устройстве. Повторите попытку позже', HttpStatus.UNAUTHORIZED);
      }
      const newToken = await getAccessToken({ id: userId, deviceId: userDeviceId });
      res.set('Authorization', `Bearer ${newToken}`);
    }
    next();
  }
}
