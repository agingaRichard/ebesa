migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("quiw4r1f2kwt73n")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mvql3yxl",
    "name": "images",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 10,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("quiw4r1f2kwt73n")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mvql3yxl",
    "name": "images",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
})
