const {statSemaineCard, getAllCartes,getCarteById,deleteCarte,getInactive,GetLoyaltyCard,createClient,GetPoints} = require("./carte.controller");
const router = require("express").Router();

router.get("/:id",getAllCartes);
router.get("/:id_client/:id_carte",getCarteById);
router.put("/deleteCarte/:id/:etat", deleteCarte);
router.get("/getInactive/cartes/:id",getInactive);
/////cegid
router.post("/GetLoyaltyCard",GetLoyaltyCard);
router.post("/createClient",createClient);
router.post("/getPoints",GetPoints);
module.exports = router;