import { Headers, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { env } from '../environments/environments';
import { decodeToken, getAccessToken } from '../helpers';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
  }

  async createUser(userDto: UserDto, headers): Promise<User> {

    if (!headers?.deviceid) {
      throw new HttpException('Неверный ID устройства', HttpStatus.FORBIDDEN);
    }

    const checkIfExist = await this.UserModel.findOne({ email: userDto.email });
    if (checkIfExist) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.FORBIDDEN);
    }
    const hash = await bcrypt.hash(userDto.password, env.salt);
    const user = new this.UserModel({ ...userDto, password: hash });

    user.accessToken = await getAccessToken({ id: user._id, deviceId: headers?.deviceid });
    return await user.save();
  }

  async getUser(loginDto: LoginDto, headers) {

    if (!headers?.deviceid) {
      throw new HttpException('Неверный ID устройства', HttpStatus.FORBIDDEN);
    }

    if (!loginDto.email || !loginDto.password) {
      throw new HttpException('Проверьте введенные данные', HttpStatus.FORBIDDEN);
    }
    const user = await this.UserModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new HttpException('Пользователь с таким email не существует', HttpStatus.FORBIDDEN);
    }
    const passwordCheck = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordCheck) {
      throw new HttpException('Не верный пароль', HttpStatus.FORBIDDEN);
    }
    const { id, deviceId, expired } = await decodeToken(user.accessToken);
    if (!expired && deviceId !== headers?.deviceid) {
      throw new HttpException('Приложение авторизовано на другом устройстве', HttpStatus.UNAUTHORIZED);
    }
    const accessToken = await getAccessToken({ id: user._id, deviceId: headers?.deviceid });
    const result = await this.UserModel.findByIdAndUpdate(user._id, { accessToken });
    return result;
  }
}
