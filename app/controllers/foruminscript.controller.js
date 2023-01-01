const Eleve = require("../models/user/eleve.models.js");
const Foruminscri = require("../models/user/foruminscri.models.js");
const Matiere = require("../models/user/matiere.models.js");


let express = require('express');
let app = express();
let bodyParser = require('body-parser') //permet d'appeler la session
const validator = require('express-validator');
const { body ,validationResult  } = require('express-validator');
const bcrypt = require("bcryptjs")//permet de hacher le mot de passe
const saltRounds = 10;
const { res, req } = require('express');
const { toLower, isEmpty } = require('lodash');

const cookieParser = require('cookie-parser');

app.use(cookieParser());
//nos middelware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
exports.creer =  [
    /*
ce middelware permet de creer un compte
    */
   // verifie si le matricule est un nombre.
   body('nom').isLength({ min: 3}).withMessage('Veuilez bien saisir un nom long').trim(),
   body('prenom').isLength({ min: 3}).withMessage('Veuilez bien saisir un prenom long').trim(),
   body('matricule').isNumeric().withMessage('Veuilez bien saisir un nombre').trim(),
   body('matricule').isLength({ min: 8, max:8}).withMessage('Veuilez bien saisir un matricule de 8 caractere').trim(),
   body('telephone').isNumeric().withMessage('Veuilez bien saisir un numero').trim(),
   body('telephone').matches(/^6[1,2,5,6]{1}[0-9]{7}$/).withMessage('Veuilez bien saisir un numero valide').trim(),
   body('motdepasse', 'Veuillez saisir un mot de passe de plus de quatre caractere').isLength({ min: 4 }).trim(),
   body('motdepasse').custom((value, { req }) => {
    if (value !== req.body.motdepasse1) {
      throw new Error('les mots de passe ne sont pas identique');
    }
    
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  async (req, res) => {

     // Extract the validation errors from a request.
     const errors = validator.validationResult(req);
     //les erreurs 
     var erreurauth = []
     var nomerreur = '';
     var rechmatricule = '';
     var inscritforum = '';
     // Create a genre object with escaped and trimmed data
     if (!errors.isEmpty()) {
       // There are errors. Render the form again with sanitized values/error messages.
       var erreur = errors.array();
       res.render('user/forumcreer', { erreur: erreur});
       
       return;
     }
     else {
        var nom = req.body.nom;
        var nom = nom.toUpperCase();
        var prenom = req.body.prenom;
        var prenom = prenom.toLowerCase(); 
        var matricule = req.body.matricule;
        var classe = req.body.classe;
        var matricule = parseInt(matricule)
         // Create a Customer
  const leleve = [{
    matriculeid: matricule,
    motdepasse: req.body.motdepasse,
    telephone: req.body.telephone
  }];
        try {  
            
             
            
           rechmatricule = await Eleve.trouverEleve(nom, prenom, matricule, classe);
           console.log(rechmatricule);
  
           if(!isEmpty(rechmatricule)  ){
               inscritforum = await Foruminscri.Inscriptionforum(leleve)
             res.render('user/contact'); 
           
             }
             if(isEmpty(rechmatricule)  ){
                 var authentifierreur = "Veuillez bien inserer les informations";
                res.render('user/forumcreer', {authentifierreur: authentifierreur}); 
             }
           
             } catch(e) {
                 console.log(e);
                 res.sendStatus(500);
             }
         
     }
   }
  ]


  exports.connection =  [
    /*
ce middelware permet de creer un compte
    */
   // verifie si le matricule est un nombre.
   body('matricule').isNumeric().withMessage('Veuilez bien saisir un nombre').trim(),
   body('matricule').isLength({ min: 8, max:8}).withMessage('Veuilez bien saisir un matricule de 8 caractere').trim(),
   body('motdepasse', 'Veuillez saisir un mot de passe de plus de quatre caractere').isLength({ min: 4 }).trim(),
  async (req, res) => {

     // Extract the validation errors from a request.
     const errors = validator.validationResult(req);
     //les erreurs 
     var erreurauth = []
     var nomerreur = '';
     var rechmatricule = '';
     var inscritforum = '';
     // Create a genre object with escaped and trimmed data
     if (!errors.isEmpty()) {
       // There are errors. Render the form again with sanitized values/error messages.
       var erreur = errors.array();
       res.render('user/forum', { erreur: erreur});
       
       return;
     }
     else { 
        var matricule = req.body.matricule;
        var motdepasse = req.body.motdepasse;
        var matricule = parseInt(matricule)
         // Create a Customer
        try {  
           rechmatricule = await Foruminscri.trouverEleve(matricule, motdepasse)
           console.log(rechmatricule[0].matricule);
           let users = {
            name : "Ritik",
            Age : "18"
            }
            
res.cookie("userData", users);
           if(!isEmpty(rechmatricule)  ){
               
                    //stockage des informations dans les sessions
                    res.cookie('nom', rechmatricule[0].nom);
                    res.cookie('prenom', rechmatricule[0].prenom);
                    res.cookie('classe', rechmatricule[0].laclasse);
                    res.cookie('matricule', rechmatricule[0].matricule);
                    
             res.redirect('/lesmatiere'); 
           
             }
             if(isEmpty(rechmatricule)  ){
                 var authentifierreur = "Veuillez bien inserer les informations";
                res.redirect('/lesmatiere'); 
             }
           
             } catch(e) {
                 console.log(e);
                 res.sendStatus(500);
             }
         
     }
   }
  ]

  exports.lesmatieres  =  [
    async (req, res) => {
      
     var classe =  '7e annee';

     try {  
      var unematiere = await Matiere.rechmatiere(classe)
        console.log(req.cookies);
     if(!isEmpty(unematiere)){
       res.render('user/bibliotheque'); 
     
       }
     
       } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ]