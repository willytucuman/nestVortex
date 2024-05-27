import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';


@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @Post(':patientId')
  create(@Param('patientId') patientId: string, @Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(+patientId, createHistoryDto);
  }

  @Get()
  findAll() {
    try {
      return this.historyService.findAll();
      } catch (error) {
      throw new HttpException("Error messsage",HttpStatus.BAD_REQUEST)
    }
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOneHistory(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(+id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
