const {createFeed,getAllFeed} = require("./feedback.controller");
const router = require("express").Router();

router.put("/",createFeed);
router.get("/:id",getAllFeed);

module.exports = router;