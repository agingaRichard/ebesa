migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs")

  // remove
  collection.schema.removeField("sztokjdk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dpp2yd0q",
    "name": "images",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 50,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sztokjdk",
    "name": "images",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("dpp2yd0q")

  return dao.saveCollection(collection)
})
