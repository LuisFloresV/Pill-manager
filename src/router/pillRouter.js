const express = require('express')
const router = express.Router()
const { deleteOne, patchOne, getOne, getAll, createOne } = require('../services/factoryService')
const { deletePills } = require('../services/pillService')
const passport = require('passport')
const Pill = require('../models/pillModel')

// PASSPORT STRATEGIES
require('../utils/auth/jwt')

router.use(passport.authenticate('jwt', { session: false }))
router.route('/')
  .get(getAll(Pill))
  .post(createOne(Pill))
  .delete(deletePills)

router.route('/:id')
  .get(getOne(Pill))
  .patch(patchOne(Pill))
  .delete(deleteOne(Pill))

module.exports = router