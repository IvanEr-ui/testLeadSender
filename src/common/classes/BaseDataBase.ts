import { Knex } from "knex";

export default interface BaseDataBase {
    instdb: Knex<any, unknown[]>

    connect: ()=> Promise<any>;
    disconnect: () => Promise<any>;

    select: (table:string, columns:  '*' | string[],  where?: Knex.Raw) => Promise<any[] | null>
    insert: (table:string, data: any) => Promise<any>
    update: (table:string, data: any, where: string) => Promise<any>
    delete: (table:string, where: string) => Promise<any>

    transaction: (callback: (db: Knex) => Promise<any>) => Promise<any>
}