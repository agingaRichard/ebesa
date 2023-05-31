migrate((db) => {
  const collection = new Collection({
    "id": "guyag26jvuo1ocs",
    "created": "2023-02-12 18:08:26.853Z",
    "updated": "2023-02-12 18:08:26.853Z",
    "name": "gallery",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("guyag26jvuo1ocs");

  return dao.deleteCollection(collection);
})
