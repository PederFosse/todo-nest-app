import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "@todo/entity/task.entity";

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'text', nullable: true}) description?: string;
  @CreateDateColumn() createdOn?: Date;

  @OneToMany(type => TaskEntity, task => task.todo)
  tasks?: TaskEntity[];
}