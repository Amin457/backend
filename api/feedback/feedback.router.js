const {createFeed} = require("./feedback.controller");
const router = require("express").Router();

router.put("/",createFeed);

module.exports = router;