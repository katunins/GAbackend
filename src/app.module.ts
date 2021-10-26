import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from "./users/users.module";

@Module({
    imports: [
        UsersModule,
        MongooseModule.forRoot(`mongodb+srv://pavel:1q2w3e4r@cluster0.vejho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        // MongooseModule.forRoot(process.env.DB_URL)
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
