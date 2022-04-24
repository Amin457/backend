const conn = require("../../config/database");
module.exports = {
      getNbQualite: (data, callBack) => {
        conn.query(
          `select count(*) as rec_accueil from reclamation,localisation where reclamation.sujet_rec='qualité' and reclamation.id_boutique=localisation.id and localisation.id_part =? and reclamation.date>=? ;`,
          [data.id_part,data.date],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getNbAccueil: (data, callBack) => {
        conn.query(
          `select count(*) as rec_accueil from reclamation,localisation where reclamation.sujet_rec='accueil' and reclamation.id_boutique=localisation.id and localisation.id_part =? and reclamation.date>=? ;`,
          [data.id_part,data.date],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getNbPrix: (data, callBack) => {
        conn.query(
          `select count(*) as rec_accueil from reclamation,localisation where reclamation.sujet_rec='prix' and reclamation.id_boutique=localisation.id and localisation.id_part =? and reclamation.date>=? ;`,
          [data.id_part,data.date],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getNbPersonel: (data, callBack) => {
        conn.query(
          `select count(*) as rec_accueil from reclamation,localisation where reclamation.sujet_rec='personel' and reclamation.id_boutique=localisation.id and localisation.id_part =? and reclamation.date>=? ;`,
          [data.id_part,data.date],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      }
   };