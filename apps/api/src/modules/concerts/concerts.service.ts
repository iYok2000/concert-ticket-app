import { Injectable, NotFoundException } from '@nestjs/common';
import { Concert } from '../../common/interfaces';
import { CreateConcertDto, UpdateConcertDto } from '../../common/dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConcertsService {
  private concerts: Concert[] = [
    {
      id: '1',
      name: 'Rock Concert 2025',
      description: 'The biggest rock concert of the year',
      date: new Date('2024-12-15T19:00:00.000Z'),
      venue: 'Bangkok Arena',
      totalSeats: 1000,
      reservedSeats: 0,
      availableSeats: 1000,
      soldOut: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Jazz Night',
      description: 'An elegant evening of smooth jazz',
      date: new Date('2024-12-20T20:00:00.000Z'),
      venue: 'Jazz Club Bangkok',
      totalSeats: 200,
      reservedSeats: 0,
      availableSeats: 200,
      soldOut: false,
      createdAt: new Date(),
    },
  ];

  findAll(): Concert[] {
    return this.concerts.map(concert => ({
      ...concert,
      availableSeats: concert.totalSeats - concert.reservedSeats,
      soldOut: concert.totalSeats - concert.reservedSeats === 0,
    }));
  }

  findById(id: string): Concert {
    const concert = this.concerts.find(c => c.id === id);
    if (!concert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return {
      ...concert,
      availableSeats: concert.totalSeats - concert.reservedSeats,
      soldOut: concert.totalSeats - concert.reservedSeats === 0,
    };
  }

  create(createConcertDto: CreateConcertDto): Concert {
    const newConcert: Concert = {
      id: uuidv4(),
      name: createConcertDto.name,
      description: createConcertDto.description,
      date: new Date(createConcertDto.date),
      venue: createConcertDto.venue,
      totalSeats: createConcertDto.totalSeats,
      reservedSeats: 0,
      availableSeats: createConcertDto.totalSeats,
      soldOut: false,
      createdAt: new Date(),
    };

    this.concerts.push(newConcert);
    return newConcert;
  }

  update(id: string, updateConcertDto: UpdateConcertDto): Concert {
    const concertIndex = this.concerts.findIndex(c => c.id === id);
    if (concertIndex === -1) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }

    const updatedData = { ...updateConcertDto };
    if (updatedData.date) {
      (updatedData as any).date = new Date(updatedData.date);
    }

    this.concerts[concertIndex] = {
      ...this.concerts[concertIndex],
      ...updatedData as any,
    };

    return {
      ...this.concerts[concertIndex],
      availableSeats: this.concerts[concertIndex].totalSeats - this.concerts[concertIndex].reservedSeats,
      soldOut: this.concerts[concertIndex].totalSeats - this.concerts[concertIndex].reservedSeats === 0,
    };
  }

  remove(id: string): void {
    const concertIndex = this.concerts.findIndex(c => c.id === id);
    if (concertIndex === -1) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    this.concerts.splice(concertIndex, 1);
  }

  reserveSeats(concertId: string, seats: number = 1): Concert {
    const concert = this.findById(concertId);
    
    if (concert.availableSeats < seats) {
      throw new Error('Not enough available seats');
    }

    const concertIndex = this.concerts.findIndex(c => c.id === concertId);
    this.concerts[concertIndex].reservedSeats += seats;
    
    return this.findById(concertId);
  }

  cancelReservation(concertId: string, seats: number = 1): Concert {
    const concertIndex = this.concerts.findIndex(c => c.id === concertId);
    if (concertIndex !== -1) {
      this.concerts[concertIndex].reservedSeats = Math.max(0, this.concerts[concertIndex].reservedSeats - seats);
    }
    return this.findById(concertId);
  }
}
