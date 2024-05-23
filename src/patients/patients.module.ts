import {  Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { AuthGuard } from 'src/auth-service/authGuard';
import { History } from 'src/history/entities/history.entity';
import { HistoryService } from 'src/history/history.service';

@Module({
  imports:[TypeOrmModule.forFeature([Patient,History])],
  controllers: [PatientsController],
  providers: [PatientsService,HistoryService],
})
export class PatientsModule {
}
