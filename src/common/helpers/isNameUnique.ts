import BaseDataBase from "common/classes/BaseDataBase";


const isNameUnique = async (
    tableContact:string,
    db: BaseDataBase,
    name: string | undefined
): Promise<boolean> =>  {
    try{
        if (!name) return false
        const contact = await db.instdb(tableContact).select("*").where("name", name.trim()).first()
        return contact? true: false;
    }catch(error){
        console.error('Error in isNameUnique:', error);
        throw error;
    }
}

export default isNameUnique