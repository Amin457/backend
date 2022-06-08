const conn = require("../../config/database");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate = year + "-" + month + "-" + day;
//push notification fire base
var FCM = require('fcm-node');

const notification = async (req, res) => {

  var serverKey = 'AAAAYuYj4EQ:APA91bFZw4D_nQW50_RJR1Wy0OPfZEvOhdyt4Qe0SaHD7YIn92UFf4UarjoDAo45V_4kqPszp07nMcNwXxTZU9gzbs8D51HqTHb-Qag_Mwx1f5OYAw8LGTR0OGu1JqaJr1cLUrdea2CO';
  conn.query(
    `select DISTINCT token from device`, (error, results, fields) => {
      if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {


          var fcm = new FCM(serverKey);
          var message = {
            to: results[i].token,
            notification: {
              title: req.body.title,
              body: req.body.body,
            },

            /*  data: {
                  title: 'ok',
                  body: 'test'
              }*/

          };

          fcm.send(message, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!" + err);
              console.log("Respponse:! " + response);
            } else {
              // showToast("Successfully sent with response");
              console.log("Successfully sent with response: ", response);
              console.log("hhhhhhhhhhhhhhhhhhhh", message);


            }

          });
        }//end boucle for
        conn.query(
          `select id from client`, (error, results, fields) => {
            if (results.length > 0) {
              for (var i = 0; i < results.length; i++) {

                conn.query('insert into detail_notification(title,body,date,id_client) values(?,?,?,?)',
                  [
                    message.notification.title,
                    message.notification.body,
                    newdate,
                    results[i].id
                  ]
                );
              }
            }
          });

        return res.json({
          success: 1,
          message: 'notification envoyer avec success',
        });

      } else {

        return res.json({
          success: 0,
          message: 'no device ',
        });

      }
    }
  );
}
const getNbr = async (req, res) => {

  conn.query(
    `select count(*) as nbr from detail_notification where vue=0 and id_client=?`,
    [
      req.params.id_client
    ], (error, results, fields) => {

      if (results.length > 0) {
        return res.json({
          success: 1,
          data: results[0]
        });

      } else {

        return res.json({
          success: 0,
          data: results[0],
        });

      }
    }
  );
};
const getAllNotif = async (req, res) => {

  conn.query(
    `select * from detail_notification where id_client=? ORDER BY date desc`, [req.params.id_client], (error, results, fields) => {
      if (results.length > 0) {
        return res.json({
          success: 1,
          data: results
        });

      } else {

        return res.json({
          success: 0,
          message: "aucune notification",
        });

      }
    }
  );
  conn.query(
    `update detail_notification set vue=1 where id_client=?`,
    [
      req.params.id_client
    ],
    (error, results, fields) => {
      console.log(results);
    }
  );
}
module.exports = {
  getAllNotif,
  notification,
  getNbr
};