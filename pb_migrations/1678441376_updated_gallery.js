migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3jpnieqn",
    "name": "approval",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs")

  // remove
  collection.schema.removeField("3jpnieqn")

  return dao.saveCollection(collection)
})
