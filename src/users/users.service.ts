import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { env } from '../environments/environments';
import { getAccessToken, removeUserPassword } from '../helpers';
import { LoginDto } from './dto/login.dto';
import { IUserUpdateData } from './users.controller';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
  }

  async createUser(userDto: UserDto): Promise<User> {
    const checkIfExist = await this.UserModel.findOne({ email: userDto.email });
    if (checkIfExist) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.FORBIDDEN);
    }
    const hash = await bcrypt.hash(userDto.password, env.salt);
    const user = new this.UserModel({ ...userDto, password: hash });

    await user.save();
    return removeUserPassword(user);
  }

  async getUser(loginDto: LoginDto, req, res): Promise<User> {
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
    const userDeviceId = req.headers?.deviceid;
    const newToken = await getAccessToken({ id: user._id, deviceId: userDeviceId });
    return res.set('Authorization', `Bearer ${newToken}`).json(removeUserPassword(user));
  }

  async updateUser({ id, userData }: IUserUpdateData): Promise<User> {
    const user = await this.UserModel.findByIdAndUpdate(id, userData);
    return user;
  }
}
