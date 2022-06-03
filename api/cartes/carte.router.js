const { getAllCartes,getCarteById,deleteCarte,getInactive} = require("./carte.controller");
const router = require("express").Router();

router.get("/:id",getAllCartes);
router.get("/:id_client/:id_carte",getCarteById);
router.put("/deleteCarte/:id/:etat", deleteCarte);
router.get("/getInactive/cartes/:id",getInactive);

module.exports = router;