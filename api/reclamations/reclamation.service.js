const conn = require("../../config/database");

var datetime = new Date();
module.exports = {
  insertRec: (data, callBack) => {
    conn.query('insert into reclamation (id_boutique,id_client,sujet_rec,description,date_rec) values(?,?,?,?,?)',
      [
        data.id_boutique,
        data.id_client,
        data.sujet_rec,
        data.description,
        datetime
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getAllRec: (id, callBack) => {
    conn.query(`select DISTINCT reclamation.sujet_rec,reclamation.description,client.Nom,client.Prenom,client.mail,boutique.boutique from  reclamation,client,boutique,partenaire where reclamation.id_boutique=boutique.id and boutique.id_part=? and reclamation.id_client=client.id`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  }

};
