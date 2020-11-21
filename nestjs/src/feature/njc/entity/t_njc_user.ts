import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_njc_user', { schema: 'db_sugar' })
@Index('id', ['id'], { unique: true })
export class TNjcUser extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'username',
  })
  username: string | null;

  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'password',
  })
  password: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'code',
  })
  code: string | null;

  @Column('varchar', {
    nullable: true,
    length: 128,
    name: 'token',
  })
  token: string | null;

  @Column('varchar', {
    nullable: true,
    length: 512,
    name: 'stoken',
  })
  stoken: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'grade_code',
  })
  gradeCode: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'class_code',
  })
  classCode: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'task_code',
  })
  taskCode: string | null;

  @Column('bigint', {
    nullable: true,
    unsigned: true,
    name: 'sys_user_id',
  })
  sysUserId: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'realname',
  })
  realname: string | null;
}
