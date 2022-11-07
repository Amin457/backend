require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const carteRouter = require("./api/cartes/carte.router");
const partenaireRouter = require("./api/partenaires/partenaire.router");
const promoRouter = require("./api/promotions/promo.router");
const boutiqueRouter = require("./api/boutique/boutique.router");
const FeedbackRouter = require("./api/feedback/feedback.router");
const ReclamationRouter = require("./api/reclamations/reclamation.router");
const fileRouter = require("./api/files/file.router");
const cadeauRouter = require("./api/cadeau/cadeau.router");
const statRec = require("./api/statistique_reclamation/statRec.router");
const statFeed = require("./api/statistique_feedback/statFeed.router");
const notification = require("./api/notifications/notification.router");
const admin = require("./api/Admin/admin.router")



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
app.use("/api/boutique",boutiqueRouter);
app.use("/api/feedback",FeedbackRouter);
app.use("/api/reclamation",ReclamationRouter);
app.use("/api/files",fileRouter);
app.use("/api/cadeau",cadeauRouter);
app.use("/api/statRec",statRec);
app.use("/api/notification",notification);
app.use("/api/admin",admin);
app.use("/api/statFeed",statFeed);




app.listen(process.env.PORT,()=>{
    console.log("server runnig on Port :" ,process.env.PORT);
});

module.exports = app;