const {login,getUsers,deleteUser,getPartenaire,deletePartenaire,createPartenaire,createConfig,ajouterBoutique,getPartenaireById} = require("./admin.controller");
const router = require("express").Router();


router.post("/login",login);
router.get("/getUsers",getUsers);
router.get("/getPartenaire",getPartenaire);
router.put("/deleteUser/:id/:etat",deleteUser);
router.put("/deletePartenaire/:id/:etat",deletePartenaire);
router.post("/createpartenaire",createPartenaire);
router.post("/createConfig",createConfig);
router.post("/ajouterBoutique",ajouterBoutique);
//modifier partenaire prete
router.get("/getPartenaireById/:id",getPartenaireById);

module.exports = router;