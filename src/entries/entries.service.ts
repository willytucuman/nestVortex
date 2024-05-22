import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { History } from 'src/history/entities/history.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class EntriesService {
  constructor( @InjectRepository(Entry) private entryService:Repository<Entry>,
  @InjectRepository(History) private historyRepository:Repository<History>
){
}

getAll(){
  return this.entryService.find()
}

findOne(id:number){
  return this.entryService.findOne({where:{
    id:id
  }})
}
async remove(id:number){
  const entryFound = await this.entryService.findOne({where:{
    id:id
  }})
 return this.entryService.delete(entryFound)
}
}


