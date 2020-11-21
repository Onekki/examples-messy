import { BaseEntity, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TSysRole } from './t_sys_role';
import { TSysPerm } from './t_sys_perm';

@Entity('t_sys_role_perm', { schema: 'db_sugar' })
@Index('id', ['id'], { unique: true })
@Index('pid', ['perm'])
@Index('rid', ['role'])
export class TSysRolePerm extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    name: 'id',
  })
  id: string;

  @ManyToOne(
    () => TSysRole,
    (tSysRole: TSysRole) => tSysRole.tSysRolePerms,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn({ name: 'role_id' })
  role: TSysRole | null;

  @ManyToOne(
    () => TSysPerm,
    (tSysPerm: TSysPerm) => tSysPerm.tSysRolePerms,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn({ name: 'perm_id' })
  perm: TSysPerm | null;
}
