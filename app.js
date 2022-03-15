require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const carteRouter = require("./api/cartes/carte.router");
const partenaireRouter = require("./api/partenaires/partenaire.router");
const promoRouter = require("./api/promotions/promo.router");
const localisationRouter = require("./api/localisations/localisation.router");

const session = require('express-session');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json());


app.use("/api/users", userRouter);
app.use("/api/partenaires", partenaireRouter);
app.use("/api/cartes", carteRouter);
app.use("/api/promotions", promoRouter);
app.use("/api/localisations",localisationRouter);





/*
'use strict'

const soap = require('soap')
const wsdlUrl = 'http://www.chemspider.com/MassSpecAPI.asmx?WSDL'

soap.createClientAsync(wsdlUrl, {overridePromiseSuffix: 'Promise'})
  .then(client => {
    client.GetDatabasesPromise({})
      .then(results => {
        const databases = results[0].GetDatabasesResult.string
        console.dir(databases)
      })
  })*/







app.listen(3000,()=>{
    console.log("server runnig on Port :" ,3000);
});
