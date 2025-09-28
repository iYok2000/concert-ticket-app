import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ConcertsModule } from '../concerts/concerts.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConcertsModule, UsersModule], // Import required modules
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
