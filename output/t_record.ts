import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("t_record" ,{schema:"db_njcedu" } )
@Index("id",["id",],{unique:true})
export class TRecord extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        unsigned: true,
        name:"id"
        })
    id:string;
        

    @Column("int",{ 
        nullable:true,
        name:"video"
        })
    video:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:8,
        name:"in"
        })
    in:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:8,
        name:"after"
        })
    after:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"course_code"
        })
    courseCode:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"user_code"
        })
    userCode:string | null;
        

    @Column("char",{ 
        nullable:true,
        length:63,
        name:"courseware"
        })
    courseware:string | null;
        
}
