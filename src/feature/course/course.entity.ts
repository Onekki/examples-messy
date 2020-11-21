import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


@Entity("t_course" ,{schema:"db_njcedu" } )
@Index("id",["id",],{unique:true})
export class TCourse extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"bigint",
        unsigned: true,
        name:"id"
    })
    id:string;


    @Column("varchar",{
        nullable:true,
        length:16,
        name:"code"
    })
    code:string | null;


    @Column("varchar",{
        nullable:true,
        length:64,
        name:"name"
    })
    name:string | null;


    @Column("char",{
        nullable:true,
        length:59,
        name:"courseware"
    })
    courseware:string | null;


    @Column("char",{
        nullable:true,
        length:34,
        name:"vid"
    })
    vid:string | null;


    @Column("varchar",{
        nullable:true,
        length:16,
        name:"task_code"
    })
    taskCode:string | null;

}
