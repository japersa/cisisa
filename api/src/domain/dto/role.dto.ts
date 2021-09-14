import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  readonly description: string;
  readonly isActive: boolean;
  multiselectRef: Array<any>;
}
