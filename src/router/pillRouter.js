const express = require('express')
const router = express.Router()
const { getPills, postPill, deletePills
  , deletePill, getPill, patchPill } = require('../services/pillService')

router.route('/')
  .get(getPills)
  .post(postPill)
  .delete(deletePills)

router.route('/:id')
  .get(getPill)
  .patch(patchPill)
  .delete(deletePill)

module.exports = router