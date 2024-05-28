import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Role } from 'src/role.enum';
import { Auth } from 'src/decorators/auth.decorators';
@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  
  // @Post(":id")
  // create(@Body() createEntryDto: CreateEntryDto) {
  //   return this.entriesService.create(createEntryDto);
  // }
  @Auth(Role.Admin,Role.Secretario)
  @Get()
  findAll() {
    return this.entriesService.getAll();
  }
  @Auth(Role.Admin,Role.Secretario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
  //   return this.entriesService.updateEntry(+id, updateEntryDto);
  // }
  @Auth(Role.Admin,Role.Secretario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entriesService.remove(+id);
  }
}
