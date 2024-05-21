import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { History } from 'src/history/entities/history.entity';
@Injectable()
export class PatientsService {

  constructor(@InjectRepository(Patient) private patientRepository:Repository<Patient> ,
  @InjectRepository(History) private historyRepository:Repository<History>
){

  }
create(patient:CreatePatientDto) {
  const newPatient = this.patientRepository.create(patient)
  this.patientRepository.save(newPatient)

  const historyPatient =  new History()
  historyPatient.patient = newPatient

  this.historyRepository.save(historyPatient)
  return newPatient
}

  getPatients() {
    return this.patientRepository.find({relations:["history"]})
  }

  findOnePatient(id: number) {
    return this.patientRepository.findOne({
      where:{
        id
      }
    });
  }

  updatePatients(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientRepository.update({id},updatePatientDto)
  }

  remove(id: number) {
   return this.patientRepository.delete({id})
} }