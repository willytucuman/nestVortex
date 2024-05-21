import { Module } from '@nestjs/common';
import { MedicsService } from './medics.service';
import { MedicsController } from './medics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medic } from './entities/medic.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Medic])
  ],
  controllers: [MedicsController],
  providers: [MedicsService],
})
export class MedicsModule {}
