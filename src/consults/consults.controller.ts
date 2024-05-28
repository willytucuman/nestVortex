import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ConsultsService } from './consults.service';
import { CreateConsultDto } from './dto/create-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { Auth } from 'src/decorators/auth.decorators';
import { Role } from 'src/role.enum';

@Controller('consults')
export class ConsultsController {
  constructor(private readonly consultsService: ConsultsService) {}
  
  @Auth(Role.Admin,Role.Secretario)
  @Post(":historyId/:matricula")
  create(@Param('historyId') historyId: number, @Param("matricula") matricula:number,@Body() createConsultDto: CreateConsultDto) {
    return this.consultsService.create(+historyId, +matricula,createConsultDto);
  }

  @Auth(Role.Admin,Role.Secretario)
  @Get()
  findAll() {
    return this.consultsService.findAll();
  }

  @Auth(Role.Admin,Role.Secretario)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.consultsService.findOne(id);
  }

  @Auth(Role.Admin,Role.Secretario)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateConsultDto: UpdateConsultDto) {
    return this.consultsService.update(id, updateConsultDto);
  }
  
  @Auth(Role.Admin,Role.Secretario)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.consultsService.remove(id);
  }
}
