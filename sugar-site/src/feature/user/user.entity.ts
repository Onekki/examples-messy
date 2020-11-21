import { Entity, Index, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TSite } from "../site/site.entity";


@Entity("t_user" ,{schema:"sugar_site" } )
@Index("id",["id",],{unique:true})
export class TUser extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        unsigned: true,
        name:"id"
        })
    id:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:16,
        name:"username"
        })
    username:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:16,
        name:"password"
        })
    password:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"phone"
        })
    phone:string | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:16,
        name:"email"
        })
    email:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:32,
        name:"school"
        })
    school:string;
        

    @Column("datetime",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"register_time"
        })
    registerTime:Date | null;
        

   
    @OneToMany(()=>TSite, (tSite: TSite)=>tSite.tUser,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    tSites:TSite[];
    
}
