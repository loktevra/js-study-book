import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  alias: string;

  @Column({ type: 'text', nullable: true })
  currency: string;

  @Column({ type: 'integer', nullable: true })
  maxamount: number;

  @Column({ type: 'integer', nullable: true })
  minamount: number;

  @Column({ type: 'text', nullable: true })
  profit: string;

  @Column({ type: 'text', nullable: true })
  'profit.ate_beg': string;

  @Column({ type: 'text', nullable: true })
  'profit.date_end': string;

  @Column({ type: 'integer', nullable: true })
  profitLevel: number;

  @Column({ type: 'integer', nullable: true })
  risklevel: number;

  @Column({ type: 'text', nullable: true })
  subtitle: string;

  @Column('text')
  title: string;

  @Column({ type: 'text', nullable: true })
  type: string;

  @Column({ type: 'text', nullable: true })
  url: string;
}

export default ProductsEntity
