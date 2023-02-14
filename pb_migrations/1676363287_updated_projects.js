migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("quiw4r1f2kwt73n")

  // remove
  collection.schema.removeField("abmchjb8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7vckjt0c",
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
  const collection = dao.findCollectionByNameOrId("quiw4r1f2kwt73n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "abmchjb8",
    "name": "author",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("7vckjt0c")

  return dao.saveCollection(collection)
})
