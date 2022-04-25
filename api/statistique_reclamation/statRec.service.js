const conn = require("../../config/database");
module.exports = {
      getNbQualite: (data, callBack) => {
        conn.query(
          `select count(*) as rec_accueil from reclamation,localisation where reclamation.sujet_rec='qualité' and reclamation.id_boutique=localisation.id and localisation.id_part =? and reclamation.date_rec>=? ;`,
          [data.id_part,data.date_rec],
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
          `select count(*) as rec_accueil from reclamation,localisation where reclamation.sujet_rec='accueil' and reclamation.id_boutique=localisation.id and localisation.id_part =? and reclamation.date_rec>=? ;`,
          [data.id_part,data.date_rec],
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
          `select count(*) as rec_accueil from reclamation,localisation where reclamation.sujet_rec='prix' and reclamation.id_boutique=localisation.id and localisation.id_part =? and reclamation.date_rec>=? ;`,
          [data.id_part,data.date_rec],
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
          `select count(*) as rec_accueil from reclamation,localisation where reclamation.sujet_rec='personel' and reclamation.id_boutique=localisation.id and localisation.id_part =? and reclamation.date_rec>=? ;`,
          [data.id_part,data.date_rec],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getNbRecParMoix : (data, callBack) => {
        conn.query(
          `SELECT loc.id_part,MONTH(DATE_FORMAT(rec.date_rec,'%Y/%m/%d')) as monthnb,MONTHNAME(DATE_FORMAT(rec.date_rec,'%Y/%m/%d')) as month,YEAR(DATE_FORMAT(rec.date_rec,'%Y/%m/%d')) as year,COUNT(*)as nbrTotal 
          from reclamation as rec,localisation as loc
          WHERE rec.date_rec>=? and rec.date_rec<= ? and rec.id_boutique=loc.id and loc.id_part=? 
          GROUP BY MONTH(DATE_FORMAT(rec.date_rec,'%Y/%m/%d'));`,
          [data.date_debut,data.date_fin,data.id_part],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getNbRecParBoutique  : (data, callBack) => {
        conn.query(
          `select loc.id_part,loc.boutique ,count(*) as rec_boutique
           from reclamation as rec,localisation as loc
           where rec.date_rec>=? and rec.date_rec<=? and rec.id_boutique=loc.id and loc.id_part=? group by loc.id;`,
          [data.date_debut,data.date_fin,data.id_part],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      }
   };