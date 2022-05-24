const {nbrFeedback,Reponse,Question} = require("./statFeed.service");

module.exports = {
nbrFeedback: (req, res) => {
    const body = req.body;
  nbrFeedback(body, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      data: results
    });
  });
},
statReponse: (req, res) => {
  const data = req.body;

    Question(data, (err, results) => {
  
      if (err) {
        console.log(err);
        return;
      }
      
    Reponse(data, (err, results1) => {
  
      if (results.length >0) {
        return res.json({
          question : results,
          reponse : results1
        });
      }
        return res.json({
          success: 0,
          message: "Record not Found"
      });
    
    });
    });
  }
}
