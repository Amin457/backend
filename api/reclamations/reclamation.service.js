const conn = require("../../config/database");


module.exports = {
      insertRec: (data, callBack) => {
        conn.query('insert into reclamation (id_boutique,id_client,sujet_rec,description) values(?,?,?,?)' ,
        [
            data.id_boutique,
            data.id_client,           
            data.sujet_rec,
            data.description
      ]   ,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
          }
        );
      },
      getAllRec: (id, callBack) => {
        conn.query(`select DISTINCT reclamation.sujet_rec,reclamation.description,client.Nom,client.Prenom,client.mail,localisation.boutique from  reclamation,client,localisation,partenaire where reclamation.id_boutique=localisation.id and localisation.id_part=? and reclamation.id_client=client.id`,
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
 