migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ci88ryqdlpstdg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sabpzxtg",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ci88ryqdlpstdg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sabpzxtg",
    "name": "body",
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
})
