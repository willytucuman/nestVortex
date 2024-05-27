import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ConsultsService } from './consults.service';
import { CreateConsultDto } from './dto/create-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/auth/authGuard';
import { Auth } from 'src/decorators/auth.decorators';
import { Role } from 'src/role.enum';

@Auth(Role.Admin)
@Controller('consults')
export class ConsultsController {
  constructor(private readonly consultsService: ConsultsService) {}

  @Post(":historyId/:matricula")
  create(@Param('historyId') historyId: number, @Param("matricula") matricula:number,@Body() createConsultDto: CreateConsultDto) {
    return this.consultsService.create(+historyId, +matricula,createConsultDto);
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
