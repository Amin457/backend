const conn = require("../../config/database");


module.exports = {
  getAllCartes: (id, callBack) => {
    conn.query(`select carte.id_carte,carte.num_carte,partenaire.societe,carte.note,carte.id_part,carte.id_client , partenaire.img from  carte,partenaire where id_client=? and carte.id_part=partenaire.id_part and partenaire.etat=1`,
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
    conn.query(`select carte.id_carte,carte.num_carte,carte.note,carte.id_part,carte.id_client from carte,partenaire where id_client=? and id_carte=? and carte.id_part=partenaire.id_part and partenaire.etat=1`,
      [id_client, id_carte],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  }
}