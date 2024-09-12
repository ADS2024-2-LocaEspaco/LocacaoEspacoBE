import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  getProperties(): string {
    return this.propertyService.findAll();
  }

  @Get(':id')
  getProperty(@Param('id') id: string): string {
    return this.propertyService.findOne(id);
  }

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto): string {
    return this.propertyService.create(createPropertyDto);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto): string {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return this.propertyService.delete(id);
  }
}
