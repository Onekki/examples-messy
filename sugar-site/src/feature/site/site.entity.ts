import { Entity, Index, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TUser } from "../user/user.entity";


@Entity("t_site" ,{schema:"sugar_site" } )
@Index("id",["id",],{unique:true})
@Index("t_user_id",["tUser",])
export class TSite extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        unsigned: true,
        name:"id"
        })
    id:string;
        

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
        length:32,
        name:"name"
        })
    name:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:32,
        name:"domain"
        })
    domain:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"static"
        })
    static:any | null;
        

    @Column("text",{ 
        nullable:true,
        name:"dynamic"
        })
    dynamic:any | null;
        

   
    @ManyToOne(()=>TUser, (tUser: TUser)=>tUser.tSites,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'t_user_id'})
    tUser:TUser | null;

}
