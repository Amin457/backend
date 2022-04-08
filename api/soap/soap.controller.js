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
                const storeId = req.body.storeId;
                const dbId = req.body.dbId;
                
    
                var runner = require("child_process");
                var phpScriptPath = "phpScript/createCard.php";
                var argsString = clientId+","+storeId+","+dbId;
                runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
                    
                  if(err){
                    return res.status(500).json({
                        message : err.message
                   });
                  }else{
                 var data = JSON.parse(phpResponse).CreateLoyaltyCardResult;
                 return res.json({
                   data
                });}
                });},

                createClient:(req,res)=>{
                    const firstName = req.body.firstName;
                    const lastName = req.body.lastName;
                    const dbId = req.body.dbId;
                    const email = req.body.email;
                    
        
                    var runner = require("child_process");
                    var phpScriptPath = "phpScript/createClient.php";
                    var argsString = firstName+","+lastName+","+dbId;
                    runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
                        
                      if(err){
                        return res.status(500).json({
                            message : err.message
                       });
                      }else{
                     var data = JSON.parse(phpResponse).AddNewCustomerResult;
                     conn.query(
                        `update client set id2=? where mail=?`,
                        [data,email]);
                     return res.json({
                       data
                    });
                }
                    });},

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