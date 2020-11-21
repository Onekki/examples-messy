import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("t_question" ,{schema:"db_njcedu" } )
@Index("id",["id",],{unique:true})
export class TQuestion extends BaseEntity {

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
        

    @Column("char",{ 
        nullable:true,
        name:"answer"
        })
    answer:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"index"
        })
    index:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"second"
        })
    second:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"course_code"
        })
    courseCode:string | null;
        
}
