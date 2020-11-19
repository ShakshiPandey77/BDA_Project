const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const connectionString =
  "mongodb+srv://project:project@cluster0.chu6v.mongodb.net/test";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/findAll", (req, res) => {
  MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected to db");
      const db = client.db("BDA");
      db.collection("FAO")
        .find()
        .toArray()
        .then((result) => {
          res.send(result.slice(Math.max(result.length - 5, 1)));
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .send({
          msg: "Error finding data",
        })
        .status(400);
    });
});

// find docs with condition
app.get("/findOne", (req, res) => {
  MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected to db");
      const db = client.db("BDA");
      db.collection("FAO")
        .find(req.body)
        .toArray()
        .then((result) => {
          res.send(result);
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .send({
          msg: "Error finding data",
        })
        .status(400);
    });
});

app.post("/insert", (req, res) => {
  MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected to db");
      const db = client.db("BDA");
      db.collection("FAO")
        .insertOne(req.body)
        .then((result) => {
          res
            .send({
              msg: "Doc inserted",
              result: result,
            })
            .status(200);
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .send({
          msg: "Error inserting data",
        })
        .status(400);
    });
});

app.delete("/deleteMany", (req, res) => {
  MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected to db");
      const db = client.db("BDA");
      db.collection("FAO")
        .deleteMany(req.body)
        .then((result) => {
          res
            .send({
              msg: "Doc deleted",
              result: result,
            })
            .status(200);
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .send({
          msg: "Error deleting data",
        })
        .status(400);
    });
});

app.get("/getCount", (req, res) => {
  MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected to db");
      const db = client.db("BDA");
      db.collection("FAO")
        .countDocuments(req.body)
        .then((result) => {
          res
            .send({
              count: res,
            })
            .status(200);
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .send({
          msg: "Error counting data",
        })
        .status(400);
    });
});

app.post("/updateOne", (req, res) => {
  MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected to db");
      const db = client.db("BDA");
      let filter = req.body.filter;
      let options = { upsert: true };
      let updateQuery = { $set: req.body.query };
      db.collection("FAO")
        .updateOne(filter, updateQuery, options)
        .then((result) => {
          res.send({
            msg: "Updated document",
            result: result,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .send({
          msg: "Error updating document",
        })
        .status(400);
    });
});

app.post("/updateMany", (req, res) => {
  MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected to db");
      const db = client.db("BDA");
      let filter = req.body.filter;
      let updateQuery = { $set: req.body.query };
      db.collection("FAO")
        .updateMany(filter, updateQuery)
        .then((result) => {
          res.send({
            msg: "Updated documents",
            result: result,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .send({
          msg: "Error updating documents",
        })
        .status(400);
    });
});
