import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;
}
