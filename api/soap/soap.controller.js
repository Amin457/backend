const conn = require("../../config/database");

    module.exports = {
        GetLoyaltyCard:(req,res)=>{
            
            const cardId = req.body.cardId;
            const dbId = req.body.dbId;
            const id = req.body.id;
            const id_part = req.body.id_part;
            const StoreId = req.body.StoreId;


            var runner = require("child_process");
            var phpScriptPath = "phpScript/GetLoyaltyCard.php";
            var argsString = cardId+","+dbId;
            runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
              if(err){
                  console.log(err);
                    return res.status(500).json({
                    message : "impossible de trouver la carte "+cardId
               });
              }else{
             var data = JSON.parse(phpResponse).GetLoyaltyCardResult;
             if(data.StoreId==StoreId){
             conn.query('select * from carte where num_carte=?' ,[data.Id] ,(err, results, fields) => {
              if (results.length==0) {
              conn.query(
              `INSERT INTO carte (num_carte,id_part,id_client)
              VALUES (?,?,?);`,
              [data.Id,id_part,id]);

              return res.json({
                message:"carte ajouté avec succée",
                data
             })

              }else{

                return res.json({
                  message:"carte déja existe",
                  data
               })

             }});}else{
              return res.json({
                message:"cette carte n'appartient a cette boutique",
             })
             }
             
            ;}
            });},

            createCard:(req,res)=>{
                const clientId = req.body.clientId;
                const client_ref = req.body.client_ref;
                const storeId = req.body.storeId;
                const dbId = req.body.dbId;
                const id_part = req.body.id_part;
    
                var runner = require("child_process");
                var phpScriptPath = "phpScript/createCard.php";
                var argsString = client_ref+","+storeId+","+dbId;

                conn.query('select * from carte where id_client=? and id_part=?',[clientId,id_part] ,(err, results, fields) => {
                  if (results.length==0) {
                runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
                    
                  if(err){
                    return res.status(500).json({
                        message : err.message
                   });
                  }else{
                 var data = JSON.parse(phpResponse).CreateLoyaltyCardResult;
                 conn.query(
                  `INSERT INTO carte (num_carte,id_part,id_client)
                  VALUES (?,?,?);`,
                  [data,id_part,clientId]);
                 return res.json({
                   data,
                   message:"carte créer avec succées",

                });}
                });}else{
                  return  res.json({
                    message:"vous avez déja une carte avec cette boutique",
                 })
                }
              


              })
              
              },

                createClient:(req,res)=>{
                    const firstName = req.body.firstName;
                    const lastName = req.body.lastName;
                    const dbId = req.body.dbId;
                    const id_part = req.body.id_part;
                    const id_client = req.body.id_client;
                    
        
                    var runner = require("child_process");
                    var phpScriptPath = "phpScript/createClient.php";
                    var argsString = firstName+","+lastName+","+dbId;


                    conn.query('select * from clientele where id_client=? and id_part=?',[id_client,id_part] ,(err, results, fields) => {
                      if (results.length==0) {

                        runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
                          var data = JSON.parse(phpResponse).AddNewCustomerResult;
                          console.log(data)
                          if(err){
                            return res.status(500).json({
                                message : err.message
                           });
                          }else{
                         conn.query(
                          `INSERT INTO clientele (id_client,id_part,client_ref)
                          VALUES (?,?,?);`,
                          [id_client,id_part,data]);
                         return res.json({
                          message:"client ajouté avec succes",
                           data
                        });
                    }
                        });
     
                      }else{
                        var data = results[0].client_ref;

                        return res.json({
                          message:"client déja existe",
                          data
                       })
        
                     }});



                    },

                    GetPoints:(req,res)=>{
                        const cardId = req.body.cardId;
                        const dbId = req.body.dbId;
            
                        var runner = require("child_process");
                        var phpScriptPath = "phpScript/getLoyaltyPoints.php";
                        var argsString = cardId+","+dbId;
                        runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
                          if(err){
                            return res.status(500).json({
                             message : "impossible de trouver la carte "+cardId
                           });
                          }else{
                         var data = JSON.parse(phpResponse).GetAvailableLoyaltyPointsResult;
                         return res.json({
                           data
                        });}
                        });}


      }