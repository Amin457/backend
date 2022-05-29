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
      `select promotion.id_promo,promotion.image,promotion.nom,promotion.id_part,promotion.date_debut,promotion.date_fin,promotion.description from promotion,partenaire where promotion.id_part=partenaire.id_part and partenaire.etat=1 ORDER BY date_debut desc`,
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

