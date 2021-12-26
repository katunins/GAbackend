import {
  Body,
  Controller, Post, Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createPath, generateFilename, removeFilesBackground } from '../helpers';
import { env } from '../environments/environments';
import { BodyDto } from './dto/body.dto';

const sharp = require('sharp');

@Controller('storage')
export class StorageController {
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = `${env.upload.path}/${req.headers.userid}/HD`;
          createPath(`${path}`);
          cb(null, `${path}`);
        },
        filename: (req, file, callback) => {
          callback(null, generateFilename(file));
        },
      }),
      limits: {
        fileSize: 1024*1024*19,
      }
    }),
  )
  async uploadMultipleFiles(@Body() body: BodyDto, @Req() req: any, @UploadedFiles() files: Express.Multer.File[]) {
    const basePath = `${env.upload.path}/${req.headers.userid}`;
    const response = await Promise.all(files.map(async item => {
      try {
        await sharp(item.path, { failOnError: false })
          .resize({ width: 1230 })
          .rotate()
          .sharpen(1)
          .jpeg({
            quality: 60,
          })
          .toFile(`${basePath}/${item.filename}`);

        return {
          thumbnail: `${basePath}/${item.filename}`,
          hd: item.path,
        };
      } catch (err) {
        console.log(err);
      }
    }));
    setTimeout(() => {
      removeFilesBackground(body.filesToDelete);
    }, 10000);
    return response;
  }
}
