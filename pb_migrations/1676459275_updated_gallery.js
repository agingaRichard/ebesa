migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n0epnwnz",
    "name": "text",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rrzdvbfv",
    "name": "title",
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
  collection.schema.removeField("n0epnwnz")

  // remove
  collection.schema.removeField("rrzdvbfv")

  return dao.saveCollection(collection)
})
