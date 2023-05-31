migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ci88ryqdlpstdg")

  collection.listRule = ""
  collection.viewRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ci88ryqdlpstdg")

  collection.listRule = null
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
