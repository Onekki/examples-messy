import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jcw_record', { schema: 'rainbow' })
@Index('id', ['id'], { unique: true })
export class JcwRecord extends BaseEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    name: 'id',
  })
  id: string;

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

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'course_code',
  })
  courseCode: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'user_code',
  })
  userCode: string | null;

}
