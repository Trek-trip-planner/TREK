'use strict';

const {
  db,
  models: { User, Image, Park, EntranceFees, Trip, Trip_StartingPt },
} = require('../server/db');
const data = require('../server/db/npsApiData');
const usersData = require('../script/UsersData');
const tripData = require('../script/Trips');
const startingPointData = require('../script/StartingPtData');

const mappedData = data.map((park) => {
  const parkInfo = {
    fullName: park.fullName,
    description: park.description,
    latitude: park.latitude,
    longitude: park.longitude,
    weatherInfo: park.weatherInfo,
    states: park.states,
    emailAddress: park.contacts.emailAddresses[0].emailAddress,
    npsParkId: park.id,
  };

  if (park.operatingHours.length) {
    const standardHours = park.operatingHours[0].standardHours;

    const keyOfStandardHours = Object.keys(standardHours);
    for (let key in keyOfStandardHours) {
      key = key + ': ' + standardHours[key];
    }
    parkInfo.standardHours = keyOfStandardHours;
  }

  const parkTopic = park.topics.map((topic) => topic.name);
  parkInfo.topics = parkTopic;
  return parkInfo;
});

const imagesData = data
  .map((park) => {
    park.images.forEach((img) => (img.npsParkId = park.id));
    return park.images;
  })
  .flat();

const entranceFeeData = data
  .map((park) => {
    park.entranceFees.forEach((fee) => (fee.npsParkId = park.id));
    return park.entranceFees;
  })
  .flat();

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const usersInstances = await Promise.all(
    usersData.map((user) => {
      return User.create(user);
    })
  );

  //Creating ParkInfo
  const parksInfo = await Promise.all(
    mappedData.map((park) => {
      return Park.create(park);
    })
  );

  const imagesInfo = await Promise.all(
    imagesData.map((img) => {
      return Image.create(img);
    })
  );

  const entrancesFeeInfo = await Promise.all(
    entranceFeeData.map((fee) => {
      return EntranceFees.create(fee);
    })
  );

  const startingPointsInstances = await Promise.all(
    startingPointData.map((address) => {
      return Trip_StartingPt.create(address);
    })
  );

  const tripsInstances = await Promise.all(
    tripData.map((trip) => {
      return Trip.create(trip);
    })
  );

  async function associateParkWithImages() {
    for (const park of parksInfo) {
      const images = imagesInfo.filter(
        (img) => img.npsParkId === park.npsParkId
      );
      await park.setImages(images);
    }
  }

  async function associateParksWithFees() {
    for (const park of parksInfo) {
      const entranceFees = entrancesFeeInfo.filter(
        (fee) => fee.npsParkId === park.npsParkId
      );
      await park.setEntranceFees(entranceFees);
    }
  }

  try {
    await associateParkWithImages();
    await associateParksWithFees();
  } catch (error) {
    console.log('Error w/ Park Association: ', error.message);
  }

  const [
    User1,
    User2,
    User3,
    User4,
    User5,
    User6,
    User7,
    User8,
    User9,
    User10,
    User11,
    User12,
    User13,
    User14,
    User15,
    User16,
    User17,
    User18,
    User19,
    User20,
    User21,
    User22,
    User23,
    User24,
    User25,
    User26,
    User27,
    User28,
    User29,
    User30,
  ] = usersInstances;

  const [
    Trip1,
    Trip2,
    Trip3,
    Trip4,
    Trip5,
    Trip6,
    Trip7,
    Trip8,
    Trip9,
    Trip10,
    Trip11,
    Trip12,
    Trip13,
    Trip14,
    Trip15,
    Trip16,
    Trip17,
    Trip18,
    Trip19,
    Trip20,
    Trip21,
    Trip22,
    Trip23,
    Trip24,
    Trip25,
    Trip26,
    Trip27,
    Trip28,
    Trip29,
    Trip30,
  ] = tripsInstances;

  const [
    StartingPoint1,
    StartingPoint2,
    StartingPoint3,
    StartingPoint4,
    StartingPoint5,
    StartingPoint6,
    StartingPoint7,
    StartingPoint8,
    StartingPoint9,
    StartingPoint10,
    StartingPoint11,
    StartingPoint12,
    StartingPoint13,
    StartingPoint14,
    StartingPoint15,
    StartingPoint16,
    StartingPoint17,
    StartingPoint18,
    StartingPoint19,
    StartingPoint20,
    StartingPoint21,
    StartingPoint22,
    StartingPoint23,
    StartingPoint24,
    StartingPoint25,
    StartingPoint26,
    StartingPoint27,
    StartingPoint28,
    StartingPoint29,
    StartingPoint30,
  ] = startingPointsInstances;

  //associate users to trips
  await User1.setTrips();
  await User2.setTrips();
  await User3.setTrips();
  await User4.setTrips();
  await User5.setTrips();
  await User6.setTrips();
  await User7.setTrips();
  await User8.setTrips();
  await User9.setTrips();
  await User10.setTrips();
  await User11.setTrips();
  await User12.setTrips();
  await User13.setTrips();
  await User14.setTrips();
  await User15.setTrips();
  await User16.setTrips();
  await User17.setTrips();
  await User18.setTrips();
  await User19.setTrips();
  await User20.setTrips();
  await User21.setTrips();
  await User22.setTrips();
  await User23.setTrips();
  await User24.setTrips();
  await User25.setTrips();
  await User26.setTrips();
  await User27.setTrips();
  await User28.setTrips();
  await User29.setTrips();
  await User30.setTrips();

  //associate trip starting poins to trips
  //Many to Many - associate trips to parks

  console.log(`seeded ${usersInstances.length} users`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
