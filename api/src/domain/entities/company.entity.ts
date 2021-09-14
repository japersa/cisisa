import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'TBL_MTR_COMPANY',
  timestamps: false,
})
export class Company extends Model<Company> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idCompany: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  name: string;

}
