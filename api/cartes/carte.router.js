const { getAllCartes,getCarteById} = require("./carte.controller");
const router = require("express").Router();

router.get("/:id",getAllCartes);
router.get("/:id_client/:id_carte",getCarteById);


module.exports = router;