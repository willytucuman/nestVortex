import { Module } from '@nestjs/common';
import { MedicsService } from './medics.service';
import { MedicsController } from './medics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medic } from './entities/medic.entity';
import { Consult } from 'src/consults/entities/consult.entity';
import { Practice } from 'src/practices/entities/practice.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([Medic,Consult,Practice])
  ],
  controllers: [MedicsController],
  providers: [MedicsService],
})
export class MedicsModule {}
