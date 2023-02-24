migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2xxueb9p",
    "name": "endtime",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtyqijxf",
    "name": "starttime",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "1900-01-01 06:00:00.000Z",
      "max": "2100-12-31 15:00:00.000Z"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6")

  // remove
  collection.schema.removeField("2xxueb9p")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtyqijxf",
    "name": "time",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "1900-01-01 06:00:00.000Z",
      "max": "2100-12-31 15:00:00.000Z"
    }
  }))

  return dao.saveCollection(collection)
})
