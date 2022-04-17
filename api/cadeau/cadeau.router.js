const { getCadeauByIdPart,insertRecompense,getRecompense} = require("./cadeau.controller");
const router = require("express").Router();

router.get("/:id_part",getCadeauByIdPart);
router.post("/",insertRecompense);
router.get("/getRecompense/:id",getRecompense);



module.exports = router;