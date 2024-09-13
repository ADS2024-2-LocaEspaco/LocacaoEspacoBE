import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma.service';
import { CreatePropertyDto } from '../../infrastructure/dto/create-property.dto';
import { UpdatePropertyDto } from '../../infrastructure/dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  getProperties() {
    try {
      return this.prisma.property.findMany();
    } catch (error) {
      throw new Error("Couldn't get the properties");
    }
  }

  getProperty(id: number) {
    try {
      const property = this.prisma.property.findUnique({
        where: {
          id,
        }
      });

      if(!property) {
        throw new Error("Property not found");
      }

      return property;
    } catch (error) {
      throw new Error("Couldn't get the property");
    }
  }

  create(createPropertyDto: CreatePropertyDto) {
    try {
      const { address, propertyAmenities, ...propertyData } = createPropertyDto;

      const property = this.prisma.property.create({
        data: propertyData
      });

      return property;
    } catch (error) {
      throw new Error("Couldn't create the property");
    }
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    try {
      const propertyData = updatePropertyDto;

      const property = this.prisma.property.update({
        where: {
          id,
        },
        data: propertyData
      });

      return property; 
    } catch (error) {
      throw new Error("Couldn't update the property");
    }
  }

  delete(id: number) {
    try {
      this.prisma.property.delete({
        where: {
          id,
        },
      });

      return "Property deleted";
    } catch (error) {
      throw new Error("Couldn't delete the property");
    }
  }
}
