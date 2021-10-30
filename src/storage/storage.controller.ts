import { Body, Controller, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFilename, createPath } from '../helpers';
import { env } from '../environments/environments';

const imageFileFilter = (req, file, callback) => {
  // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   return callback(new Error('Only image files are allowed!'), false);
  // }
  callback(null, true);
};

@Controller('storage')
export class StorageController {
  @Post('uploads/:path')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = createPath(`${env.upload.path}/${req.headers.userid}/${req.params.path}`);
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
    const response = files.map(item => {
      return { originalname: item.originalname, path: item.path };
    });
    return response;
  }

}
