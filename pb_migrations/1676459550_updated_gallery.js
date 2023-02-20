migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dxinxwuq",
    "name": "author",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs")

  // remove
  collection.schema.removeField("dxinxwuq")

  return dao.saveCollection(collection)
})
