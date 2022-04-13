const { getCadeauByIdPart,insertRecompense} = require("./cadeau.controller");
const router = require("express").Router();

router.get("/:id_part",getCadeauByIdPart);
router.post("/",insertRecompense);


module.exports = router;