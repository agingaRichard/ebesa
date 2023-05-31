migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.deleteRule = ""

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtyqijxf",
    "name": "time",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "2022-11-17 03:00:00.000Z",
      "max": "2022-12-15 12:00:00.000Z"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.deleteRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtyqijxf",
    "name": "duration",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "2022-11-17 00:00:00.000Z",
      "max": "2022-12-15 12:00:00.000Z"
    }
  }))

  return dao.saveCollection(collection)
})
