import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Practice } from './entities/practice.entity';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { History } from 'src/history/entities/history.entity';
import { HistoryService } from 'src/history/history.service';
import { typeEntry } from 'src/entries/entities/entry.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Medic } from 'src/medics/entities/medic.entity';
import { MedicsService } from 'src/medics/medics.service';
@Injectable()
export class PracticesService {
  constructor(
    @InjectRepository(Practice) private practiceRepository: Repository<Practice>,
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Medic) private medicRepo: Repository<Medic>,
    private readonly historyServices:HistoryService,
    private readonly medicService:MedicsService
  ) {}


async create(historyId: number, matriculaMedico: number,createPracticeDto: CreatePracticeDto)  {
  const historyFound = await this.historyServices.findOneHistory(historyId)
  const foundMedic = await this.medicService.findOneMedic(matriculaMedico)
  if(!historyFound){
    throw new HttpException("Not Found",HttpStatus.NOT_FOUND)
    }else if(!foundMedic ){
      throw new HttpException("Not Found",HttpStatus.NOT_FOUND)
    }
  const practice =  this.practiceRepository.create(createPracticeDto)
  practice.fecha = new Date()
  practice.type = typeEntry.practica
  practice.medic = foundMedic
  historyFound.entries.push(practice)
  await this.historyRepository.save(historyFound)
  return await this.practiceRepository.save(practice) 
}
  

  findAll(): Promise<Practice[]> {
    return this.practiceRepository.find({relations:["medic"]});
  }

  findOne(id: number): Promise<Practice> {
    return this.practiceRepository.findOne({relations:["medic"],where:{
      id:id
    }});
  }

  async update(id: number, updatePracticeDto: UpdatePracticeDto): Promise<void> {
    await this.practiceRepository.update(id, updatePracticeDto);
  }

  async remove(id: number): Promise<void> {
    await this.practiceRepository.delete(id);
  }
}
