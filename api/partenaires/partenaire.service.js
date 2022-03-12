const conn = require("../../config/database");


module.exports = {
    insertConfig: (data, callBack) => {
      conn.query('insert into config(id_dataBase,AdresseIP,environnement,id_part) values(?,?,?,?)' ,
            [
                data.id_dataBase,
                data.AdresseIP,
                data.environnement,
                data.id_part
          ]   ,
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }

            return callBack(null, results);
          }
        );
      },
      getPartenaires: callBack => {
        conn.query(
          `select * from partenaire`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
    };
 