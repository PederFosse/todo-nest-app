import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "@todo/entity/task.entity";
import { UserEntity } from "@user/entity/user.entity";

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'text', nullable: true}) description?: string;
  @CreateDateColumn() createdOn?: Date;

  @OneToMany(type => TaskEntity, task => task.todo)
  tasks?: TaskEntity[];

  @ManyToOne(type => UserEntity)
  owner?: UserEntity;

}