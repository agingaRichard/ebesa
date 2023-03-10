migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2f8kwazf",
    "name": "approval",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

  // remove
  collection.schema.removeField("2f8kwazf")

  return dao.saveCollection(collection)
})
