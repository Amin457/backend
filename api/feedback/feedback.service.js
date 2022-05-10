const conn = require("../../config/database");

var datetime = new Date();
module.exports = {
      insertFeed: (data, callBack) => {
        conn.query('insert into feedback (id_part,id_client,id_question,id_rep,date) values(?,?,?,?,?)' ,
        [
            data.id_part,
            data.id_client,
            data.id_question,
            data.id_rep,
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
          `update feedback set id_rep=? , date= ? where id_part=? and id_client=? and id_question=?`,
          [
            data.id_rep,
            datetime,
            data.id_part,
            data.id_client,
            data.id_question
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getAllQuest: (id_part,callBack) => {
        conn.query(`select distinct question.description , question.id_question from question,reponse where question.id_question=reponse.id_question and question.id_part=?;`,
        [id_part],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
        return callBack(null,results);

              
            }
          );
        } ,
        getAllRep: (id_part,callBack) => {
          conn.query(`select reponse.reponse , reponse.id_rep, question.id_question from reponse,question where reponse.id_question=question.id_question and question.id_part=?;`,
          [id_part],
              (error, results1, fields) => {
                if (error) {
                  callBack(error);
                }
               
              
  
                  return callBack(null,results1);
      });
                
              }
             
      
    };
 