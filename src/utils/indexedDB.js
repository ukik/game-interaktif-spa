import Dexie from "dexie"

class IndexedDBHelper {

  constructor() {

    this.db = new Dexie("AppDatabase")

    this.db.version(1).stores({
      users: "++id,name,email",
      scores: "++id,userId,score,date",
      progress: "++id,userId,level,status",
      settings: "++id,key,value"
    })

  }

  // CREATE
  async insert(table, data) {
    return await this.db[table].add(data)
  }

  // READ ALL
  async getAll(table) {
    return await this.db[table].toArray()
  }

  // READ BY ID
  async getById(table, id) {
    return await this.db[table].get(id)
  }

  // UPDATE
  async update(table, id, data) {
    return await this.db[table].update(id, data)
  }

  // DELETE
  async delete(table, id) {
    return await this.db[table].delete(id)
  }

  // CLEAR TABLE
  async clear(table) {
    return await this.db[table].clear()
  }

}

export default new IndexedDBHelper()
