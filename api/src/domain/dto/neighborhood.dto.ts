import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NeighborhoodDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  readonly idCity: number;
  readonly isActive: boolean;
}
