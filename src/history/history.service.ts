import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { Medic } from 'src/medics/entities/medic.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(patientId: number, createHistoryDto: CreateHistoryDto): Promise<History> {
    const patient = await this.patientRepository.findOne({ where: { id: patientId } });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const history = this.historyRepository.create({
      ...createHistoryDto,
      patient,
      entries:[]
    });

    return this.historyRepository.save(history);
  }

  findAll(): Promise<History[]> {
    return this.historyRepository.find({ relations: ['patient','entries'] });
  }

  findOneHistory(id: number): Promise<History> {
    return this.historyRepository.findOne({ where: { id }, relations: ['patient','entries'] });
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto): Promise<History> {
    await this.historyRepository.update(id, updateHistoryDto);
    return this.historyRepository.findOne({ where: { id }, relations: ['patient'] });
  }

  async remove(id: number): Promise<void> {
    await this.historyRepository.delete(id);
  }
}
