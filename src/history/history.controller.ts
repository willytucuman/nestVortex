import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { Role } from 'src/role.enum';
import { Auth } from 'src/decorators/auth.decorators';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Auth(Role.Admin,Role.Secretario)
  @Post(':patientId')
  create(@Param('patientId') patientId: string, @Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(+patientId, createHistoryDto);
  }
  @Auth(Role.Admin,Role.Secretario)
  @Get()
  findAll() {
    try {
      return this.historyService.findAll();
      } catch (error) {
      throw new HttpException("Error messsage",HttpStatus.BAD_REQUEST)
    }
}
@Auth(Role.Admin,Role.Secretario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOneHistory(+id);
  }
  @Auth(Role.Admin,Role.Secretario)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(+id, updateHistoryDto);
  }
  @Auth(Role.Admin,Role.Secretario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
