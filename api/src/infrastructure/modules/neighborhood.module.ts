import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { LoggerMiddleware } from '../../app/middlewares/logger.middleware';
import { NeighborhoodController } from '../../app/controllers/neighborhood.controller';
import { NeighborhoodService } from '../../domain/services/neighborhood.service';
import { NeighborhoodProvider } from '../providers/neighborhood.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NeighborhoodController],
  providers: [NeighborhoodService, ...NeighborhoodProvider],
  exports: [...NeighborhoodProvider],
})
export class NeighborhoodModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('neighborhoods');
  }
}
