const conn = require("../../config/database");


module.exports = {
      getAllCartes: (id, callBack) => {
        conn.query(`select * from carte where id_client=?`,
        [id],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
      
              return callBack(null, results);
            }
          );
        },
        getCarteById: (id_client,id_carte,callBack) => {
          conn.query(`select * from carte where id_client=? and id_carte=?`,
          [id_client,id_carte],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
        
                return callBack(null, results);
              }
            );
          }
}