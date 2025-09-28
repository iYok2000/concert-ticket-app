import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto, UpdateConcertDto } from '../../common/dto';
import { ApiResponse, Concert } from '../../common/interfaces';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Get()
  findAll(): ApiResponse<Concert[]> {
    const concerts = this.concertsService.findAll();
    return {
      success: true,
      data: concerts,
      message: 'Concerts retrieved successfully',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<Concert> {
    const concert = this.concertsService.findById(id);
    return {
      success: true,
      data: concert,
      message: 'Concert retrieved successfully',
    };
  }

  @Post()
  create(@Body() createConcertDto: CreateConcertDto): ApiResponse<Concert> {
    const concert = this.concertsService.create(createConcertDto);
    return {
      success: true,
      data: concert,
      message: 'Concert created successfully',
    };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateConcertDto: UpdateConcertDto,
  ): ApiResponse<Concert> {
    const concert = this.concertsService.update(id, updateConcertDto);
    return {
      success: true,
      data: concert,
      message: 'Concert updated successfully',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse {
    this.concertsService.remove(id);
    return {
      success: true,
      message: 'Concert deleted successfully',
    };
  }
}
