import { Body, Controller, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFilename, generatePath } from '../helpers';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { env } from '../environments/environments';

const fs = require('fs');


const imageFileFilter = (req, file, callback) => {
  // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   return callback(new Error('Only image files are allowed!'), false);
  // }
  callback(null, true);
};


const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('storage')
export class StorageController {
  @Post('uploads/:path')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = generatePath(req.params.path);
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
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
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[], @Param() params) {
    const response = files.map(item => { return { originalname: item.originalname, path: item.path }});
    return response;
  }

}
