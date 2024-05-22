import {  Injectable, Module } from '@nestjs/common';
import { ConsultsService } from './consults.service';
import { ConsultsController } from './consults.controller';
import {  TypeOrmModule } from '@nestjs/typeorm';
import { Consult } from './entities/consult.entity';
import { HistoryService } from 'src/history/history.service';
import { History } from 'src/history/entities/history.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Medic } from 'src/medics/entities/medic.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Consult,History,Patient,Medic])],
  controllers: [ConsultsController],
  providers: [ConsultsService,HistoryService],
})
export class ConsultsModule {
}
