import { Controller, Get, Post, Param, Delete, Body, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from '../../common/dto';
import { ApiResponse, Reservation } from '../../common/interfaces';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('all')
  findAll(): ApiResponse<Reservation[]> {
    const reservations = this.reservationsService.findAll();
    return {
      success: true,
      data: reservations,
      message: 'All reservations retrieved successfully',
    };
  }

  @Get('me')
  findMyReservations(@Query('userId') userId: string): ApiResponse<Reservation[]> {
    if (!userId) {
      throw new Error('userId query parameter is required');
    }
    const reservations = this.reservationsService.findByUserId(userId);
    return {
      success: true,
      data: reservations,
      message: 'User reservations retrieved successfully',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<Reservation> {
    const reservation = this.reservationsService.findById(id);
    return {
      success: true,
      data: reservation,
      message: 'Reservation retrieved successfully',
    };
  }

  @Post(':concertId')
  create(
    @Param('concertId') concertId: string,
    @Body() body: { userId: string },
  ): ApiResponse<Reservation> {
    const createReservationDto: CreateReservationDto = {
      userId: body.userId,
      concertId,
    };
    
    const reservation = this.reservationsService.create(createReservationDto);
    return {
      success: true,
      data: reservation,
      message: 'Reservation created successfully',
    };
  }

  @Delete(':id')
  cancel(@Param('id') id: string): ApiResponse<Reservation> {
    const reservation = this.reservationsService.cancel(id);
    return {
      success: true,
      data: reservation,
      message: 'Reservation cancelled successfully',
    };
  }
}
