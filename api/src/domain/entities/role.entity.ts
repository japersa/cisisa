import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { PermissionRole } from './permission_role.entity';
import { User } from './user.entity';

@Table({
  tableName: 'TBL_MTR_ROLE',
  timestamps: false,
})
export class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idRole: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: true })
  isActive: boolean;

  @HasMany(() => User)
  users: User[];

  @HasMany(() => PermissionRole)
  permissionsRoles: PermissionRole[];

}
