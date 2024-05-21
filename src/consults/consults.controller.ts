import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ConsultsService } from './consults.service';
import { CreateConsultDto } from './dto/create-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';

@Controller('entries/:entryId/consults')
export class ConsultsController {
  constructor(private readonly consultsService: ConsultsService) {}

  @Post()
  create(@Param('entryId') entryId: number, @Body() createConsultDto: CreateConsultDto) {
    return this.consultsService.create(entryId, createConsultDto);
  }

  @Get()
  findAll() {
    return this.consultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.consultsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateConsultDto: UpdateConsultDto) {
    return this.consultsService.update(id, updateConsultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.consultsService.remove(id);
  }
}