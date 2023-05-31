migrate((db) => {
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("quiw4r1f2kwt73n")

  // remove
  collection.schema.removeField("abmchjb8")

  return dao.saveCollection(collection)
})
