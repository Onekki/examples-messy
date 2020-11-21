import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JcwUser } from '../../jcw/entity/jcw_user.entity';

@Entity('sys_user', { schema: 'rainbow' })
@Index('id', ['id'], { unique: true })
export class SysUser extends BaseEntity {

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
    length: 16,
    name: 'phone',
  })
  phone: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'email',
  })
  email: string | null;

  @Column('char', {
    nullable: true,
    length: 16,
    name: 'password',
  })
  password: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'nickname',
  })
  nickname: string | null;

  @Column('char', {
    nullable: true,
    length: 16,
    name: 'avatar',
  })
  avatar: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'city',
  })
  city: string | null;

  @Column('datetime', {
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'regtime',
  })
  regtime: Date | null;

  @OneToMany(() => JcwUser, (jcwUser: JcwUser) => jcwUser.sysUser, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  jcwUsers: JcwUser[];

}
