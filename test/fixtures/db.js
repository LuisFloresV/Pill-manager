const mongoose = require('mongoose')
const User = require('../../src/models/userModel')
const Pill = require('../../src/models/pillModel')
const userOneId = new mongoose.Types.ObjectId()
const userSecondId = new mongoose.Types.ObjectId()
const pillOneId = new mongoose.Types.ObjectId()

const userOne = {
  _id: userOneId,
  name: "Naoko",
  email: "naoko@test.com",
  password: "test12345",
}

const userSecond = {
  _id: userSecondId,
  name: "Wannabe",
  email: "wannabe@test.com",
  password: "test12345",
}

const pillOne = {
  _id: pillOneId,
  name: "Paracetamol",
  dose: 1,
  frequency: "12 hours",
  owner: userSecondId,
}

const setUpDb = async () => {
  await User.deleteMany()
  await Pill.deleteMany()
  await User.create(userOne)
  await User.create(userSecond)
  await Pill.create(pillOne)
}

module.exports = {
  setUpDb,
  userOneId,
  pillOneId,
}