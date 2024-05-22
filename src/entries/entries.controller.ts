import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  
  // @Post(":id")
  // create(@Body() createEntryDto: CreateEntryDto) {
  //   return this.entriesService.create(createEntryDto);
  // }

  @Get()
  findAll() {
    return this.entriesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
  //   return this.entriesService.updateEntry(+id, updateEntryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entriesService.remove(+id);
  }
}
