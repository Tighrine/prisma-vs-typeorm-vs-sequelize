import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, ForeignKey, AllowNull } from "sequelize-typescript";
import UserAddress from './user-address.model';

@Table
export default class User extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
  
    @Column
    name: string;
    
    @Column
    email: string;
  
    @Column
    group: string;
  
    @Column
    password: string;
  
    @Column
    createdAt: Date;
  
    @Column
    updatedAt: Date;
    
    @HasMany(() => UserAddress)
    userAddresses: UserAddress[];
}