import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Practice } from './entities/practice.entity';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { History } from 'src/history/entities/history.entity';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class PracticesService {
  constructor(
    @InjectRepository(Practice) private practiceRepository: Repository<Practice>,
    @InjectRepository(History) private historyRepository: Repository<History>,
    private readonly historyServices:HistoryService
  ) {}


async create(historyId: number, createPracticeDto: CreatePracticeDto)  {
    const historyFound = await this.historyServices.findOneHistory(historyId)
  
  const practice =  this.practiceRepository.create(createPracticeDto)
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
