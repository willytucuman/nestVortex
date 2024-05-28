import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicsService } from './medics.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { Public } from 'src/decorators/isPublics';
import { Auth } from 'src/decorators/auth.decorators';
import { Role } from 'src/role.enum';

@Controller('medics')
export class MedicsController {
  constructor(private  medicsService: MedicsService) {}
  @Auth(Role.Admin)
  @Post()
  create(@Body() createMedicDto: CreateMedicDto) {
    return this.medicsService.create(createMedicDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.medicsService.getMedics();
  }
  
  @Auth(Role.Admin,Role.Secretario)
  @Get(':numeroMatricula')
  findOne(@Param('numeroMatricula') numeroMatricula: string) {
    return this.medicsService.findOneMedic(+numeroMatricula);
  }

  @Auth(Role.Admin,Role.Secretario)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicDto: UpdateMedicDto) {
    return this.medicsService.update(+id, updateMedicDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  async deleteMedico(@Param('id') id: number): Promise<void> {
    this.medicsService.remove(id)
  }
}
