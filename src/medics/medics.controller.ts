import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicsService } from './medics.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { Public } from 'src/decorators/isPublic';
@Controller('medics')
export class MedicsController {
  constructor(private  medicsService: MedicsService) {}
  @Public()
  @Post()
  create(@Body() createMedicDto: CreateMedicDto) {
    return this.medicsService.create(createMedicDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.medicsService.getMedics();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicsService.findOneMedic(+id);
  }
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicDto: UpdateMedicDto) {
    return this.medicsService.update(+id, updateMedicDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicsService.remove(+id);
  }
}
