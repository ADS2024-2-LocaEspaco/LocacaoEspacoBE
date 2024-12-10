import {
  Controller,
  Get,
  Param,
  Body,
  NotFoundException,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import { CreateAnuncioDto } from './database/dto/create-anuncio.dto';
import { getComodidadesAnuncioDto } from './database/dto/get-comodidade-anuncio.dto';
import { getAnuncioFotosDto } from './database/dto/get-anuncio-fotos.dto';
import { extname } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadAnuncioFotosDto } from './database/dto/upload-anuncio-fotos.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Get('/get-tipo-imovel')
  async getTipoImovel(): Promise<Object> {
    return await this.anuncioService.getTipoImovel();
  }

  @Get('/get-tipo-espaco')
  async getTipoEspaco(): Promise<Object> {
    return await this.anuncioService.getTipoEspaco();
  }

  @Get('/get-comodidades')
  async getComodidades(): Promise<Object> {
    return await this.anuncioService.getComodidades(false);
  }

  @Get('/get-comodidades-especiais')
  async getComodidadesEspeciais(): Promise<Object> {
    return await this.anuncioService.getComodidades(true);
  }

  @Get('/get-seguranca')
  async getSeguranca(): Promise<Object> {
    return await this.anuncioService.getSeguranca();
  }

  @Get('/get-tipo-hospede')
  async getTipoHospede(): Promise<Object> {
    return await this.anuncioService.getTipoHospede();
  }

  @Get('/reservas')
  async getReservas(@Body('id') id: number): Promise<Object> {
    return await this.anuncioService.getReservas(id);
  }

  @Get('/:id/:user')
  async getUserFromAnuncio(
    @Param('id') id: number,
  ): Promise<getUsuarioDto | null> {
    return this.anuncioService.getUserFromAnuncio(id);
  }

  @Get('/:id')
  async getAnuncioById(@Param('id') id: string): Promise<getAnuncioDto | null> {
    return this.anuncioService.getAnuncioById(parseInt(id));
  }

  @Get('/:id')
  @Get('comodidades/:id')
  async getComodidadesByAnuncioId(
    @Param('id') id: number,
  ): Promise<getComodidadesAnuncioDto[] | null> {
    const anuncioId = Number(id);

    const comodidades = await this.anuncioService.getComodidadesByAnuncioId(id);

    if (!comodidades) {
      throw new NotFoundException('comodidade não encontrada');
    }
    return comodidades;
  }

  @Get('usuario/:id')
  async getDadosUsuarioAnfitriaoPorIdAnuncio(
    @Param('id') id: number,
  ): Promise<any> {
    const anuncioId = Number(id); // Certifique-se de que `id` é um número

    const anuncio = await this.anuncioService.getAnuncioById(id);

    if (!anuncio) {
      throw new NotFoundException('Anúncio não encontrado');
    }

    const usuario_id = anuncio.usuario_id;
    if (!usuario_id) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const usuario = await this.anuncioService.getUserFromAnuncio(usuario_id);
    return usuario;
  }

  @Post('/')
  async createAnuncio(@Body() params: CreateAnuncioDto): Promise<Object> {
    return this.anuncioService.createAnuncio(params);
  }

  @Get('fotos/:id')
  async getFotosByAnuncioId(
    @Param('id') id: number,
  ): Promise<getAnuncioFotosDto[] | null> {
    const anuncioId = Number(id);

    const fotos = await this.anuncioService.getFotosByAnuncioId(id);

    if (!fotos) {
      return null;
    }

    return fotos;
  }

  @Post('upload-fotos')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/anuncios',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new HttpException('Invalid file type', HttpStatus.BAD_REQUEST),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFotos(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() uploadDto: UploadAnuncioFotosDto,
  ) {
    if (!files || files.length === 0) {
      throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
    }

    return this.anuncioService.saveFotos(uploadDto.anuncioId, files);
  }
}
