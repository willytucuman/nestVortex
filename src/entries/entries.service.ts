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

}


