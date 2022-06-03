const { insertFeed, updateFeed, getAllQuest, getAllRep, insertQuestion, insertReponse, getReponse, getFeed,deleteQuestion } = require("./feedback.service");
const conn = require("../../config/database");



module.exports = {
  createFeed: (req, res) => {
    const body = req.body;
    conn.query('select * from feedback where id_client=? and id_part=? and id_question=?', [body.id_client, body.id_part, body.id_question], (err, results, fields) => {
      if (results.length > 0) {
        console.log(results);

        updateFeed(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: 1,
            message: "updated successfully",
            results
          });
        });

      } else {

        insertFeed(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          console.log(results);
          return res.status(200).json({
            success: 1,
            message: "success",
            results
          });
        })
      };
    }
    );
  },
  getAllQuest: (req, res) => {
    const id_part = req.params.id_part;
    getAllQuest(id_part, (err, results) => {

      if (err) {
        console.log(err);
        return;
      }

      getAllRep(id_part, (err, results1) => {

        if (results.length > 0) {
          return res.json({
            question: results,
            reponse: results1
          });
        }
        return res.json({
          success: 0,
          message: "Record not Found"
        });

      });
    });
  },

  insertQuestion: (req, res) => {
    const body = req.body;
    conn.query('select * from question where description=? and id_part=?', [body.description, body.id_part], (err, results, fields) => {
      if (results.length > 0) {
        const id_question = results[0].id_question;
        return res.status(200).json({
          success: 0,
          message: "question déja existe",
          id_question
        });
      } else {
        insertQuestion(body, (err, results) => {
          const id_question = results[0].id_question;
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            message: "success",
            id_question
          });
        });
      }
    })
  },
  insertReponse: (req, res) => {
    const body = req.body;
    conn.query('select id_rep from reponse where reponse=?', [body.reponse], (err, results, fields) => {
      if (results.length > 0) {
        conn.query('insert into question_reponse (id_question,id_rep) values(?,?)', [body.id_question, results[0].id_rep], (err, results, fields) => {
          return res.status(200).json({
            success: 0,
            message: "success",
          });
        })

      } else {
        insertReponse(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            message: "success",
          });
        });
      }
    })
  },
  getReponse: (req, res) => {
    const id_question = req.params.id_question;
    getReponse(id_question, (err, results) => {
      return res.json({
        success: 1,
        data: results
      });

    });
  },
  getFeed: (req, res) => {
    const id_part = req.params.id_part;
    getFeed(id_part, (err, results) => {
      return res.json({
        success: 1,
        data: results
      });

    });
  },
  deleteQuestion: (req, res) => {
    const id_question = req.params.id_question;
    deleteQuestion(id_question, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1
      });
    });

  }
}


