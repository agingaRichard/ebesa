migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ci88ryqdlpstdg")

  // remove
  collection.schema.removeField("goysyeep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vpgzbbig",
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

  // remove
  collection.schema.removeField("vpgzbbig")

  return dao.saveCollection(collection)
})
