require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const carteRouter = require("./api/cartes/carte.router");
const partenaireRouter = require("./api/partenaires/partenaire.router");
const promoRouter = require("./api/promotions/promo.router");
const localisationRouter = require("./api/localisations/localisation.router");
const FeedbackRouter = require("./api/feedback/feedback.router");
const ReclamationRouter = require("./api/reclamations/reclamation.router");
const fileRouter = require("./api/files/file.router");
const soapRouter = require("./api/soap/soap.router");
const cadeauRouter = require("./api/cadeau/cadeau.router");
const statRec = require("./api/statistique_reclamation/statRec.router");
const notification = require("./api/notifications/notification.router")


const session = require('express-session');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json());


app.use("/api/users", userRouter);
app.use("/api/partenaires", partenaireRouter);
app.use("/api/cartes", carteRouter);
app.use("/api/promotions", promoRouter);
app.use("/api/localisations",localisationRouter);
app.use("/api/feedback",FeedbackRouter);
app.use("/api/reclamation",ReclamationRouter);
app.use("/api/files",fileRouter);
app.use("/api/soap",soapRouter);
app.use("/api/cadeau",cadeauRouter);
app.use("/api/statRec",statRec);
app.use("/api/notification",notification);



app.listen(3000,()=>{
    console.log("server runnig on Port :" ,3000);
});
