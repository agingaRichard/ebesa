migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ci88ryqdlpstdg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "goysyeep",
    "name": "author",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ci88ryqdlpstdg")

  // remove
  collection.schema.removeField("goysyeep")

  return dao.saveCollection(collection)
})
