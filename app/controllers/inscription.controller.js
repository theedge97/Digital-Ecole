const Customer = require("../models/inscription.models.js");
const Profsinscrit = require("../models/profsliste.model.js")
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
const { res, req } = require('express');
//nos middelware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({ // le middleware de session
    secret: "aaaaweeeeeeeeeee",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}))

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    nom: "Cisse",
    prenom: "Djeneba",
    matricule: 20210703
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });}
    else{ 
        res.render('user/apropos');
}
  });
};

exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.redirect("/");
    });
  };
  //selectionner un seul element dont le matricule est 
  
exports.findOne = (req, res) => {
    Customer.findById(20210702, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
          });
        }
      } else res.redirect("/cours");
    });
  };
 
  exports.creer =  [
    /*
ce middelware permet de creer un compte
    */
   // verifie si le matricule est un nombre.
   body('nom').isLength({ min: 3}).withMessage('Veuilez bien saisir un nom long').trim(),
   body('prenom').isLength({ min: 3}).withMessage('Veuilez bien saisir un prenom long').trim(),
   body('matricule').isNumeric().withMessage('Veuilez bien saisir un nombre').trim(),
   body('matricule').isLength({ min: 8, max:8}).withMessage('Veuilez bien saisir un matricule de 8 caractere').trim(),
   body('telephone').isNumeric().withMessage('Veuilez bien saisir un nombre').trim(),
   body('telephone').matches(/^6[1,2,5,6]{1}[0-9]{7}$/).withMessage('Veuilez bien saisir un numero valide').trim(),
   body('motsdepasse', 'Veuillez saisir un mot de passe de plus de quatre caractere').isLength({ min: 4 }).trim(),
   body('motsdepasse').custom((value, { req }) => {
    if (value !== req.body.motsdepasse1) {
      throw new Error('les mots de passe ne sont pas identique');
    }
    
    // Indicates the success of this synchronous custom validator
    return true;
  }),
   body('profsde', 'veuillez choisir la matiere enseigner ').trim().isLength({ min: 1 }),
   (req, res, next) => {

     // Extract the validation errors from a request.
     const errors = validator.validationResult(req);
     //les erreurs 
     var erreurauth = []
     var nomerreur = '';
     var matriculerreur = '';
     // Create a genre object with escaped and trimmed data
     if (!errors.isEmpty()) {
       // There are errors. Render the form again with sanitized values/error messages.
       var erreur = errors.array();
       res.render('user/inscription', { erreur: erreur});
       
       return;
     }
     else {
        var nom = req.body.nom;
        var nom = nom.toUpperCase();
        var prenom = req.body.prenom;
        var prenom = prenom.toLowerCase(); 
        var matricule = req.body.matricule
        var matricule = parseInt(matricule)
        Customer.findMatricule(req.body.matricule, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Customer with id ${req.params.customerId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error retrieving Customer with id " + req.params.customerId
                });
              }
            } else {
                console.log(data);
                console.log(data.matricule);
               
                if ( data.nom == nom && data.prenom == prenom && data.matricule == matricule) {
                    nomerreur = "votre nom est correcte";
                    erreurauth.push(nomerreur)

               } 
               if (isEmpty(erreurauth)) { //si les nom ou matricule ne correspond pas on envoie une erreur de non correspondance
                res.render('user/inscription', {authentifierreur: "veuillez bien saisir les informations"});
            

               }else{
                bcrypt.hash(req.body.motsdepasse, 10, (err, hash) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                    console.log(hash);

  // Creation de professeurs
  const profs = new Profsinscrit({
    nom: nom,
    prenom: prenom,
    matricule: matricule,
    profsde: req.body.telephone,
    telephone: req.body.telephone,
    motdepasse: hash,
    datecreation: new Date(),
  });

  // Save Customer in the database
  Profsinscrit.create(profs, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });}
    else{ 
        res.render('user/apropos');
}
  });

                    })
               }
            };
                
          });
     }
   }
  ]
  exports.verification =  [
    /*
  ce middelware permet de verifier si un compte existe dans la bdd si elle existe on redirect
    */
     
      // verifie si le matricule est un nombre.
      
      body('matricule').isNumeric().withMessage('Veuilez bien saisir un nombre').trim(),
      body('matricule').isLength({ min: 8, max:8}).withMessage('Veuilez bien saisir un matricule de 8 caractere').trim(),
      body('motsdepasse', 'Mot de passe tres court').isLength({ min: 4 }).trim(),
    
      (request, response, next) => {
        response.cookie('code', 'geeksforgeeks');
        // Extract the validation errors from a request.
        const errors = validator.validationResult(request);
    
        // Create a genre object with escaped and trimmed data
        if (!errors.isEmpty()) {
          // There are errors. Render the form again with sanitized values/error messages.
          var erreur = errors.array();
          response.render('user/connection', { erreur: erreur});
          
          return;
        }
        else {
  Profsinscrit.findMatricule(request.body.matricule, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found Customer with id ${request.params.customerId}.`
        });
      } else {
        response.status(500).send({
          message: "Error retrieving Customer with id " + request.params.customerId
        });
      }
    } else {
        console.log(data)
        bcrypt.compare(request.body.motsdepasse, data.motdepasse, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
            response.render('user/connection', {authentifierreur: "veuillez bien saisir les informations"})
           
            } else {
              
              response.redirect("/cours");
            }
          })
    }
  });
               }
      }
    ];