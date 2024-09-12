import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  findAll(): string {
    return 'This action returns all properties';
  }

  findOne(id: string): string {
    return `This action returns a #${id} property`;
  }

  create(createPropertyDto: CreatePropertyDto): string {
    return 'This action creates a new property';
  }

  update(id: string, updatePropertyDto: UpdatePropertyDto): string {
    return `This action updates a #${id} property`;
  }

  delete(id: string): string {
    return `This action removes a #${id} property`;
  }
}
