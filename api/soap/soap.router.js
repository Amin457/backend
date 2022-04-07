const router = require("express").Router();
const {GetLoyaltyCard,createCard,createClient,GetPoints} = require("./soap.controller");
router.post("/GetLoyaltyCard",GetLoyaltyCard);
router.post("/createCard",createCard);
router.post("/createClient",createClient);
router.post("/getPoints",GetPoints);

module.exports = router;