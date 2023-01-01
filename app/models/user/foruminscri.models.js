
//sql
const sql = require("../db.js");

// constructor
const Forum = function(customer) {
    this.matriculeid = customer.matriculeid;
    this.motdepasse = customer.motdepasse;
    this.telephone = customer.telephone;
  };
Forum.Inscriptionforum = (newCustomer) => {
    
    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO foruminscrit SET ?", newCustomer,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

//Permet de verifier si le matricule a un compte existant
Forum.verifiecompte = (matricule, motdepasse) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM foruminscrit WHERE matriculeid = ${matricule} AND motdepasse = ${motdepasse} `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  
  //selectionener les elements
  Forum.getAll = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM profsliste",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
 
//rechercher dans la table si le nomm , le prenom , le matricule  corespond a la base de donneer
Forum.trouverEleve = (matricule, motdepasse) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT nom,prenom,matricule, laclasse , telephone FROM foruminscrit f INNER JOIN listeeleve l ON f.matriculeid = l.matricule INNER JOIN classe c ON c.id = l.classeid  WHERE f.matriculeid = ${matricule} AND f.matriculeid = ${motdepasse} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
module.exports = Forum;