const {getNbQualite,getNbPrix,getNbAccueil,getNbPersonel,getNbRecParMoix,getNbRecParBoutique,statSemaine} = require("./statRec.controller");
const router = require("express").Router();

router.post("/getNbQualite",getNbQualite);
router.post("/getNbPrix",getNbPrix);
router.post("/getNbAccueil",getNbAccueil);
router.post("/getNbPersonel",getNbPersonel);
router.post("/getNbRecParMoix",getNbRecParMoix);
router.post("/getNbRecParBoutique",getNbRecParBoutique);
////
router.post("/statSemaine",statSemaine)


module.exports = router;