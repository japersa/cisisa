import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { City } from './city.entity';

@Table({
  tableName: 'TBL_MTR_NEIGHBORHOOD',
  timestamps: false,
})
export class Neighborhood extends Model<Neighborhood> {
  @PrimaryKey
  @AutoIncrement
  @Column({ primaryKey: true, autoIncrement: true })
  idNeighborhood: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ForeignKey(() => City)
  @Column({ field: 'idCity' })
  idCity: number;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: true })
  isActive: boolean;

  @BelongsTo(() => City, 'idCity') city: City;
}
