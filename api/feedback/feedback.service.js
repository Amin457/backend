const conn = require("../../config/database");


module.exports = {
      insertFeed: (data, callBack) => {
        conn.query('insert into feedback (id_part,id_client,Q1,Q2,Q3,Q4,Q5) values(?,?,?,?,?,?,?)' ,
        [
            data.id_part,
            data.id_client,
            data.Q1,
            data.Q2,
            data.Q3,
            data.Q4,
            data.Q5
      ]   ,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
          }
        );
      },
      updateFeed: (data, callBack) => {
        conn.query(
          `update feedback set Q1=?, Q2=?, Q3=? , Q4=? , Q5=? where id_part=? and id_client=?`,
          [
            data.Q1,
            data.Q2,
            data.Q3,
            data.Q4,
            data.Q5,
            data.id_part,
            data.id_client
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
 