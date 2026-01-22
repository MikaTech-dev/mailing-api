const express = require ("express")
const isAlive = require ("../handlers/alive.handlers")
const router = express.Router()

module.exports = router.get("/", isAlive)