migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtyqijxf",
    "name": "duration",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "2022-11-17 12:00:00.000Z",
      "max": "2022-12-15 12:00:00.000Z"
    }
  }))

  return dao.saveCollection(collection)
})
