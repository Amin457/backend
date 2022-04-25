const path=require('path');
const uploadFile = require("./middleware");

/*push notification fire base
var FCM = require('fcm-node');
var serverKey = 'AAAAYuYj4EQ:APA91bFZw4D_nQW50_RJR1Wy0OPfZEvOhdyt4Qe0SaHD7YIn92UFf4UarjoDAo45V_4kqPszp07nMcNwXxTZU9gzbs8D51HqTHb-Qag_Mwx1f5OYAw8LGTR0OGu1JqaJr1cLUrdea2CO';
var fcm = new FCM(serverKey);

var message = {
to:'dS4HF3cSQ-ucVRJUt6KN4O:APA91bGlUA0Efb0eUj4kmLhYJbqxqudB4z-d0KML451Yixl0n0dqhqoapXCcKCr0gvA8R0xC1JEkt3619pft7BaYSAzghSL07A97IYFet0Wtd7PXulS4qhTap0ruixPGuuxnOkT5mc5',
    notification: {
        title: 'NotifcatioTestAPP',
        body: '{"Message from node js app"}',
    },

    data: { //you can send only notification or only data(or include both)
        title: 'ok cdfsdsdfsd',
        body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
    }

};
fcm.send(message, function(err, response) {
  if (err) {
      console.log("Something has gone wrong!"+err);
console.log("Respponse:! "+response);
  } else {
      // showToast("Successfully sent with response");
      console.log("Successfully sent with response: ", response);
  }

});

*/

const upload = async (req, res) => {
 
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getFile =(req,res)=>{
const imagename= req.params.name;
const directoryPath = path.join(process.cwd(), "/uploads/");
    return  res.sendFile(path.join( directoryPath + imagename));
}
module.exports = {
  upload,
  getFile
};