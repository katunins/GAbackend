import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UsersSchema } from './schemas/users.schema';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UsersSchema}
    ])
  ]
})
export class UsersModule {
}
