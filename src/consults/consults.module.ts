import { Module } from '@nestjs/common';
import { ConsultsService } from './consults.service';
import { ConsultsController } from './consults.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consult } from './entities/consult.entity';
import { Entry } from 'src/entries/entities/entry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Consult,Entry])],
  controllers: [ConsultsController],
  providers: [ConsultsService],
})
export class ConsultsModule {}
