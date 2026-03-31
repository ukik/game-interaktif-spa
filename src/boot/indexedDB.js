
import { boot } from 'quasar/wrappers'

import db from "src/utils/indexedDB"

export default boot(({ app }) => {

  app.mixin({
    methods: {
      async createIndexedDB(table, payload) {
        return await db.insert(table, {
          ...payload,
          date: new Date()
        })
      },
      async getIndexedDB(table) {
        return await db.getAll(table)
      },
      async readIndexedDB(table, id) {
        return await db.getById(table, id)
      },
      async updateIndexedDB(table, id, payload) {
        await db.update(table, id, {
          ...payload
        })
      },
      async deleteIndexedDB(table, id) {
        return await db.delete(table, 1)
      },
      async clearIndexedDB(table) {
        return await db.clear(table)
      },
    }
  })
})
