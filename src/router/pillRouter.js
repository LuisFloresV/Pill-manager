const express = require('express')
const router = express.Router()
const { deleteOne, patchOne, getOne, getAll, createOne } = require('../services/factoryService')
const { deletePills } = require('../services/pillService')

const Pill = require('../models/pillModel')

router.route('/')
  .get(getAll(Pill))
  .post(createOne(Pill))
  .delete(deletePills)

router.route('/:id')
  .get(getOne(Pill))
  .patch(patchOne(Pill))
  .delete(deleteOne(Pill))

module.exports = router