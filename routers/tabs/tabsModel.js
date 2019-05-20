const db = require("../../database/dbConfig");

module.exports = {
  add,
  remove,
  update,
  getTabs,
  findById,
  findByUserId
};

function getTabs() {
  return db("tabs")
    .join("users", "tabs.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      "tabs.user_id",
      "tabs.title",
      {tab_id: "tabs.id"},
      "tabs.website",
      "tabs.catagory",
      "tabs.favicon",
      "tabs.description",
      "tabs.created_at",
      "tabs.updated_at"
    );
}

function add(tab) {
  return db("tabs")
    .insert(tab)
    .then(([id]) => {
      console.log(id)
      return findById(id);
    });
}

function findById(id) {
  return db("tabs")
    .where("tabs.id", id )
    .join("users",  "users.id","tabs.user_id")
    .select(
      { username: "users.username" },
      "user_id",
      "title",
      "website",
      "catagory",
      "favicon",
      "description",
      "created_at",
      "updated_at"
    );
}

function update(id, changes) {
  return db("tabs")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count < 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db("tabs")
    .where({id})
    .del();
}

function findByUserId(user_id) {
  return db("tabs").where({ user_id });
}
