import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { History } from 'src/history/entities/history.entity';
@Injectable()
export class EntriesService {
  constructor( @InjectRepository(Entry) private entryRepository:Repository<Entry>,
  @InjectRepository(History) private historyRepository:Repository<History>
){
}


async getAll(){
 return await this.entryRepository.find() 
}

findOne(id:number){
  return this.entryRepository.findOne({where:{
    id:id
  }})
}
async remove(id:number){
  const entryFound = await this.entryRepository.findOne({where:{
    id:id
  }})
 return this.entryRepository.delete(entryFound)
}
}


