const {nbrFeedback,Question,nbrRep,statSemaine,getNbFeedParMoix} = require("./statFeed.controller");
const router = require("express").Router();

router.post("/nbrFeedback",nbrFeedback);
router.post("/Question",Question);//tous les question
router.post("/nbrRep",nbrRep);//nbr de reponse par question
////
router.post("/statSemaine",statSemaine)
router.post("/getNbFeedParMoix",getNbFeedParMoix)
module.exports = router;