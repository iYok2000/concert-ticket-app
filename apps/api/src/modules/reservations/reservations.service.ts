import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Reservation } from '../../common/interfaces';
import { CreateReservationDto } from '../../common/dto';
import { ConcertsService } from '../concerts/concerts.service';
import { UsersService } from '../users/users.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [];

  constructor(
    private readonly concertsService: ConcertsService,
    private readonly usersService: UsersService,
  ) {}

  findAll(): Reservation[] {
    return this.reservations.map(reservation => ({
      ...reservation,
      user: this.usersService.findById(reservation.userId),
      concert: this.concertsService.findById(reservation.concertId),
    }));
  }

  findByUserId(userId: string): Reservation[] {
    return this.reservations
      .filter(r => r.userId === userId && r.status === 'confirmed')
      .map(reservation => ({
        ...reservation,
        user: this.usersService.findById(reservation.userId),
        concert: this.concertsService.findById(reservation.concertId),
      }));
  }

  findById(id: string): Reservation {
    const reservation = this.reservations.find(r => r.id === id);
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return {
      ...reservation,
      user: this.usersService.findById(reservation.userId),
      concert: this.concertsService.findById(reservation.concertId),
    };
  }

  create(createReservationDto: CreateReservationDto): Reservation {
    const { userId, concertId } = createReservationDto;

    this.usersService.findById(userId);

    const concert = this.concertsService.findById(concertId);
    if (concert.availableSeats === 0) {
      throw new BadRequestException('Concert is sold out');
    }

    const existingReservation = this.reservations.find(
      r => r.userId === userId && r.concertId === concertId && r.status === 'confirmed'
    );
    
    if (existingReservation) {
      throw new BadRequestException('User already has a reservation for this concert');
    }

    const newReservation: Reservation = {
      id: uuidv4(),
      userId,
      concertId,
      status: 'confirmed',
      createdAt: new Date(),
    };

    this.concertsService.reserveSeats(concertId, 1);
    this.reservations.push(newReservation);

    return {
      ...newReservation,
      user: this.usersService.findById(userId),
      concert: this.concertsService.findById(concertId),
    };
  }

  cancel(id: string): Reservation {
    const reservation = this.reservations.find(r => r.id === id);
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    if (reservation.status === 'cancelled') {
      throw new BadRequestException('Reservation is already cancelled');
    }

    reservation.status = 'cancelled';

    this.concertsService.cancelReservation(reservation.concertId, 1);

    return {
      ...reservation,
      user: this.usersService.findById(reservation.userId),
      concert: this.concertsService.findById(reservation.concertId),
    };
  }
}
