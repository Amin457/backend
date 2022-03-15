const { getLocationPartById} = require("./localisation.controller");
const router = require("express").Router();

router.get("/:id_part",getLocationPartById);


module.exports = router;