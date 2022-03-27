const conn = require("../../config/database");


module.exports = {
      getAllCartes: (id, callBack) => {
        conn.query(`select carte.id_carte,carte.num_carte,carte.boutique,carte.note,carte.id_part,carte.id_client , partenaire.img from  carte,partenaire where id_client=? and carte.id_part=partenaire.id_part`,
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