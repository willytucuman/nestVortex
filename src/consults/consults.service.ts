import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Consult } from './entities/consult.entity';
import { CreateConsultDto } from './dto/create-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { History } from 'src/history/entities/history.entity';
import { HistoryService } from 'src/history/history.service';
import { typeEntry } from 'src/entries/entities/entry.entity';
import { MedicsService } from 'src/medics/medics.service';

@Injectable()
export class ConsultsService {
  constructor(
    @InjectRepository(Consult) private consultRepository: Repository<Consult>,
    @InjectRepository(History) private historyRepository: Repository<History>,
     private readonly historyService: HistoryService,
     private readonly medicService:MedicsService
    
  ) {}

  async create(historyId: number,matriculaMedico:number,createConsultDto: CreateConsultDto) {
  const foundMedic = await this.medicService.findOneMedic(matriculaMedico)
  const foundHistory = await this.historyService.findOneHistory(historyId)
    if(!foundHistory){
    throw new HttpException("Not Found",HttpStatus.NOT_FOUND)
    }else if(!foundMedic ){
      throw new HttpException("Not Found",HttpStatus.NOT_FOUND)
    }
    const consult = this.consultRepository.create(createConsultDto)
    consult.type = typeEntry.consulta
    consult.fecha = new Date()
    consult.medic = foundMedic
    foundHistory.entries.push(consult)
    await this.historyRepository.save(foundHistory)
    return this.consultRepository.save(consult)
  }

  findAll(): Promise<Consult[]> {
    return this.consultRepository.find({relations:["medic"]});
  }

  findOne(id: number): Promise<Consult> {
    return this.consultRepository.findOne({relations:["medic"],where:{
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
