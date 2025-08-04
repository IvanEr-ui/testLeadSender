import  knex, { Knex } from "knex";
import BaseDataBase from "../../common/classes/BaseDataBase";

class MySQLClient implements BaseDataBase {
    private config: Knex.Config | string;
    private db: Knex<any, unknown[]> | null;

    constructor(config: Knex.Config | string){
        this.config = config;
        this.db = null; 
    }

    async transaction(callback: (db: Knex) => Promise<any>): Promise<any> {
        if (!this.db) {
            throw new Error("Database connection is not established.");
        }
        const transaction = await this.db.transaction();
        try {
            const data = await callback(transaction);
            await transaction.commit();
            return data;
        } catch (error) {
            await transaction.rollback();
            console.error("Transaction failed:", error);
            throw "Transaction failed"; 
        }
    }

    async insert(table: string, data: any): Promise<any>{
        if (!this.db) {
            throw new Error("Database connection is not established.");
        }
        return await this.db(table).insert(data)
    };
    async update(table: string, data: any, where: string):Promise<any>{
        if (!this.db) {
            throw new Error("Database connection is not established.");
        }

        return await this.db(table).where(where).update(data)
    };
    async delete(table: string, where: string): Promise<any>{
         if (!this.db) {
            throw new Error("Database connection is not established.");
        }

        return await this.db(table).where(where).del()
    };
    async select(table: string, columns: '*' | string[], where?: Knex.Raw): Promise<any[] | null> {
         if (!this.db) {
            throw new Error("Database connection is not established.");
        }

        if(where) return await this.db(table).select(columns).where(where)
        return await this.db(table).select(columns)
    }
    async connect(): Promise<any> {
        try{
            this.db = knex(this.config);
            return true
        }catch(err){
            throw new Error("Database connection is not established.");
        }
    };
    async disconnect(): Promise<any>{
        if (!this.db) {
            throw new Error("Database connection is not established.");
        }
        this.db.destroy();
        console.log("Disconnected from MySQL database.");
        return true
    };

    get instdb(){
        if (!this.db) {
            throw new Error("Database connection is not established.");
        }
        return this.db
    }
}

export default MySQLClient