const { getAllCartes, getCarteById, deleteCarte, getInactive } = require("./carte.service");
const conn = require("../../config/database");
module.exports = {
  getAllCartes: (req, res) => {
    const id = req.params.id;
    getAllCartes(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          success: 1,
          data: results
        });
      }
      return res.json({
        success: 0,
        message: "vous n'avez auncun carte fidélité"
      });
    });
  },
  getInactive: (req, res) => {
    const id = req.params.id;
    getInactive(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          success: 1,
          data: results
        });
      }
      return res.json({
        success: 0,
        message: "aucun"
      });
    });
  }
  ,
  getCarteById: (req, res) => {
    const id_client = req.params.id_client;
    const id_carte = req.params.id_carte;
    getCarteById(id_client, id_carte, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          success: 1,
          data: results
        });
      }
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    });
  },
  deleteCarte: (req, res) => {
    const id = req.params.id;
    const etat = req.params.etat;

    deleteCarte(id, etat, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "carte deleted successfully"
      });
    });
  },
  /////cegid
  GetLoyaltyCard: (req, res) => {

    const cardId = req.body.cardId;
    const dbId = req.body.dbId;
    const id = req.body.id;
    const id_part = req.body.id_part;
    const StoreId = req.body.StoreId;


    var runner = require("child_process");
    var phpScriptPath = "api/cartes/GetLoyaltyCard.php";

    var argsString = cardId + "," + dbId;
    runner.exec("php " + phpScriptPath + " " + argsString, function (err, phpResponse, stderr) {
      if (err) {
        return res.status(500).json({
          message: "Impossible de trouver la carte " + cardId
        });
      } else {
        var data = JSON.parse(phpResponse).GetLoyaltyCardResult;
        if (data.StoreId == StoreId) {
          conn.query('select * from carte where num_carte=?', [data.Id], (err, results, fields) => {
            if (results.length == 0) {
              conn.query(
                `INSERT INTO carte (num_carte,id_part,id_client)
              VALUES (?,?,?);`,
                [data.Id, id_part, id]);

              return res.json({
                message: "Carte ajoutée avec succès",
                data
              })

            } else {

              return res.json({
                message: "Carte déjà existée",
                data
              })

            }
          });
        } else {
          return res.json({
            message: "Cette carte n'appartienne pas à ce partenaire",
          })
        }

        ;
      }
    });
  },
  createClient: (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dbId = req.body.dbId;
    const id_part = req.body.id_part;
    const id_client = req.body.id_client;
    const email = req.body.mail;
    const storeId = req.body.storeId;
    const CustomerId = req.body.CustomerId;
    const BirthDateDay = req.body.BirthDateDay;
    const BirthDateMonth = req.body.BirthDateMonth;
    const BirthDateYear = req.body.BirthDateYear;



    var runner = require("child_process");
    var phpScriptPath = "api/cartes/createClient.php";

    var argsString = firstName + "," + lastName + "," + email + "," + storeId + "," + BirthDateDay + "," + BirthDateMonth + "," + BirthDateYear + "," + CustomerId + "," + dbId;


    conn.query('select * from carte where id_client=? and id_part=?', [id_client, id_part], (err, results, fields) => {
      if (results.length == 0) {

        runner.exec("php " + phpScriptPath + " " + argsString, function (err, phpResponse, stderr) {

          if (err) {
            console.log(err);
            return res.status(500).json({
              message: err.message
            });
          } else {
            var data = JSON.parse(phpResponse).AddNewCustomerResult;
            console.log(data);

            var runner = require("child_process");
            var phpScriptPath = "api/cartes/createCard.php";
            var argsString = data + "," + storeId + "," + dbId;


            runner.exec("php " + phpScriptPath + " " + argsString, function (err, phpResponse, stderr) {

              if (err) {
                return res.status(500).json({
                  message: err.message
                });
              }
              var data1 = JSON.parse(phpResponse).CreateLoyaltyCardResult;
              conn.query(
                `INSERT INTO carte (id_client,id_part,client_ref,num_carte) VALUES (?,?,?,?);`,
                [id_client, id_part, data, data1]);
            });
            return res.json({
              message: "Carte crée avec succès",

            });

          }
        });

      } else {
        var data = results[0].client_ref;

        return res.json({
          message: "Vous avez déja une carte avec ce partenaire",
          data
        })

      }
    });



  },

  GetPoints: (req, res) => {
    const cardId = req.body.cardId;
    const dbId = req.body.dbId;

    var runner = require("child_process");
    var phpScriptPath = "api/cartes/getLoyaltyPoints.php";

    var argsString = cardId + "," + dbId;
    runner.exec("php " + phpScriptPath + " " + argsString, function (err, phpResponse, stderr) {
      if (err) {
        return res.status(500).json({
          message: "impossible de trouver la carte " + cardId
        });
      } else {
        var data = JSON.parse(phpResponse).GetAvailableLoyaltyPointsResult;
        return res.status(200).json({
          data
        });
      }
    });
  },

}