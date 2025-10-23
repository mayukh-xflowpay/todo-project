// Create Todo entity with TypeORM decorators: id (PrimaryGeneratedColumn), title (Column), description (Column, nullable), completed (Column, default false), createdAt (CreateDateColumn), updatedAt (UpdateDateColumn)
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;
  
  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}