const {nbrFeedback,statReponse,nbrRep} = require("./statFeed.controller");
const router = require("express").Router();

router.post("/nbrFeedback",nbrFeedback);
router.post("/Question",statReponse);//tous les question
router.post("/nbrRep",nbrRep);//nbr de reponse par question
module.exports = router;