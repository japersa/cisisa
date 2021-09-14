import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PrbDto {
  readonly d_codigo: string;
  readonly d_asenta: string;
  readonly d_tipo_asenta: string;
  readonly d_mnpio: string;
  readonly d_estado: string;
  readonly d_ciudad: string;
  readonly d_CP: string;
  readonly c_estado: string;
  readonly c_oficina: string;
  readonly c_CP: string;
  readonly c_tipo_asenta: string;
  readonly c_mnpio: string;
  readonly id_asenta_cpcons: string;
  readonly d_zona: string;
  readonly c_cve_ciudad: string;
}
