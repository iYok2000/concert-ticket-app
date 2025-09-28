import { Module } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';

@Module({
  controllers: [ConcertsController],
  providers: [ConcertsService],
  exports: [ConcertsService], // Export for use in reservations module
})
export class ConcertsModule {}
