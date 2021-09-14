import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Role } from './role.entity';

@Table({
  tableName: 'TBL_MTR_USER',
  timestamps: false,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idUser: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  firstName: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  secondName: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  lastName: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  secondLastName: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  documentNumber: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  email: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  phone: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  password: string;

  @ForeignKey(() => Role)
  @Column({ field: 'idRole' })
  idRole: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  userName: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.TEXT, allowNull: true })
  remember_token: string;

  @BelongsTo(() => Role, 'idRole') role: Role;
}
