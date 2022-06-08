const conn = require("../../config/database");
module.exports = {
    nbrFeedback: (data, callBack) => {
        conn.query(
          `SELECT count(DISTINCT id_client) as nbrTotale FROM feedback WHERE id_part=? and feedback.date>=? and feedback.date<=?;`,
          [data.id_part, data.dateDebut, data.dateFin],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      Question: (data, callBack) => {
        conn.query(
          `SELECT feedback.id_question , question.description , COUNT(feedback.id_rep) as nbr from question,feedback where feedback.id_question=question.id_question and feedback.id_part=? and feedback.date>=? and feedback.date<=? group by id_question;`,
          [data.id_part, data.dateDebut, data.dateFin],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      nbrRep: (data, callBack) => {
        conn.query(
          `SELECT reponse.reponse, feedback.id_rep , COUNT(feedback.id_rep) as nbr FROM feedback,reponse WHERE feedback.id_rep=reponse.id_rep and id_question=? and feedback.id_part=? and feedback.date>=? and feedback.date<=? GROUP by id_rep;`,
          [data.id_question ,data.id_part, data.dateDebut, data.dateFin],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      statSemaine: (data, callBack) => {
        conn.query(
          `SELECT (DATE_FORMAT(feed.date,'%Y/%m/%d')) as nDay , DAYNAME(DATE_FORMAT(feed.date,'%Y/%m/%d')) as day,COUNT(*)as nbrTotal from feedback as feed
           WHERE feed.id_part=? and feed.date>=? and feed.date<=? GROUP BY DAY(DATE_FORMAT(feed.date,'%Y/%m/%d'));`,
          [data.id_part, data.dateDebut, data.dateFin],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getNbFeedParMoix : (data, callBack) => {
        conn.query(
          `SELECT MONTH(DATE_FORMAT(feed.date,'%Y/%m/%d')) as monthnb,MONTHNAME(DATE_FORMAT(feed.date,'%Y/%m/%d')) as month,YEAR(DATE_FORMAT(feed.date,'%Y/%m/%d')) as year,COUNT(*)as nbrTotal from feedback as feed
           WHERE feed.id_part=? and feed.date>=? and feed.date<=? GROUP BY MONTH(DATE_FORMAT(feed.date,'%Y/%m/%d')),YEAR(DATE_FORMAT(feed.date,'%Y/%m/%d')) order by DATE_FORMAT(feed.date,'%Y/%m/%d');`,
          [data.id_part, data.dateDebut, data.dateFin],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      }
   };