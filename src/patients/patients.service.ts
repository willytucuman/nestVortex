import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { History } from 'src/history/entities/history.entity';
import { HistoryService } from 'src/history/history.service';


@Injectable()
export class PatientsService {

  constructor(@InjectRepository(Patient) private patientRepository:Repository<Patient> ,
  @InjectRepository(History) private historyRepository:Repository<History>,
  private readonly historyService: HistoryService
){
  
}
        create(patient:CreatePatientDto) {
          const newPatient = this.patientRepository.create(patient)
          this.patientRepository.save(newPatient)

          const historyPatient =  new History()
          historyPatient.patient = newPatient
          console.log(historyPatient)

          this.historyRepository.save(historyPatient)
          return newPatient
        }

        getPatients() {
          return this.patientRepository.find({relations:["history"]})
          
        }

        async findOnePatient(id: number) {
        const patientFound = await this.patientRepository.findOne({
          relations:["history"],
            where:{
              id
            }
          });
          const historyFound = await this.historyService.findOneHistory(patientFound.history.id)
          let ids = []
          historyFound.entries.filter(e=>ids.push(e.id))
          patientFound["entries"] = ids
        return patientFound
        }

      updatePatients(id: number, updatePatientDto: UpdatePatientDto) {
        return this.patientRepository.update({id},updatePatientDto)
      }

      remove(id: number) {
        const queryBuilder = this.patientRepository
        .createQueryBuilder()
        .softDelete()
        .where("id = :id", {id})
        .execute()
        return "soft delete executed"
    }
}