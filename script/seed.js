'use strict'

const {db, models: {User} } = require('../server/db');
const data = require('../server/db/npsApiData');

const mappedData = data.map((park)=> {
const parkInfo = {fullName:park.fullName, description: park.description, latitude: park.latitude,longitude: park.longitude,weatherInfo: park.weatherInfo, states: park.states, emailAddress: park.contact.emailAddresses[0].emailAddress,npsParkId:park.id }
const standardHours = park.operatingHours.standardHours
const keyOfStandardHours = Object.keys(standardHours)
for(let key in keyOfStandardHours) {
   key = key + ': ' + standardHours[key]
}
parkInfo.standardHours = keyOfStandardHours
const parkTopic = park.topics.map((topic)=> topic.name)
parkInfo.topics = parkTopic
 return parkInfo
});
const imagesData = data.map((park)=>{
  park.images.forEach(img => img.npsParkId = park.id )
  return park.images
}).flat()

const entranceFeeData = data.map((park)=> {
  park.entranceFees.forEach(fee => fee.npsParkId = park.id)
  return park.entranceFees
}).flat();

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])
  //Creating ParkInfo
  const parksInfo =  await Promise.all(
    mappedData.map((park)=> {
      return Park.create(park)
    })
  )

  const imagesInfo =  await Promise.all(
    imagesData.map((img)=> {
      return Image.create(img)
    })
  )

  const entrancesFeeInfo =  await Promise.all(
    entranceFeeData.map((fee)=> {
      return EntranceFees.create(fee)
    })
  )



  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}


/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
