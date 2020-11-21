import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_njc_answer' , {schema: 'db_sugar' } )
@Index('id', ['id'], {unique: true})
export class TNjcAnswer extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint', 
        unsigned: true,
        name: 'id',
        })
    id: string;
        

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
        

    @Column('varchar', { 
        nullable: true,
        length: 16,
        name: 'course_code',
        })
    courseCode: string | null;

}
