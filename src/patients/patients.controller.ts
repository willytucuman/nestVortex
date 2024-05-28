import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Auth } from 'src/decorators/auth.decorators';
import { Role } from 'src/role.enum';
@Controller('patients')
export class PatientsController {
  constructor(private  patientsService: PatientsService) {}

  @Auth(Role.Admin,Role.Secretario)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Auth(Role.Admin,Role.Secretario)
  @Get()
  findAll() {
    return this.patientsService.getPatients();
  }

  @Auth(Role.Admin,Role.Secretario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOnePatient(+id);
  }


  @Auth(Role.Admin,Role.Secretario)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.updatePatients(+id, updatePatientDto);
  }

  @Auth(Role.Admin,Role.Secretario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
