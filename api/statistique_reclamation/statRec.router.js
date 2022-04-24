const {getNbQualite,getNbPrix,getNbAccueil,getNbPersonel} = require("./statRec.controller");
const router = require("express").Router();

router.get("/getNbQualite",getNbQualite);
router.get("/getNbPrix",getNbPrix);
router.get("/getNbAccueil",getNbAccueil);
router.get("/getNbPersonel",getNbPersonel);

module.exports = router;