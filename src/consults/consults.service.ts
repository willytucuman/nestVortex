import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consult } from './entities/consult.entity';
import { CreateConsultDto } from './dto/create-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { History } from 'src/history/entities/history.entity';
import { HistoryService } from 'src/history/history.service';
import { typeEntry } from 'src/entries/entities/entry.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Medic } from 'src/medics/entities/medic.entity';
@Injectable()
export class ConsultsService {
  constructor(
    @InjectRepository(Consult) private consultRepository: Repository<Consult>,
    @InjectRepository(History) private historyRepository: Repository<History>,
     @InjectRepository(Patient) private patientRepository: Repository<Patient>,
     @InjectRepository(Medic) private medicRepository: Repository<Medic>,
     private readonly historyService: HistoryService
    
  ) {}

  async create(historyId: number,createConsultDto: CreateConsultDto) { 
    const foundHistory = await this.historyService.findOneHistory(historyId)
    const consult = this.consultRepository.create(createConsultDto)
    consult.type = typeEntry.consulta
    consult.fecha = new Date()
    foundHistory.entries.push(consult)
    await this.historyRepository.save(foundHistory)
    return this.consultRepository.save(consult)
  }

  findAll(): Promise<Consult[]> {
    return this.consultRepository.find();
  }

  findOne(id: number): Promise<Consult> {
    return this.consultRepository.findOne({where:{
      id
    }});
  }

  async update(id: number, updateConsultDto: UpdateConsultDto): Promise<void> {
    await this.consultRepository.update(id, updateConsultDto);
  }

  async remove(id: number): Promise<void> {
    await this.consultRepository.delete(id);
  }
}
