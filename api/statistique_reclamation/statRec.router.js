const {getNbQualite,getNbPrix,getNbAccueil,getNbPersonel,getNbRecParMoix,getNbRecParBoutique} = require("./statRec.controller");
const router = require("express").Router();


//get reclamation par sujet
/*7ott hakka fl postman

{
    "id_part":4,
    "date":"2022-01-25"
}
*/
router.get("/getNbQualite",getNbQualite);
router.get("/getNbPrix",getNbPrix);
router.get("/getNbAccueil",getNbAccueil);
router.get("/getNbPersonel",getNbPersonel);
router.get("/getNbPersonel",getNbPersonel);

//nombre de reclamation chaque moix
/*7ott hakka fl postman
{
    "date_debut":"2020-03-22",
    "date_fin":"2025-03-22", 
    "id_part":4
 }
 */
router.get("/getNbRecParMoix",getNbRecParMoix);


//nb des réclamations par boutiques
/*7ott hakka fl postman
{
    "date_debut":"2020-03-22",
    "date_fin":"2025-03-22", 
    "id_part":4
 }
 */
router.get("/getNbRecParBoutique",getNbRecParBoutique);



module.exports = router;