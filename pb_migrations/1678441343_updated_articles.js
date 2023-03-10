migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ci88ryqdlpstdg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "puxm8gww",
    "name": "approval",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ci88ryqdlpstdg")

  // remove
  collection.schema.removeField("puxm8gww")

  return dao.saveCollection(collection)
})
