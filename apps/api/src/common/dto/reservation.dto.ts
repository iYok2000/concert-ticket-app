import { IsString, IsUUID } from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  concertId: string;
}
