import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { LoggerMiddleware } from '../../app/middlewares/logger.middleware';
import { PrbController } from '../../app/controllers/prb.controller';
import { PrbService } from '../../domain/services/prb.service';
import { PrbProvider } from '../providers/prb.provider';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [DatabaseModule, MulterModule.register({
    storage: diskStorage({
      destination: 'uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  })],
  controllers: [PrbController],
  providers: [PrbService, ...PrbProvider],
  exports: [...PrbProvider],
})
export class PrbModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('prbs');
  }
}
