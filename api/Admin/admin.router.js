const { verifConfig,login, getUsers, deleteUser, getPartenaire, deletePartenaire, createPartenaire, createConfig, ajouterBoutique, getPartenaireById, deleteBoutique, getAllBoutique, getDemandePart, aprouverPartenaire ,deleteDemande,statistiquePartenaire,statistiqueUser,statistiqueCarte,statistiqueDashbord} = require("./admin.controller");
const router = require("express").Router();


router.post("/login", login);
router.get("/getUsers", getUsers);
router.get("/getPartenaire", getPartenaire);
router.put("/deleteUser/:id/:etat", deleteUser);
router.put("/deletePartenaire/:id/:etat", deletePartenaire);
router.post("/createpartenaire", createPartenaire);
router.post("/createConfig", createConfig);
router.get("/getPartenaireById/:id", getPartenaireById);
router.post("/ajouterBoutique", ajouterBoutique);
router.delete("/deleteBoutique/:id", deleteBoutique);
router.get("/getAllBoutique/:id_part", getAllBoutique);

///demande partenariat
router.get("/getDemandePart", getDemandePart);
router.put("/aprouverPartenaire/:id", aprouverPartenaire);
router.delete("/deleteDemande/:id", deleteDemande);
//dashbord
router.post("/statistiquePartenaire", statistiquePartenaire);
router.post("/statistiqueUser", statistiqueUser);
router.get("/statistiqueCarte", statistiqueCarte);
router.get("/statistiqueDashbord", statistiqueDashbord);
/////verif config
router.get("/verifConfig/:id", verifConfig);


module.exports = router;