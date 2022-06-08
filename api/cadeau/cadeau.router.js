const { statSemaineGagnants,getCadeauByIdPart,insertRecompense,getRecompense,getEtatJeux,getPermissionJeux,updateEtatJeux,deleteCadeau,ajouterCadeau,getGagnants} = require("./cadeau.controller");
const router = require("express").Router();

router.get("/:id_part",getCadeauByIdPart);
router.post("/",insertRecompense);
router.get("/getRecompense/:id/:id_part",getRecompense);
router.get("/etat/:id_part",getEtatJeux);
router.get("/getPermissionJeux/:id/:id_part",getPermissionJeux);
router.patch("/updateEtatJeux/:id_part",updateEtatJeux);
router.patch("/:id_cadeau",deleteCadeau);
router.post("/ajouterCadeau",ajouterCadeau);
router.get("/getGagnants/:id_part",getGagnants);
////stat
router.post("/statSemaineGagnants",statSemaineGagnants);

module.exports = router;
