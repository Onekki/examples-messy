import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SysUser } from '../../sys/user/user.entity';

@Entity('jcw_user', { schema: 'rainbow' })
@Index('id', ['id'], { unique: true })
@Index('sys_user', ['sysUser'])
export class JcwUser extends BaseEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'code',
  })
  code: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'username',
  })
  username: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'password',
  })
  password: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'class',
  })
  class: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'grade',
  })
  grade: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'task',
  })
  task: string | null;

  @Column('char', {
    nullable: true,
    length: 128,
    name: 'token',
  })
  token: string | null;

  @Column('varchar', {
    nullable: true,
    length: 272,
    name: 'stoken',
  })
  stoken: string | null;

  @ManyToOne(() => SysUser, (sysUser: SysUser) => sysUser.jcwUsers, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn({ name: 'sys_user' })
  sysUser: SysUser | null;

}
