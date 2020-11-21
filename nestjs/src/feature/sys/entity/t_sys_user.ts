import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TSysRole } from './t_sys_role';

@Entity('t_sys_user', { schema: 'db_sugar' })
@Index('id', ['id'], { unique: true })
@Index('rid', ['role'])
export class TSysUser extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    nullable: true,
    name: 'username',
  })
  username: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'nickname',
  })
  nickname: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'password',
  })
  password: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'avatar_url',
  })
  avatarUrl: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'phone',
  })
  phone: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'email',
  })
  email: string | null;

  @Column('datetime', {
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'regtime',
  })
  regtime: Date | null;

  @ManyToOne(
    () => TSysRole,
    (tSysRole: TSysRole) => tSysRole.tSysUsers,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn({ name: 'role_id' })
  role: TSysRole | null;
}
