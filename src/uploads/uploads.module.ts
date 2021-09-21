import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { UploadsController } from './uploads.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}
