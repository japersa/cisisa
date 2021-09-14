import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from './crud.service';
import { InjectModel } from '@nestjs/sequelize';
import { Prb } from '../entities/prb.entity';

@Injectable()
export class PrbService extends CrudService<Prb> {
  constructor(
    @InjectModel(Prb)
    model: typeof Prb,
  ) {
    super(model);
  }
}
