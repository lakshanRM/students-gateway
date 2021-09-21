import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { editFileName, fileFilter } from './file-upload.utils';

@Controller('uploads')
export class UploadsController {
  @Post('uploadFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: fileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file) {
    const response = {
      status: 'success',
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }
}
