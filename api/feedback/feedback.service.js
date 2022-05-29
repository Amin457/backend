const conn = require("../../config/database");

var datetime = new Date();
module.exports = {
  insertFeed: (data, callBack) => {
    conn.query('insert into feedback (id_part,id_client,id_question,id_rep,date) values(?,?,?,?,?)',
      [
        data.id_part,
        data.id_client,
        data.id_question,
        data.id_rep,
        datetime
      ],
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
  /* getAllQuest: (id_part,callBack) => {
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
              
            },*/
  getAllRep: (id_part, callBack) => {
    conn.query(`select reponse.reponse , reponse.id_rep, question_reponse.id_question from reponse,question,question_reponse where question.id_question=question_reponse.id_question and question_reponse.id_rep=reponse.id_rep and question.id_part=?;`,
      [id_part],
      (error, results1, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results1);
      });

  },
  getAllQuest: (id_part, callBack) => {
    conn.query(`select distinct question.description , question.id_question from question,reponse,question_reponse where question.id_question=question_reponse.id_question and question.id_part=? ORDER BY id_question DESC;;`,
      [id_part],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);


      }
    );
  },
  insertQuestion: (data, callBack) => {
    conn.query('insert into question (id_part,description) values(?,?)',
      [
        data.id_part,
        data.description
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        conn.query('select id_question from question where  id_part=? and description=?', [data.id_part, data.description], (err, results, fields) => {

          return callBack(null, results);
        })
      }
    );
  },

  ///inserer une reponse a la base
  insertReponse: (data, callBack) => {
    conn.query('insert into reponse (reponse) values(?)',
      [
        data.reponse],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        conn.query('select id_rep from reponse where reponse=?', [data.reponse], (err, results, fields) => {
          conn.query('insert into question_reponse (id_question,id_rep) values(?,?)', [data.id_question, results[0].id_rep], (err, results, fields) => {
          })
          return callBack(null, results);
        })
      }
    );
  },
  getReponse: (id_question, callBack) => {
    conn.query(`select question_reponse.id_question , reponse.reponse  from reponse,question_reponse where reponse.id_rep=question_reponse.id_rep and question_reponse.id_question=?`,
      [id_question],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      });

  },
  getFeed: (id_part, callBack) => {
    conn.query(`select client.Nom , client.Prenom ,question.description,reponse.reponse  from client,reponse,question,feedback where feedback.id_rep=reponse.id_rep and feedback.id_client=client.id and feedback.id_question=question.id_question and feedback.id_part=?`,
      [id_part],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      });

  }

};
