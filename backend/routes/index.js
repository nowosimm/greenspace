var express = require("express");
var router = express.Router();
const Plant = require("../models/plant");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const plants = await Plant.find().exec();
  res.json(plants);
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
    res.json(plant)
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
s
router.get("/:plant", async (req, res, next) => {
  const plants = await Plant.findOne({ _id: req.params.plant })
    .populate("type")
    .exec();
  res.json(plants);
});

module.exports = router;