import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TSysRolePerm } from './t_sys_role_perm';
import { TSysUser } from './t_sys_user';

@Entity('t_sys_role', { schema: 'db_sugar' })
@Index('id', ['id'], { unique: true })
export class TSysRole extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    nullable: true,
    name: 'name',
  })
  name: string | null;

  @OneToMany(
    () => TSysRolePerm,
    (tSysRolePerm: TSysRolePerm) => tSysRolePerm.role,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  tSysRolePerms: TSysRolePerm[];

  @OneToMany(
    () => TSysUser,
    (tSysUser: TSysUser) => tSysUser.role,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  tSysUsers: TSysUser[];
}
