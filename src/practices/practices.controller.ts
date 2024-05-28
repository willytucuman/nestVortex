import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { Role } from 'src/role.enum';
import { Auth } from 'src/decorators/auth.decorators';

@Controller('practices')
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}

  @Auth(Role.Admin,Role.Secretario)
  @Post(":historyId/:matriculaId")
  create(@Param('historyId') historyId: number, @Param("matriculaId") matriculaId:number , @Body() createPracticeDto: CreatePracticeDto) {
    return this.practicesService.create(+historyId,+matriculaId, createPracticeDto);
  }

  @Auth(Role.Admin,Role.Secretario)
  @Get()
  findAll() {
    return this.practicesService.findAll();
  }

  @Auth(Role.Admin,Role.Secretario)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.practicesService.findOne(id);
  }

  @Auth(Role.Admin,Role.Secretario)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePracticeDto: UpdatePracticeDto) {
    return this.practicesService.update(id, updatePracticeDto);
  }

  @Auth(Role.Admin,Role.Secretario)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.practicesService.remove(id);
  }
}
