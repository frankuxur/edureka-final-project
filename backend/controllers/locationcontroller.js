const dbObj = require("../db/connect");
const collectionName = "locations";
let database = null;

dbObj.connect(function (err) {
  if (err) {
    console.log(err);
  }
  database = dbObj.getDb();
});

const controller = {
  locations: (req, res) => {
    database
      .collection(collectionName)
      .find()
      .toArray((err, result) => {
        if (err) {
          res.status(500).send({ message: "Server side error" });
        } else {
          res.send({ status: 200, message: "Data sent", data: result });
        }
      });
  },
};

module.exports = controller;
