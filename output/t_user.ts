import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("t_user" ,{schema:"db_njcedu" } )
@Index("id",["id",],{unique:true})
export class TUser extends BaseEntity {

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
        length:16,
        name:"username"
        })
    username:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"password"
        })
    password:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"class"
        })
    class:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"grade"
        })
    grade:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"task_code"
        })
    taskCode:string | null;
        

    @Column("char",{ 
        nullable:true,
        length:128,
        name:"token"
        })
    token:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:272,
        name:"stoken"
        })
    stoken:string | null;
        

    @Column("bigint",{ 
        nullable:true,
        unsigned: true,
        name:"sys_user"
        })
    sysUser:string | null;
        
}
