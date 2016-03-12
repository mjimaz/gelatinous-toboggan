'use strict'
const db = require('../modules/index.js');
const Sequelize = require('sequelize');

const user1 = {
  username: 'maryam'
};

const user2 = {
  username: 'josh'
};

const user3 = {
  username: 'tasio'
};

const user4 = {
  username: 'griffin'
};

const allUsers = [
  user1,
  user2,
  user3,
  user4
];

const quilt1 = {
  filename: 'quilt1',
  status: 1
};

const quilt2 = {
  filename: 'quilt2',
  status: 0
};

const allQuilts = [
  quilt1,
  quilt2
];

// create arrays of each db entry for dummy data
let createdUsers;
let createdQuilts;

function initializeData() {
  return db.sequelize.sync({ force: true })
    .then(() =>
      Sequelize.Promise.map(allUsers, user => db.User.create(user))
    ).then((users) => {
      createdUsers = users;
      return Sequelize.Promise.map(allQuilts, quilt => db.Quilt.create(quilt));
    }).then((quilts) => {
      createdQuilts = quilts;

      return Sequelize.Promise.all([
        createdUsers[0].addQuilt(createdQuilts[0], {status: 1}),
        createdUsers[1].addQuilt(createdQuilts[0], {status: 1}),
        createdUsers[1].addQuilt(createdQuilts[1], {status: 0}),
        createdUsers[2].addQuilt(createdQuilts[1], {status: 1}),
        createdUsers[3].addQuilt(createdQuilts[1], {status: 1})
      ]);
    });
}

module.exports = initializeData;
