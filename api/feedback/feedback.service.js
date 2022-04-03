const conn = require("../../config/database");

var datetime = new Date();
module.exports = {
      insertFeed: (data, callBack) => {
        conn.query('insert into feedback (id_part,id_client,Q1,Q2,Q3,Q4,Q5,date) values(?,?,?,?,?,?,?,?)' ,
        [
            data.id_part,
            data.id_client,
            data.Q1,
            data.Q2,
            data.Q3,
            data.Q4,
            data.Q5,
            datetime
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
          `update feedback set Q1=?, Q2=?, Q3=? , Q4=? , Q5=? , date= ? where id_part=? and id_client=?`,
          [
            data.Q1,
            data.Q2,
            data.Q3,
            data.Q4,
            data.Q5,
            datetime,
            data.id_part,
            data.id_client,
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getAllFeed: (id, callBack) => {
        conn.query(`select feedback.Q1,feedback.Q2,feedback.Q3,feedback.Q4,feedback.Q5,client.Nom from  feedback,client where id_part=? and feedback.id_client=client.id`,
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
 