import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CheckTokenMiddleware } from './middleware/check-token.middleware';
import { UsersController } from './users/users.controller';
import { RelativesController } from './relatives/relatives.controller';
import { RelativesModule } from './relatives/relatives.module';
import { StorageController } from './storage/storage.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule,
    RelativesModule,
    MulterModule.register({
      dest: './files',
    }),
    MongooseModule.forRoot('mongodb://user:wellcome@nestjs.ikatunin.ru:27017/grandAlbum', { useFindAndModify: false }),
    // RelativesModule,
    // MongooseModule.forRoot(`mongodb+srv://pavel:1q2w3e4r@cluster0.vejho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    // MongooseModule.forRoot(process.env.DB_URL)

  ],
  controllers: [AppController, StorageController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .forRoutes(UsersController, RelativesController);
  }
}
