const conn = require("../../config/database");
module.exports = {
  Create: (data) => {
    conn.query(
      'insert into promotion (id_part, url, nom, image, date_debut, date_fin) values(?,?,?,?,?,?)',
      [
        data.id_part,
        data.url,
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
      `select promotion.id_promo,promotion.image,promotion.nom,promotion.id_part,promotion.date_debut,promotion.date_fin,promotion.url from promotion,partenaire where promotion.id_part=partenaire.id_part and partenaire.etat=1 ORDER BY date_debut desc`,
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
  },
  deletepromo: (id, callBack) => {
    conn.query(
      'DELETE FROM promotion WHERE id_promo=?',
      [
        id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPromoById: (id, callBack) => {
    conn.query(
      `select * from promotion where id_promo=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updatePromo: (data, callBack) => {
    conn.query(
      `update promotion set url=?,nom=? ,image=?, date_Debut=?,date_fin=? where id_promo=? and id_part=?`,
      [
        data.url,
        data.nom,
        data.image,
        data.dateDebut,
        data.dateFin,
        data.id_promo,
        data.id_part
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }

};
