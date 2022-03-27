const {createRec} = require("./reclamation.controller");
const router = require("express").Router();

router.post("/",createRec);

module.exports = router;