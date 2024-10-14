import { Controller, Get, Query } from '@nestjs/common';
import { HostService } from '../../host.service';
import { HostQueryDto } from '../../database/dto/host.id.dto';
@Controller('host')
export class HostController {
  constructor(private readonly host: HostService) {}

  @Get()
  async getHostAllocations(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.findAllocations(id);

    return result;
  }

  @Get('obrigatorios')
  async getObrigatorios(@Query() query: HostQueryDto){
    const { id } = query;
    
    const result = await this.host.getAttrNaoObrigatorios(id);

    return result;
  }

  @Get('qtd')
  async getQtds(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.getQtdSuportada(id);

    return result;
  }

  @Get('permissoes')
  async getPermissoes(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.getPermissoes(id);

    return result;
  }

  @Get('checks')
  async getCheckInOut(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.getCheckInOut(id);

    return result;
  }

  @Get('valores')
  async getValores(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.getValores(id);

    return result;
  }
}
