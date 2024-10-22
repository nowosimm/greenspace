var path = require("path");
var express = require("express");
var router = express.Router();
const passport = require("passport");
const Plant = require("../models/plant");
const PlantUser = require("../models/plantUser");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const plants = await Plant.find({ user: req.user }).exec();
  res.json(plants);
});
router.get("/favicon.ico", async function (req, res, next) {
  res.sendStatus(404);
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
        res.send({ _id: user._id, username: user.username });
      });

      console.log("here");
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get("/me", async function (req, res, next) {
  res.json(req.user);
});

router.delete("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

router.get("/home", async function (req, res, next) {
  const plants = await Plant.find().exec();
  res.json(plants);
});

router.get("/plant/:plantId/picture/:fileName", (req, res, next) => {
  const picturePath = __dirname + "/../plant-pictures/" + req.params.fileName;

  res.sendFile(path.resolve(picturePath), (err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.post("/addPage", async (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  try {
    const plant = new Plant({
      type: req.body.type,
      water: req.body.water,
      humidity: req.body.humidity,
      sunlight: req.body.sunlight,
      lastWatered: req.body.lastWatered,
      lastMisted: req.body.lastMisted,
      purchaseDate: req.body.purchaseDate,
      plantIcon: req.body.plantIcon,
      user: req.user,
    });
    if (req.files && Object.keys(req.files).length != 0) {
      let picture;
      let uploadPath;
      // The name of the input field (i.e. "picture") is used to retrieve the uploaded file
      picture = req.files.picture;
      uploadPath = __dirname + "/../plant-pictures/" + picture.name;
      plant.picturePath = picture.name;

      // Use the mv() method to place the file somewhere on your server
      picture.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await plant.save();
    res.json(plant);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.get("/:plant", async (req, res, next) => {
  try {
    const plants = await Plant.findOne({ _id: req.params.plant })
      .populate("type")
      .exec();
    res.json(plants);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/:plant", async (req, res, next) => {
  console.log(req.body);
  try {
    const plant = await Plant.findOne({ _id: req.params.plant });
    // console.log(plant);
    if (req.body.type != undefined) {
      plant.type = req.body.type;
    }
    if (req.body.water != undefined) {
      plant.water = req.body.water;
    }
    if (req.body.sunlight != undefined) {
      plant.sunlight = req.body.sunlight;
    }
    if (req.body.humidity != undefined) {
      plant.humidity = req.body.humidity;
    }
    if (req.body.notes != undefined) {
      plant.notes = req.body.notes;
    }
    if (req.body.lastMisted != undefined) {
      plant.lastMisted = req.body.lastMisted;
      // console.log("lastMisted");
    }
    if (req.body.lastWatered != undefined) {
      plant.lastWatered = req.body.lastWatered;
    }
    if (req.body.purchaseDate != undefined) {
      plant.purchaseDate = req.body.purchaseDate;
    }
    if (req.body.plantIcon != undefined) {
      plant.plantIcon = req.body.plantIcon;
    }

    await plant.save();
    res.json(plant);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// router.post("/:plant/delete", async (req, res) => {
//   try {
//     const plant = await Plant.findOne({ _id: req.params.plant });
//     if (plant.deletedCount === 0) {
//       return res.status(404).json({ message: 'Plant not found' });
//     }
//     res.redirect(`/`);
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred', error: error.message });
//   }
// });

module.exports = router;
