import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_njc_study' , {schema: 'db_sugar' } )
@Index('id', ['id'], {unique: true})
export class TNjcStudy extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true,
        name: 'id',
        })
    id: string;


    @Column('varchar', {
        nullable: true,
        length: 16,
        name: 'user_code',
        })
    userCode: string | null;


    @Column('varchar', {
        nullable: true,
        length: 16,
        name: 'course_code',
        })
    courseCode: string | null;


    @Column('varchar', {
        nullable: true,
        length: 63,
        name: 'courseware',
        })
    courseware: string | null;


    video: number;
    in: string;
    after: string;
    finished: boolean;
}
