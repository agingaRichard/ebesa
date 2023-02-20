migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs")

  // remove
  collection.schema.removeField("2w6eoaen")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2w6eoaen",
    "name": "files",
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

  // remove
  collection.schema.removeField("sztokjdk")

  return dao.saveCollection(collection)
})
