//Mia
let express = require('express')
let app = express()
let bodyParser = require('body-parser') //permet de parser les donner envoyer par posts
let session = require("express-session") //permet d'appeler la session
const validator = require('express-validator');
const { body ,validationResult  } = require('express-validator');
const bcrypt = require("bcryptjs")//permet de hacher le mot de passe
const saltRounds = 10;

const { toLower, isEmpty } = require('lodash');
//nos middelware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({ // le middleware de session
    secret: "aaaaweeeeeeeeeee",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}))
const Cours = require("../models/cours.model.js");
const Chapitre = require("../models/chapitrre.model.js")
const Souschapitre = require("../models/souschapitre.model.js");
const Pdf = require("../models/pdf.model.js");
const Video = require("../models/videocours.model.js")
const Actue = require("../models/actualite.model.js")
exports.lescours  =  [
    (request, response,) => {
        Cours.rechercher((err, data) => {
          if (err)
             response.render('user/connection');
          else {
            response.render('user/cours', { cours: data}); 
            console.log(request.cookies.code)

          }
        });
      }
]
exports.lesactue  =  [
  (request, response,) => {
      Cours.rechercher((err, data) => {
        if (err)
           response.render('user/connection');
        else {
          response.render('user/index'); 
          console.log(data)

        }
      });
    }
]

var leschapitres = "";
var lessouschapitre = "";
var lespdf = "";
var lavideo = "";
var existe = "";
exports.chapitre  =  [
    (req, res) => {
        
        var lechapitre =   req.params.lechapitre;
        console.log(req.params.lechapitre);
        res.locals.cours = lechapitre;
        res.cookie('cours', lechapitre);
        Chapitre.rechercher(req.params.lechapitre ,(err, data) => {
          if (err)
             res.render('user/connection');
          else {
              
            leschapitres = data;

          }
        });
        Souschapitre.rechersouschap( (err, data) => {
            if (err)
               res.render('user/connection');
            else {
                lessouschapitre = data;
              //res.render('user/coursdetails', { chapitre: leschapitres, lessouschapitre: lessouschapitre }); 
            
            }
          });

          Pdf.rechpdf( (err, data) => {
            if (err)
               res.render('user/connection');
            else {
                lespdf = data;
              //res.render('user/coursdetails', { chapitre: leschapitres, lessouschapitre: lessouschapitre, lespdf: lespdf }); 
            
            }
          });

          Video.rechvideo( (err, data) => {
            if (err)
               res.render('user/connection');
            else {
                lavideo = data;
             // res.render('user/coursdetails', { chapitre: leschapitres, lessouschapitre: lessouschapitre, lespdf: lespdf, video: lavideo }); 
             
            }
          });
          existe = "Il existe";
          console.log(leschapitres[0]);
          res.locals.premierchap = leschapitres[0];
    if(leschapitres !== " " && lessouschapitre !== " " && lespdf !== " " && lavideo !== " "  ){
res.render('user/coursdetails', { chapitre: leschapitres, lessouschapitre: lessouschapitre, lespdf: lespdf, video: lavideo, existe: existe }); 
             
    }


      }
]

exports.souschap  =  [
  (req, res) => {
      
  var unsouschap = "";
  var unpdf = "";
  var unvideo = "";
  var unchapitre = "";
      var lecours =   req.params.lecours;
      res.locals.cours = lecours;
      var lechapitre =   req.params.lechap;
      var lesouschap =   req.params.souschap;
      console.log(req.params.souschap)
      Souschapitre.recherlessouschap(req.params.lecours ,(err, data) => {
        if (err)
           res.render('user/connection');
        else {
            
          unsouschap = data;
          console.log(unsouschap);

        }
      });
      
      Pdf.rechpdfsouschap(lecours, lechapitre, (err, data) => {
        if (err)
           res.render('user/connection');
        else {
            
          unpdf = data;
          console.log(unpdf);
        }
      });
      res.locals.pdff = unpdf.lepdf;
      
      Video.rechsousvideo(lecours, lechapitre, lesouschap, (err, data) => {
        if (err)
           res.render('user/connection');
        else {
            
          unvideo = data;
          console.log(unvideo);
        }
      });
     
  Chapitre.rechercher(lecours, (err, data) => {
        if (err)
           res.render('user/connection');
        else {
          unchapitre = data;
          console.log(unchapitre);
        }
      });  
      var existe = "";
      if(unsouschap !== " "  ){
        res.render('user/coursdetails', { chapitre: unchapitre, lessouschapitre: unsouschap, lespdf: unpdf, video: unvideo, existe: existe  }); 
      
        }


    }
]