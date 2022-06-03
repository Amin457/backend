const conn = require("../../config/database");


module.exports = {
  getInactive: (id, callBack) => {
    conn.query(`select carte.id_carte,carte.num_carte,partenaire.societe,carte.etat,carte.id_part,carte.id_client , partenaire.img from  carte,partenaire where id_client=? and carte.id_part=partenaire.id_part and partenaire.etat=1 and carte.etat=0`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  }
  ,

  getAllCartes: (id, callBack) => {
    conn.query(`select carte.id_carte,carte.num_carte,partenaire.societe,carte.etat,carte.id_part,carte.id_client , partenaire.img from  carte,partenaire where id_client=? and carte.id_part=partenaire.id_part and partenaire.etat=1 and carte.etat=1`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getCarteById: (id_client, id_carte, callBack) => {
    conn.query(`select carte.id_carte,carte.num_carte,carte.etat,carte.id_part,carte.id_client from carte,partenaire where id_client=? and id_carte=? and carte.id_part=partenaire.id_part and partenaire.etat=1 and carte.etat=1`,
      [id_client, id_carte],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  deleteCarte: (id, etat, callBack) => {
    if (etat == 1) {
      conn.query(
        `update carte set etat=0 where id_carte = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    } else {

      conn.query(
        `update carte set etat=1 where id_carte = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );

    }
  }
}