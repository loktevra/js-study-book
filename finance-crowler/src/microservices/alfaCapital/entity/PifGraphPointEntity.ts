import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
class PifGraphPointEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  aliasId: number;

  @Column('integer')
  date: number;

  @Column('integer')
  price: number;

  @Column('integer')
  scha: number;
}

export default PifGraphPointEntity
