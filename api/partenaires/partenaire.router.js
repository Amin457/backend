const {getPartConfig,getPartenaires,login,getNamePartById} = require("./partenaire.controller");
const router = require("express").Router();

/*router.post("/",createConfig);*/
router.get("/",getPartenaires);
router.get("/getConfig/:id_part",getPartConfig);
router.post("/login",login);
router.get("/:id_part",getNamePartById);




module.exports = router;