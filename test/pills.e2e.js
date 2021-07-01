const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const Pill = require('../src/models/pillModel')

const { setUpDb, userOneId, pillOneId } = require('./fixtures/db')

beforeAll(setUpDb)

afterAll(async () => {
  await mongoose.disconnect()
})

let token = ''
let pillId = ''
test('Should not create pill for user without valid jwt', async () => {
  const response = await request(app)
    .post('/api/v1/pills')
    .send({
      "name": "Xanax",
      "dose": "1",
      "frequency": "12 hours"
    })
    .expect(401)
})

test('Should login user without valid credentials', async () => {
  const response = await request(app)
    .post('/api/v1/users/login')
    .auth('naoko@test.com', 'test12345')
    .set('Accept', 'application/json')
    .expect(201)
  token = response.body.data
})

test('Should create pill for user without valid jwt', async () => {
  const response = await request(app)
    .post('/api/v1/pills')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "Xanax",
      "dose": "1",
      "frequency": "12 hours"
    })
    .expect(201)
  const pill = await Pill.find()
  pillId = pill[1]._id
  expect(pill).not.toBeNull()
  expect(pill[1].name).toEqual(response.body.data.name)
})

test('Should get pill for user with valid jwt and ownership', async () => {
  const response = await request(app)
    .get(`/api/v1/pills/${pillId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
  const pill = await Pill.findById(pillId)
  expect(pill.name).toEqual(response.body.data.name)
})

test('Should get pills for user with valid jwt and ownership', async () => {
  const response = await request(app)
    .get(`/api/v1/pills`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
  const pill = await Pill.find({ owner: userOneId })

  expect(pill[0].name).toEqual(response.body.data[0].name)
})

test('Should not get pill for user without jwt', async () => {
  const response = await request(app)
    .get(`/api/v1/pills/${pillId}`)
    .expect(401)
})

test('Should not get pill for another user', async () => {
  const response = await request(app)
    .get(`/api/v1/pills/${pillOneId}`)
    .expect(401)
})

test('Should not create pill with invalid name', async () => {
  const response = await request(app)
    .post('/api/v1/pills')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "X",
      "dose": "1",
      "frequency": "12 hours"
    })
    .expect(400)
})

test('Should not create pill with invalid dose', async () => {
  const response = await request(app)
    .post('/api/v1/pills')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "Xanax",
      "dose": "11",
      "frequency": "12 hours"
    })
    .expect(400)
})

test('Should not create pill with invalid frequency', async () => {
  const response = await request(app)
    .post('/api/v1/pills')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "Xanax",
      "dose": "10",
      "frequency": "10"
    })
    .expect(400)
})

test('Should not update pill with invalid name', async () => {
  const response = await request(app)
    .patch(`/api/v1/pills/${pillId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "X",
      "dose": "1",
      "frequency": "12 hours"
    })
    .expect(400)
})

test('Should not update pill with invalid dose', async () => {
  const response = await request(app)
    .patch(`/api/v1/pills/${pillId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "Xanax",
      "dose": "11",
      "frequency": "12 hours"
    })
    .expect(400)
})

test('Should not update pill with invalid frequency', async () => {
  const response = await request(app)
    .patch(`/api/v1/pills/${pillId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "Xanax",
      "dose": "10",
      "frequency": "10"
    })
    .expect(400)
})

test('Should not update pill with invalid owner', async () => {
  const response = await request(app)
    .patch(`/api/v1/pills/${pillOneId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "Xanax",
      "dose": "10",
      "frequency": "12 hours"
    })
    .expect(404)
})
