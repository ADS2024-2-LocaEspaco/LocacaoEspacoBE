// src/uploads/uploads.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  getMulterOptions() {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtension = path.extname(file.originalname);
          const filename = `${uuidv4()}${fileExtension}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Tipo de arquivo não permitido'), false);
        }
      },
    };
  }
}
