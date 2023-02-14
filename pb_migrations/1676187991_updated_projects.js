migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("quiw4r1f2kwt73n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x27nkiah",
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
  const collection = dao.findCollectionByNameOrId("quiw4r1f2kwt73n")

  // remove
  collection.schema.removeField("x27nkiah")

  return dao.saveCollection(collection)
})
