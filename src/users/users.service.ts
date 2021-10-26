import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import {User, UserDocument} from "./schemas/users.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
  }

  async getAll(): Promise<User[]> {
    return this.UserModel.find().exec()
  }

  async getById(id: string): Promise<User> {
    return this.UserModel.findById(id)
  }

  async create(UserDto: CreateUsersDto): Promise<User> {
    const newUser = new this.UserModel(UserDto)
    return newUser.save()
  }

  async remove(id: string): Promise<User> {
    return this.UserModel.findByIdAndRemove(id)
  }

  async update(id: string, UserDto: UpdateUsersDto): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, UserDto, {new: true})
  }
}
