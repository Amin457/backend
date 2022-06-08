const conn = require("../../config/database");

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate = year + "-" + month + "-" + day;

module.exports = {

  getEtatJeux: (id_part, callBack) => {
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

  getCadeauByIdPart: (id_part, callBack) => {
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
    conn.query('insert into tour (id_client,id_cadeau) values(?,?)',
      [
        data.id_client,
        data.id_cadeau,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );


  },
  getRecompense: (id, id_part, callBack) => {
    conn.query(`select cadeau.description,partenaire.societe ,tour.date  from cadeau,partenaire,tour,jeux_partenaire
             where tour.id_cadeau=cadeau.id_cadeau and tour.id_client=?
              and cadeau.id_jeu_part=jeux_partenaire.id_jeu_part and jeux_partenaire.id_part=partenaire.id_part and jeux_partenaire.id_part=? and cadeau.description<>"perdu" ORDER BY tour.date desc `,
      [id, id_part],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  updateEtatJeux: (etat, id_part, callBack) => {
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
    ajouterCadeau: (data, id_jeu_part, callBack) => {

    conn.query('insert into cadeau (description,quantity,id_jeu_part) values(?,?,?)',
      [
        data.description,
        data.quantity,
        id_jeu_part
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );


  },
  getGagnants: (id_part, callBack) => {
    conn.query(`select cadeau.description,tour.date,client.Nom,client.Prenom,client.mail  from cadeau,partenaire,tour,jeux_partenaire,client
                 where tour.id_cadeau=cadeau.id_cadeau and tour.id_client=client.id
                  and cadeau.id_jeu_part=jeux_partenaire.id_jeu_part and jeux_partenaire.id_part=partenaire.id_part and cadeau.description<>"perdu" and  jeux_partenaire.id_part=?`,
      [id_part],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  statSemaineGagnants: (data, callBack) => {
    conn.query(
      `SELECT (DATE_FORMAT(tour.date,'%Y/%m/%d')) as nDay , DAYNAME(DATE_FORMAT(tour.date,'%Y/%m/%d')) as day,COUNT(*)as nbrTotal from cadeau,partenaire,tour,jeux_partenaire 
      WHERE tour.id_cadeau=cadeau.id_cadeau and cadeau.id_jeu_part=jeux_partenaire.id_jeu_part and jeux_partenaire.id_part=partenaire.id_part and cadeau.description<>"perdu" and jeux_partenaire.id_part=? and tour.date>=? and tour.date<=? 
      GROUP BY DAY(DATE_FORMAT(tour.date,'%Y/%m/%d'));`,
      [data.id_part, data.dateDebut, data.dateFin],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
}