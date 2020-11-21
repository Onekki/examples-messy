import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jcw_question', { schema: 'rainbow' })
@Index('id', ['id'], { unique: true })
export class JcwQuestion extends BaseEntity {

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

  @Column('char', {
    nullable: true,
    name: 'answer',
  })
  answer: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'index',
  })
  index: string | null;

  @Column('varchar', {
    nullable: true,
    length: 16,
    name: 'second',
  })
  second: string | null;

}
