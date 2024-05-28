import {
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  createImage(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return Promise.all(
      files.map((file) => this.imagesService.createImage(file)),
    );
  }

  @Get('/:id')
  async getImage(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    const buffer = await this.imagesService.getImage(res, id);

    return new StreamableFile(buffer);
  }
}
