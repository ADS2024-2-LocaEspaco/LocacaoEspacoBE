import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PropertyService } from '../domain/services/property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  getProperties() {
    return this.propertyService.getProperties();
  }

  @Get(':id')
  getProperty(@Param('id') id: string) {
    return this.propertyService.getProperty(parseInt(id));
  }

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(parseInt(id), updatePropertyDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.propertyService.delete(parseInt(id));
  }
}
