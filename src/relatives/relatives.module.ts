import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RelativesService } from './relatives.service';
import { RelativesController } from './relatives.controller';
import { Relative, RelativeSchema } from './schemas/relative.schema';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [RelativesService],
  controllers: [RelativesController],
  imports: [
    MongooseModule.forFeature([
      { name: Relative.name, schema: RelativeSchema },
    ]),
  ],
})
export class RelativesModule {
}
