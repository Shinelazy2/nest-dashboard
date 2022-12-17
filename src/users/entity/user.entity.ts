import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // AfterRemove, AfterUpdate, CreateDateColumn, BeforeInsert
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  loginId: string;

  @Column({ unique: false, nullable: true })
  email: string;

  @Column({ nullable: true })
  hash: string;

  @Column({ nullable: true })
  hashedRt: string;

  @Column({ nullable: true })
  createAt: string;

  @Column({ nullable: true })
  updateAt: string;
}
