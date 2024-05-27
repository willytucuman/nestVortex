import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicsService } from './medics.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { HttpException,HttpStatus } from '@nestjs/common';
import { Medic } from './entities/medic.entity';
@Controller('medics')
export class MedicsController {
  constructor(private  medicsService: MedicsService) {}
  
  @Post()
  create(@Body() createMedicDto: CreateMedicDto) {
    return this.medicsService.create(createMedicDto);
  }
  
  @Get()
  findAll() {
    return this.medicsService.getMedics();
  }
  
  
  @Get(':numeroMatricula')
  findOne(@Param('numeroMatricula') numeroMatricula: string) {
    return this.medicsService.findOneMedic(+numeroMatricula);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicDto: UpdateMedicDto) {
    return this.medicsService.update(+id, updateMedicDto);
  }
  @Delete(':id')
  async deleteMedico(@Param('id') id: number): Promise<void> {
    this.medicsService.remove(id)
  }
}
