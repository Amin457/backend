const conn = require("../../config/database");

//push notification fire base
var FCM = require('fcm-node');

const notification = async (req, res) => {

var serverKey = 'AAAAYuYj4EQ:APA91bFZw4D_nQW50_RJR1Wy0OPfZEvOhdyt4Qe0SaHD7YIn92UFf4UarjoDAo45V_4kqPszp07nMcNwXxTZU9gzbs8D51HqTHb-Qag_Mwx1f5OYAw8LGTR0OGu1JqaJr1cLUrdea2CO';
conn.query(
  `select DISTINCT token from notification`,(error, results, fields) => {
   if(results.length>0){ 
    for (var i = 0; i < results.length ; i++) {
      
   
    var fcm = new FCM(serverKey);
    var message = {
      to:results[i].token,
          notification: {
              title: req.body.title,
              body: req.body.body,
          },
      
        /*  data: {
              title: 'ok',
              body: 'test'
          }*/
      
      };
      
      fcm.send(message, function(err, response) {
          if (err) {
              console.log("Something has gone wrong!"+err);
        console.log("Respponse:! "+response);
          } else {
              // showToast("Successfully sent with response");
              console.log("Successfully sent with response: ", response);
              return res.json({
                success: 1,
                message: 'notification envoyer avec success',
              });
          }
      
      });
    }//end boucle for
  }else{

    return res.json({
      success: 0,
      message: 'no device ',
    });

  }
  }
);
}
module.exports = {
    notification
  };