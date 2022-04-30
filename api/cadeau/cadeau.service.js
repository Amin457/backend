const conn = require("../../config/database");

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate = year + "-" + month + "-" + day;

module.exports = {

         getEtatJeux : (id_part,callBack) => {
          conn.query(`select etat_jeu from jeux_partenaire where id_part=?`,
          [id_part],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
        
                return callBack(null, results[0]);
              }
            );
          },
          
        getCadeauByIdPart: (id_part,callBack) => {
          conn.query(`select cadeau.id_cadeau,cadeau.description,cadeau.quantity,cadeau.id_jeu_part from cadeau,jeux_partenaire where cadeau.id_jeu_part=jeux_partenaire.id_jeu_part and jeux_partenaire.id_part=? and quantity>0 and etat=1`,
          [id_part],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
        
                return callBack(null, results);
              }
            );
          },
          insertRecompense: (data, callBack) => {
            conn.query('insert into recompense (id_client,id_cadeau) values(?,?)' ,
            [
                data.id_client,
                data.id_cadeau,           
          ]   ,
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
              }
            );
 
        
          },
          getRecompense: (id,id_part, callBack) => {
            conn.query(`select cadeau.description,partenaire.societe ,recompense.date  from cadeau,partenaire,recompense,jeux_partenaire
             where recompense.id_cadeau=cadeau.id_cadeau and recompense.id_client=?
              and cadeau.id_jeu_part=jeux_partenaire.id_jeu_part and jeux_partenaire.id_part=partenaire.id_part and jeux_partenaire.id_part=?`,
            [id,id_part],
                (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  }
          
                  return callBack(null, results);
                }
              );
            },

            updateEtatJeux: (etat,id_part,callBack) => {
              conn.query(
                `update jeux_partenaire set etat_jeu=? where id_part=?`,
                [
                  etat,
                 id_part
                ],
                (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  }
                  return callBack(null, results[0]);
                }
              );
              },
              deleteCadeau: (id_cadeau, callBack) => {
                conn.query(
                  `update cadeau set etat=0 where id_cadeau = ?`,
                  [id_cadeau],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                    return callBack(null, results);
                  }
                );
              },
            /*  modifierCadeau : (data, callBack) => {
                conn.query(
                  `update cadeau set description=?,quantity=? where id_cadeau = ?`,
                  [data.description,data.quantity,data.id_cadeau],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                    return callBack(null, results);
                  }
                );
              },*/

              ajouterCadeau : (data,id_jeu_part, callBack) => {

               conn.query('insert into cadeau (description,quantity,id_jeu_part) values(?,?,?)' ,
                [
                    data.description,
                    data.quantity,           
                    id_jeu_part
              ]   ,
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results);
                  }
                );
     
            
              },
              getGagnants: (id_part, callBack) => {
                conn.query(`select cadeau.description,recompense.date,client.Nom,client.Prenom,client.mail  from cadeau,partenaire,recompense,jeux_partenaire,client
                 where recompense.id_cadeau=cadeau.id_cadeau and recompense.id_client=client.id
                  and cadeau.id_jeu_part=jeux_partenaire.id_jeu_part and jeux_partenaire.id_part=partenaire.id_part and jeux_partenaire.id_part=?`,
                [id_part],
                    (error, results, fields) => {
                      if (error) {
                        callBack(error);
                      }
              
                      return callBack(null, results);
                    }
                  );
                }
}