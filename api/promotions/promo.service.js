const conn = require("../../config/database");
module.exports = {
  Create: (data) => {
    conn.query(
      'insert into promotion (id_part, description, nom, image, date_debut, date_fin) values(?,?,?,?,?,?)',
      [
        data.id_part,
        data.description,
        data.nom,
        data.image,
        data.dateDebut,
        data.dateFin,
      ],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        return results;
      }
    );
  },
  getAllPromos: callBack => {
    conn.query(
      `select * from promotion ORDER BY date_debut desc`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPromoByPart: (id, callBack) => {
    conn.query(
      `select * from promotion where id_part=?`,
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

