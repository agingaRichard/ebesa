migrate((db) => {
  const collection = new Collection({
    "id": "6q4ew7qnrjyd8q6",
    "created": "2023-02-12 18:08:50.438Z",
    "updated": "2023-02-12 18:08:50.438Z",
    "name": "events",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jckxrc1r",
        "name": "event",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("6q4ew7qnrjyd8q6");

  return dao.deleteCollection(collection);
})
