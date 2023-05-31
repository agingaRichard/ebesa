migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

  // remove
  collection.schema.removeField("jckxrc1r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fwdtwg3d",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iawz23x4",
    "name": "images",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 25,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hsq1ex1g",
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
    "id": "zyew4rqk",
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
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jckxrc1r",
    "name": "event",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("fwdtwg3d")

  // remove
  collection.schema.removeField("iawz23x4")

  // remove
  collection.schema.removeField("hsq1ex1g")

  // remove
  collection.schema.removeField("zyew4rqk")

  return dao.saveCollection(collection)
})
