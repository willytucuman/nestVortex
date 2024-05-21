import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { History } from 'src/history/entities/history.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Entry,History])],
  controllers: [EntriesController],
  providers: [EntriesService]
})
export class EntriesModule {}
