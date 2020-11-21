import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TSysRolePerm } from './t_sys_role_perm';

@Entity('t_sys_perm', { schema: 'db_sugar' })
@Index('id', ['id'], { unique: true })
export class TSysPerm extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'title',
  })
  title: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'code',
  })
  code: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'name',
  })
  name: string | null;

  @OneToMany(
    () => TSysRolePerm,
    (tSysRolePerm: TSysRolePerm) => tSysRolePerm.perm,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  tSysRolePerms: TSysRolePerm[];
}
