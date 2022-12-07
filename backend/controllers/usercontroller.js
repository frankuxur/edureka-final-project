const dbObj = require("../db/connect");
const jwt = require("jsonwebtoken");
const collectionName = "userdetails";
let database = null;

dbObj.connect(function (err) {
  if (err) {
    console.log(err);
  }
  database = dbObj.getDb();
});

module.exports = {
  authorise: (req, res) => {
    let token = req.headers["token"];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRETKEY, function (err, decoded) {
        if (err) {
          res.status(403).send({ message: "Login failed!" });
        } else if (decoded) {
          res.send({ status: 200, message: "Login successful!" });
        }
      });
    } else {
      res.status(403).send({ message: "Login failed!" });
    }
  },

  login: (req, res) => {
    database
      .collection(collectionName)
      .find({
        username: req.body.username,
        password: req.body.password,
      })
      .toArray((err, result) => {
        if (err) {
          res.status(500).send({ message: "serverside error!" });
        } else {
          if (result.length) {
            let token = jwt.sign(
              {
                username: req.body.username,
              },
              process.env.JWT_SECRETKEY,
              { expiresIn: "1h" }
            );
            res.send({
              status: 200,
              message: "Success!",
              data: { token: token },
            });
          } else {
            res
              .status(403)
              .send({ message: "Invalid credentials, permission denied!" });
          }
        }
      });
  },

  signup: (req, res) => {
    const bodyParams = req.body;

    const userData = {
      first_name: bodyParams.fname,
      last_name: bodyParams.lname,
      username: bodyParams.username,
      password: bodyParams.password,
    };

    database
      .collection(collectionName)
      .find({
        username: userData.username,
      })
      .toArray((err, result) => {
        if (err) {
          res.status(500).send({ message: "serverside error!" });
        } else {
          if (result && result.length) {
            res.send({ status: 400, message: "Username already exists" });
          } else {
            database
              .collection(collectionName)
              .insertOne(userData, (err, result) => {
                if (err) {
                  res.status(500).send({ message: "serverside error!" });
                } else {
                  res.send({
                    status: 200,
                    message: "new user created!",
                  });
                }
              });
          }
        }
      });
  },

  getUserDetails: (req, res) => {
    const username = req.query.username;

    database
      .collection(collectionName)
      .find({ username: username })
      .toArray((err, result) => {
        if (err) {
          res.status(500).send({ message: "serverside error!" });
        } else {
          res.send({ status: 200, message: "Success", data: result });
        }
      });
  },
};
