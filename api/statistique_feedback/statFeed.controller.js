const { nbrFeedback, Question, nbrRep } = require("./statFeed.service");

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
  Question: (req, res) => {
    const data = req.body;

    Question(data, (err, results) => {

      if (err) {
        console.log(err);
        return;
      }

      if (results.length > 0) {
        return res.json({
          question: results
        });
      }
      return res.json({
        success: 0,
        message: "Record not Found"
      });


    });
  },
  nbrRep: (req, res) => {
    const data = req.body;

    nbrRep(data, (err, results) => {

      if (err) {
        console.log(err);
        return;
      }

      if (results.length > 0) {
        return res.json({
          chart: results
        });
      }
      return res.json({
        success: 0,
        message: "Record not Found"
      });

    });
  }
}
