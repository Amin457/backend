const {createFeed,getAllQuest} = require("./feedback.controller");
const router = require("express").Router();

router.put("/",createFeed);
router.get("/question/:id_part",getAllQuest);

module.exports = router;