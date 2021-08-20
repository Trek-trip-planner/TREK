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
    Trip31,
    Trip32,
    Trip33,
    Trip34,
    Trip35,
    Trip36,
    Trip37,
    Trip38,
    Trip39,
    Trip40,
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

  const [Park1,Park2, Park3,Park4,Park5,Park6,Park7,Park8,Park9,Park10,Park11,Park12,Park13,Park14,Park15,Park16,Park17,Park18,Park19,Park20,Park21,Park22,Park23,Park24,Park25,Park26,Park27,Park28,Park29,Park30,Park31,Park32,Park33,Park34,Park35,Park36,Park37,Park38,Park39,Park40] = parksInfo;

  //associate users to trips
  await User1.setTrips([Trip1]);
  await User2.setTrips([Trip2]);
  await User3.setTrips([Trip3, Trip39]);
  await User4.setTrips([Trip4]);
  await User5.setTrips([Trip5]);
  await User6.setTrips([Trip6, Trip32, Trip33]);
  await User7.setTrips([Trip7]);
  await User8.setTrips([Trip8]);
  await User9.setTrips([Trip9, Trip31]);
  await User10.setTrips([Trip10]);
  await User11.setTrips([Trip11, Trip37]);
  await User12.setTrips([Trip12]);
  await User13.setTrips([Trip13]);
  await User14.setTrips([Trip14]);
  await User15.setTrips([Trip15, Trip34]);
  await User16.setTrips([Trip16]);
  await User17.setTrips([Trip17]);
  await User18.setTrips([Trip18, Trip35]);
  await User19.setTrips([Trip19]);
  await User20.setTrips([Trip20]);
  await User21.setTrips([Trip21, Trip36]);
  await User22.setTrips([Trip22]);
  await User23.setTrips([Trip23]);
  await User24.setTrips([Trip24, Trip40]);
  await User25.setTrips([Trip25]);
  await User26.setTrips([Trip26, Trip38]);
  await User27.setTrips([Trip27]);
  await User28.setTrips([Trip28]);
  await User29.setTrips([Trip29]);
  await User30.setTrips([Trip30]);

  //associate trip starting poins to trips
  //Many to Many - associate trips to parks
  await StartingPoint1.setTrips([Trip1]);
  await StartingPoint2.setTrips([Trip2]);
  await StartingPoint3.setTrips([Trip3]);
  await StartingPoint4.setTrips([Trip4]);
  await StartingPoint5.setTrips([Trip5]);
  await StartingPoint6.setTrips([Trip6, Trip7]);
  await StartingPoint7.setTrips([Trip8]);
  await StartingPoint8.setTrips([Trip9]);
  await StartingPoint9.setTrips([Trip10]);
  await StartingPoint10.setTrips([Trip11, Trip12, Trip14]);
  await StartingPoint11.setTrips([Trip13]);
  await StartingPoint12.setTrips([Trip15]);
  await StartingPoint13.setTrips([Trip16, Trip17]);
  await StartingPoint14.setTrips([Trip18]);
  await StartingPoint15.setTrips([Trip19]);
  await StartingPoint16.setTrips([Trip20, Trip21]);
  await StartingPoint17.setTrips([Trip22, Trip23, Trip24]);
  await StartingPoint18.setTrips([Trip25]);
  await StartingPoint19.setTrips([Trip26]);
  await StartingPoint20.setTrips([Trip27]);
  await StartingPoint21.setTrips([Trip28, Trip29]);
  await StartingPoint22.setTrips([Trip30, Trip31, Trip32]);
  await StartingPoint23.setTrips([Trip33]);
  await StartingPoint24.setTrips([Trip34]);
  await StartingPoint25.setTrips([Trip35]);
  await StartingPoint26.setTrips([Trip36]);
  await StartingPoint27.setTrips([Trip37]);
  await StartingPoint28.setTrips([Trip38]);
  await StartingPoint29.setTrips([Trip39]);
  await StartingPoint30.setTrips([Trip40]);

  //Park to Trips
  await Park1.setTrips([Trip1,])
  await Park2.setTrips([Trip2])
  await Park3.setTrips([Trip3])
  await Park4.setTrips([Trip4])
  await Park5.setTrips([Trip5])
  await Park6.setTrips([Trip6])
  await Park7.setTrips([Trip7])
  await Park8.setTrips([Trip8])
  await Park9.setTrips([Trip9])
  await Park12.setTrips([Trip10])
  await Park13.setTrips([Trip11])
  await Park14.setTrips([Trip14])
  await Park15.setTrips([Trip15])
  await Park16.setTrips([Trip16])
  await Park17.setTrips([Trip17])
  await Park18.setTrips([Trip18])
  await Park19.setTrips([Trip19])
  await Park20.setTrips([Trip12])
  await Park21.setTrips([Trip13])
  await Park23.setTrips([Trip14])
  await Park22.setTrips([Trip15])
  await Park24.setTrips([Trip16])
  await Park25.setTrips([Trip17])
  await Park26.setTrips([Trip18])
  await Park27.setTrips([Trip21])
  await Park28.setTrips([Trip20])
  await Park29.setTrips([Trip19])
  await Trip1.setParks([Park1])
  await Trip2.setParks([Park2])
  await Trip3.setParks([Park3])
  await Trip4.setParks([Park4])
  await Trip5.setParks([Park5])
  await Trip6.setParks([Park6])
  await Trip7.setParks([Park7])
  await Trip8.setParks([Park8])
  await Trip9.setParks([Park9])
  await Trip10.setParks([Park10])
  await Trip11.setParks([Park11])
  await Trip12.setParks([Park12])
  await Trip13.setParks([Park13])
  await Trip14.setParks([Park14])
  await Trip15.setParks([Park15])
  await Trip16.setParks([Park16])
  await Trip17.setParks([Park17])
  await Trip18.setParks([Park18])
  await Trip19.setParks([Park19])
  await Trip20.setParks([Park20])
  await Trip21.setParks([Park21])
  await Trip22.setParks([Park22])
  await Trip23.setParks([Park23])
  await Trip24.setParks([Park24])
  await Trip25.setParks([Park25])
  await Trip26.setParks([Park26])
  await Trip27.setParks([Park27])
  await Trip28.setParks([Park28])
  await Trip29.setParks([Park29])
  await Trip30.setParks([Park30])






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
