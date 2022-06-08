const { getBoutiquePartById} = require("./boutique.controller");
const router = require("express").Router();

router.get("/:id_part",getBoutiquePartById);


module.exports = router;