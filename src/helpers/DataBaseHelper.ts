import BaseDataBase from "../common/classes/BaseDataBase";

class DataBaseHelper {
    public db;
    constructor(db: BaseDataBase){
        this.db = db
    }
}

export default DataBaseHelper