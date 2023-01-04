import { DataTypes } from "sequelize";
import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import User from "./user.model";

@Table
export default class UserAddress extends Model {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @Column
  address: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @Column
  zip: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @ForeignKey(() => User)
  @AllowNull
  @Column({
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
