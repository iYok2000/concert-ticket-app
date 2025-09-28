import { IsString, IsInt, Min, IsDateString } from 'class-validator';

export class CreateConcertDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  venue: string;

  @IsInt()
  @Min(1)
  totalSeats: number;
}

export class UpdateConcertDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsDateString()
  date?: string;

  @IsString()
  venue?: string;

  @IsInt()
  @Min(1)
  totalSeats?: number;
}
