const mysql = require("mysql");
var conn = mysql.createConnection({
    port:3306,
    database:"digicard",
    host:"localhost",
    password:"",
    user:"root"
  });

conn.connect(function(err){
    if(err){
        throw err
    }
    console.log('connected !!');
});

module.exports = conn;