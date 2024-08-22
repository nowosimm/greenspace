var express = require("express");
var router = express.Router();
const passport = require("passport");
const Plant = require("../models/plant");
const PlantUser = require("../models/plantUser");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const plants = await Plant.find().exec();
  res.json(plants);
});

router.post("/sign-up", async (req, res, next) => {
  try {
    const user = new PlantUser({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

router.post("/log-in", async (req, res, next) => {
  console.log("login");
  passport.authenticate("local", (err, user, info) => {
    try {
      console.log(err);
      console.log(user);
      console.log(info);
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: true }, () => {
        res.sendStatus(200);
      });
      console.log("here");
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/home", async function (req, res, next) {
  const plants = await Plant.find().exec();
  res.json(plants);
});

router.post("/addPage", async (req, res, next) => {
  console.log(req.body);
  try {
    const plant = new Plant({
      type: req.body.type,
      water: req.body.water,
      humidity: req.body.humidity,
      sunlight: req.body.sunlight,
    });
    await plant.save();
    res.json(plant);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.get("/:plant", async (req, res, next) => {
  const plants = await Plant.findOne({ _id: req.params.plant })
    .populate("type")
    .exec();
  res.json(plants);
});

module.exports = router;
