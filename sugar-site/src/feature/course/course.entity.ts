import { Entity, Index, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("t_course", { schema: "sugar_site" })
@Index("id", ["id",], { unique: true })
export class TCourse extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true,
        name: "id"
    })
    id: string;


    @Column("varchar", {
        nullable: true,
        length: 32,
        name: "name"
    })
    name: string | null;


    @Column("varchar", {
        nullable: true,
        length: 32,
        name: "code"
    })
    code: string | null;


    @Column("varchar", {
        nullable: true,
        length: 16,
        name: "video"
    })
    video: string | null;


    @Column("varchar", {
        nullable: true,
        length: 16,
        name: "grade"
    })
    grade: string | null;

}
