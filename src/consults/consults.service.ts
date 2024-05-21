import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consult } from './entities/consult.entity';
import { CreateConsultDto } from './dto/create-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { Entry } from 'src/entries/entities/entry.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Medic } from 'src/medics/entities/medic.entity';
@Injectable()
export class ConsultsService {
  constructor(
    @InjectRepository(Consult) private consultRepository: Repository<Consult>,
    @InjectRepository(Entry) private entryRepository: Repository<Entry>,

  ) {}

  async create(entryId: number,createConsultDto: CreateConsultDto): Promise<Consult> {
    const entry = await this.entryRepository.findOne({where:{
      id:entryId
    }});
    if (!entry ) {
      throw new NotFoundException(`Entry with ID ${entryId} not found`);
    }
    
    const consult = this.consultRepository.create({
      ...createConsultDto,
    });
  await this.consultRepository.save(consult);
  return consult
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
