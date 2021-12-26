import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Module, NestModule } from '@nestjs/common';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { AuthDto } from './dto/auth.dto';
import { User, UserDocument, UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../users/users.controller';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private AuthModel: Model<AuthDocument>,
  ) {}

  async passwordRestore(authDto: AuthDto): Promise<Auth> {
    const { email } = authDto;
    // const user = await usersService.userIsExist(email);
    // console.log(user);
    return { email, code: '222' };
    // const checkIfExistkIfExist = await this.UserModel.findOne({ email: userDto.email });
    // if (checkIfExist) {
    //   throw new HttpException('Пользователь с таким email уже существует', HttpStatus.FORBIDDEN);
    // }
    // const hash = await bcrypt.hash(userDto.password, env.salt);
    // const user = new this.UserModel({ ...userDto, password: hash });
    //
    // await user.save();
    // const newToken = await getAccessToken({ id: user._id, deviceId: req.headers.deviceid });
    // return res.set('Authorization', `Bearer ${newToken}`).json(removeUserPassword(user));
  }
}
