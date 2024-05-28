import { Injectable } from '@nestjs/common';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medic } from './entities/medic.entity';
@Injectable()
export class MedicsService {
  constructor(@InjectRepository(Medic) private medicRepository:Repository<Medic>
){

  }
  create(createMedicDto: CreateMedicDto) {
    const medic= this.medicRepository.create(createMedicDto)
    medic.fechaIngreso = new Date()
    return this.medicRepository.save(medic)
  }

  getMedics() {
    return this.medicRepository.find();
  }

  findOneMedic(numeroMatricula: number) {
    return this.medicRepository.findOne({
      where:{
        numeroMatricula
      }
    })
  }

  update(id: number, updateMedicDto: UpdateMedicDto) {
   return this.medicRepository.update({id},updateMedicDto) ;
  }

  async remove(id: number): Promise<void> {
   const queryBuilder = this.medicRepository
   .createQueryBuilder()
   .delete()
   .from(Medic)
   .where("id = :id", { id })
   .execute();
  
  }
}
