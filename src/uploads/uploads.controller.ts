// src/uploads/uploads.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { UploadImageDto } from './dto/upload-image.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', this.uploadsService.getMulterOptions()))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Nenhum arquivo foi enviado.');
    }
    // Aqui você pode salvar o caminho do arquivo no banco de dados ou qualquer outro tipo de persistência
    return {
      message: 'Arquivo enviado com sucesso!',
      filename: file.filename,
    };
  }
}
