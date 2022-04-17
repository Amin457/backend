const {getPartConfig,getPartenaires,login} = require("./partenaire.controller");
const router = require("express").Router();

/*router.post("/",createConfig);*/
router.get("/",getPartenaires);
router.get("/getConfig/:id_part",getPartConfig);
router.post("/login",login);




module.exports = router;