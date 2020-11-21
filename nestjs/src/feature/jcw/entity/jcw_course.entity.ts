import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jcw_course', { schema: 'rainbow' })
@Index('id', ['id'], { unique: true })
export class JcwCourse extends BaseEntity {

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
    length: 64,
    name: 'name',
  })
  name: string | null;

  @Column('int', {
    nullable: true,
    name: 'video',
  })
  video: number | null;

  @Column('varchar', {
    nullable: true,
    length: 8,
    name: 'in',
  })
  in: string | null;

  @Column('varchar', {
    nullable: true,
    length: 8,
    name: 'after',
  })
  after: string | null;

}
