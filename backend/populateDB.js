#! /usr/bin/env node

console.log(
    'Generating plant library'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Plant = require("./models/plant");

  
  const plants = [];

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
  
    // await Plant.deleteMany().exec();

  
    await createPlants();
  
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
    process.exit();
  }
  
  async function plantCreate(index, type, water, sunlight, humidity, notes, firstLetter) {
    const plantDetail = {
        type: type,
        water: water,
        sunlight: sunlight,
        humidity: humidity,
        notes: notes,
        firstLetter: firstLetter,
    };
  
    const plant = new Plant(plantDetail);
    await plant.save();
    plants[index] = plant;
    console.log(`Added plant: ${type}`);
  }
  
//   async function postCreate(index, title, body, user) {
//     const postDetail = {
//       title: title,
//       body: body,
//       user: user,
//     };
  
//     const post = new Post(postDetail);
//     await post.save();
//     posts[index] = post;
//     console.log(`Added post: ${title}`);
//   }
  
//   async function userCreate(index, name, isAdmin) {
//     const userDetail = {
//       username: name,
//       password: "123",
//       isAdmin: isAdmin,
//     };
  
//     const user = new User(userDetail);
//     await user.save();
//     users[index] = user;
//     console.log(`Added user: ${name}`);
//   }
  
  
  async function createPlants() {
    console.log("Adding plants");
    await Promise.all([
      plantCreate(0, "Golden Madonna", "Top 1/3", "Moderate", "Moderate", "Purchased at Living Rooms Cincinnati", "G"),
      plantCreate(1, "Fiddle Leaf Fig", "Top 1/3", "Bright Indirect", "High", "Keep an eye out for new growth", "F"),
      plantCreate(2, "Chinese Money Plant", "Top 1/3", "Bright Indirect", "Low", "Re-potted 5.12.24", "C"),
    ])
  }

  