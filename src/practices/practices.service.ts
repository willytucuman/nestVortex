import { Injectable, NotFoundException } from '@nestjs/common';
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
@Injectable()
export class PracticesService {
  constructor(
    @InjectRepository(Practice) private practiceRepository: Repository<Practice>,
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Medic) private medicRepo: Repository<Medic>,
    private readonly historyServices:HistoryService
  ) {}


async create(historyId: number, createPracticeDto: CreatePracticeDto)  {
  const historyFound = await this.historyServices.findOneHistory(historyId)
  const practice =  this.practiceRepository.create(createPracticeDto)
  practice.fecha = new Date()
  practice.type = typeEntry.practica
  historyFound.entries.push(practice)
  await this.historyRepository.save(historyFound)
  return this.practiceRepository.save(practice) 
  }
  

  findAll(): Promise<Practice[]> {
    return this.practiceRepository.find();
  }

  findOne(id: number): Promise<Practice> {
    return this.practiceRepository.findOne({where:{
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
