import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';

@Controller('practices')
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}

  @Post(":historyId/:matriculaId")
  create(@Param('historyId') historyId: number, @Param("matriculaId") matriculaId:number , @Body() createPracticeDto: CreatePracticeDto) {
    return this.practicesService.create(+historyId,+matriculaId, createPracticeDto);
  }

  @Get()
  findAll() {
    return this.practicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.practicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePracticeDto: UpdatePracticeDto) {
    return this.practicesService.update(id, updatePracticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.practicesService.remove(id);
  }
}
