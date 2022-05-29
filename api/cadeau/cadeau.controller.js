const { getCadeauByIdPart, insertRecompense, getRecompense, getEtatJeux, updateEtatJeux, deleteCadeau, ajouterCadeau, getGagnants } = require("./cadeau.service");
const conn = require("../../config/database");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + "-" + month + "-" + day;

module.exports = {
  getEtatJeux: (req, res) => {
    const id_part = req.params.id_part;
    getEtatJeux(id_part, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        data: results
      });
    });
  },
  getCadeauByIdPart: (req, res) => {
    const id_part = req.params.id_part;
    getCadeauByIdPart(id_part, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          data: results
        });
      }
      return res.json({
        message: "Record not Found"
      });
    });
  },

  insertRecompense: (req, res) => {
    const body = req.body;

    insertRecompense(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "vous avez gagné"
      });
    });
    conn.query(
      `update cadeau set quantity=quantity-1 where id_cadeau=?`,
      [
        body.id_cadeau,
      ]
    );



  }

  ,
  getPermissionJeux: (req, res) => {
    const id = req.params.id;
    const id_part = req.params.id_part;
    conn.query('select date,recompense.id from recompense,cadeau,jeux_partenaire where recompense.id_cadeau=cadeau.id_cadeau and id_client=? and DATEDIFF( ?, date )<7 and cadeau.id_jeu_part=jeux_partenaire.id_jeu_part and jeux_partenaire.id_part=?', [id, newdate, id_part], (err, results, fields) => {
      if (results.length == 0) {
        return res.status(200).json({
          success: 1
        });

      } else {

        conn.query('select DATEDIFF( ?,recompense.date ) as a from recompense,cadeau,jeux_partenaire where recompense.id_cadeau=cadeau.id_cadeau and id_client=? and cadeau.id_jeu_part=jeux_partenaire.id_jeu_part and jeux_partenaire.id_part=? and DATEDIFF( ?, date )<7', [newdate, id, id_part, newdate], (err, results1, fields) => {
          console.log(results1);

          return res.status(200).json({
            success: 0,
            message: "ressayer dans ",
            results1
          });


        });
      }

    });

  }

  ,
  getRecompense: (req, res) => {
    const id = req.params.id;
    const id_part = req.params.id_part;

    getRecompense(id, id_part, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          results
        });
      }
      return res.json({
        message: "Record not Found"
      });
    });
  },
  updateEtatJeux: (req, res) => {
    const id_part = req.params.id_part;
    conn.query('select etat_jeu from jeux_partenaire where id_part=?', [id_part], (err, results, fields) => {
      if (results[0].etat_jeu == 0) {

        updateEtatJeux(1, id_part, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            message: 'jeu activé avec succes',
          });
        });
      } else {

        updateEtatJeux(0, id_part, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            message: 'jeux desactivé avec succes',
          });
        });
      }



    });
  },

  deleteCadeau: (req, res) => {
    const id_cadeau = req.params.id_cadeau;
    deleteCadeau(id_cadeau, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "cadeau deleted successfully"
      });
    });
  },
  /* modifierCadeau : (req, res) => {
     const body = req.body;
     modifierCadeau(body, (err, results) => {
       if (err) {
         console.log(err);
         return;
       }
       if (!results) {
         return res.json({
           success: 0,
           message: "Record Not Found"
         });
       }
       return res.json({
         success: 1,
         message: "cadeau modifier avec succes"
       });
     });
   },*/
  ajouterCadeau: (req, res) => {
    const body = req.body;
    conn.query('select id_jeu_part from jeux_partenaire where id_part=?', [body.id_part], (err, results, fields) => {
      console.log(results);
      ajouterCadeau(body, results[0].id_jeu_part, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          message: "cadeau ajouter avec success"
        });
      });

    });


  },
  getGagnants: (req, res) => {
    const id_part = req.params.id_part;
    getGagnants(id_part, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          results
        });
      }
      return res.json({
        message: "Record not Found"
      });
    });
  }
}