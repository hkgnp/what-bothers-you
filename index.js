require("dotenv").config();
const mongoUrl = process.env.MONGO_URL;
const collection = process.env.COLLECTION;
const MongoUtil = require("./MongoUtil");
const ObjectId = require("mongodb").ObjectId;

const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const moment = require("moment-timezone");

const app = express();

app.set("view engine", "hbs");
app.use(express.static("public"));
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

app.use(express.json());

//eq
require("handlebars-helpers")({
  handlebars: hbs.handlebars,
});

hbs.registerHelper("dateFormat", (date, options) => {
  const formatToUse =
    (arguments[1] && arguments[1].hash && arguments[1].hash.format) ||
    "DD/MM/YYYY";
  return moment(date).tz("Singapore").format(formatToUse);
});

// if equal function hbs helper
hbs.registerHelper("if_eq", (a, b, options) => {
  if (a === b) return options.fn(this);
  else return options.inverse(this);
});

// enable forms
app.use(
  express.urlencoded({
    extended: false,
  })
);

(async () => {
  const db = await MongoUtil.connect(mongoUrl, collection);

  app.get("/_ah/warmup", async (req, res) => {
    // Handle your warmup logic. Initiate db connection, etc.
    await MongoUtil.connect(mongoUrl, collection);
  });

  app.get("/", async (req, res) => {
    const result = await db.collection("comments").find({}).toArray();
    result.reverse();
    res.render("index", { result });
  });

  app.post("/", async (req, res) => {
    await db.collection("comments").insertOne({
      date: new Date(),
      value: req.body.post,
    });
    res.redirect("/");
  });

  app.get("/discuss/:id", async (req, res) => {
    await db.collection("comments").updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          discussed: true,
          discussed_date: new Date(),
        },
      }
    );
    res.redirect("/");
  });
})();

app.listen(process.env.PORT || 7000, () => console.log("Server is running"));
