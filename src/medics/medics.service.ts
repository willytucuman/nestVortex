import { Injectable } from '@nestjs/common';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medic } from './entities/medic.entity';

@Injectable()
export class MedicsService {
  constructor(@InjectRepository(Medic) private medicService:Repository<Medic>){

  }
  create(createMedicDto: CreateMedicDto) {
    const medic= this.medicService.create(createMedicDto)
    return this.medicService.save(medic)
  }

  getMedics() {
    return this.medicService.find();
  }

  findOneMedic(id: number) {
    return this.medicService.findOne({
      where:{
        id
      }
    })
  }

  update(id: number, updateMedicDto: UpdateMedicDto) {
   return this.medicService.update({id},updateMedicDto) ;
  }

  remove(id: number) {
   return this.medicService.delete({id})
  }
}
