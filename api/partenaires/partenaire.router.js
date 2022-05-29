const {getPartConfig,getPartenaires,login,getNamePartById,updatePart,demande} = require("./partenaire.controller");
const router = require("express").Router();

router.get("/",getPartenaires);
router.get("/getConfig/:id_part",getPartConfig);
router.post("/login",login);
router.get("/:id_part",getNamePartById);
router.patch("/updatePart",updatePart);
router.post("/demandePartenariat",demande);



module.exports = router;