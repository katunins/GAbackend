import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CheckTokenMiddleware } from './middleware/check-token.middleware';
import { UsersController } from './users/users.controller';
import { RelativesModule } from './relatives/relatives.module';
import { StorageController } from './storage/storage.controller';
import { MulterModule } from '@nestjs/platform-express';
import { RelativesController } from './relatives/relatives.controller';
import { env } from './environments/environments';
import { NotesModule } from './notes/notes.module';
import { NotesController } from './notes/notes.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { User, UserSchema } from './users/schemas/user.schema';

@Module({
  imports: [
    UsersModule,
    RelativesModule,
    NotesModule,
    AuthModule,
    MulterModule.register({
      dest: './files',
    }),
    MongooseModule.forRoot(env.mongodb.uri, { useFindAndModify: false }),

  ],
  exports:[
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
  ],
  controllers: [AppController, StorageController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .forRoutes(UsersController, RelativesController, NotesController, AuthController, StorageController);
  }
}
