import { Module } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practice } from './entities/practice.entity';
import { History } from 'src/history/entities/history.entity';
import { HistoryService } from 'src/history/history.service';
import { Patient } from 'src/patients/entities/patient.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Practice,History,Patient])],
  controllers: [PracticesController],
  providers: [PracticesService,HistoryService],
})
export class PracticesModule {}
