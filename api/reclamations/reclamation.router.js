const {createRec,getAllRec} = require("./reclamation.controller");
const router = require("express").Router();

router.post("/",createRec);
router.get("/:id",getAllRec);


module.exports = router;