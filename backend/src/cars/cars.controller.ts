import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.carsService.getById(id);
  }
}
