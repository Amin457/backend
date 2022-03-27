const conn = require("../../config/database");


module.exports = {
      insertRec: (data, callBack) => {
        conn.query('insert into reclamation (id_part,id_client,sujet_rec,description) values(?,?,?,?)' ,
        [
            data.id_part,
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
      }};
 