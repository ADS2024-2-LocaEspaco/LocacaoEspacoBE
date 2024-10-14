import { Controller, Get, Query } from '@nestjs/common';
import { HostService } from '../../host.service';
@Controller('host')
export class HostController {
  constructor(private readonly host: HostService) {}

  @Get()
  async getHostAllocations(@Query() id: number) {
    const result = await this.host.findAllocations(id);

    return result;
  }
}
