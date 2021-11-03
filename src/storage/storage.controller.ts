import {
  Body,
  Controller,
  Delete,
  Param, Post,
  Query, Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFilename, removeFilesBackground } from '../helpers';
import { existsSync, mkdirSync, unlinkSync, unlink, access, stat, rename, constants } from 'fs';
import { env } from '../environments/environments';
import { BodyDto } from './dto/body.dto';
import * as path from 'path';

const imageFileFilter = (req, file, callback) => {
  // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   return callback(new Error('Only image files are allowed!'), false);
  // }
  callback(null, true);
};

@Controller('storage')
export class StorageController {
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = `${env.upload.path}/${req.headers.userid}`;
          if (!existsSync(path)) {
            mkdirSync(path);
          }
          cb(null, path);
        },
        filename: (req, file, callback) => {
          callback(null, generateFilename(file));
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@Body() body: BodyDto, @UploadedFiles() files: Express.Multer.File[]) {
    setTimeout(() => removeFilesBackground(body.filesToDelete), 10000);
    const response = files.map(item => {
      return { originalname: item.originalname, path: item.path };
    });
    return response;
  }
}
