"use strict";

const { MongoClient } = require('mongodb')
const mongodbUrl = 'mongodb://localhost:27017/test'

////////////made this a promise/////////////
// MongoClient
//     .connect(mongodbUrl)
//     .then (db => {
//   db.collection("restaurants")
//   .find()
//   .toArray()
//   .then(data => {
//     console.log(data);
//     db.close()
//   })
//   .catch(console.error)
// })
//   .catch(console.error)

/////////////////method 2 //////////////////////////////

// MongoClient
//     .connect(mongodbUrl)
//     .then (db => {
//   db.collection("restaurants")
//   .find()
//   .each((err, restaurant) => {
//     console.log(restaurant);
//     })
//     .then(db.close)
//     .catch(console.error)
// })
//   .catch(console.error)

// MongoClient
//     .connect(mongodbUrl)
//     .then (db => {
//   db.collection("restaurants")
//   .find()
//   .toArray()
//   .then((restaurants) => {
//     restaurants.forEach(restaurant => {
//       if (restaurant.name){
//         console.log(restaurant.name);
//       }
//     })
//     then(db.close())
//   })
// })


// const args = process.argv[2]
//
// MongoClient
//     .connect(mongodbUrl)
//     .then (db => {
//   db.collection("restaurants")
//   .find({ cuisine : args})
//   .sort({ name: 1})
//   .toArray()
//   .then((restaurants) => {
//     restaurants.forEach(restaurant => {
//       if (restaurant.name){
//         console.log(restaurant.name);
//       }
//     })
//     .then(db.close())
//   })
// })

'use strict'

const { MongoClient: { connect } } = require('mongodb')

const { argv: [,, ...filter] } = process

const MONGODB_URL = 'mongodb://localhost:27017/test'

const name = RegExp(`^${filter.join(' ')}`, 'i')

connect(MONGODB_URL)
  .then(db => {
    db.collection('restaurants')
      .find({ name })
      .sort({ name: 1 })
      .forEach(restaurant => {
        if (restaurant.name) {
          console.log(restaurant.name)
        }
      }, () => db.close())
  })
  .catch(console.error)
