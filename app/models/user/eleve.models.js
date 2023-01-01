
//sql
const sql = require("../db.js");

// constructor
const Eleve = function(customer) {
    this.nom = customer.nom;
    this.prenom = customer.prenom;
    this.matricule = customer.matricule;
  };
Eleve.create = (newCustomer) => {
    
    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO profsliste SET ?", newCustomer,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//selectionner les elements par leurs matricules
Eleve.findById = (customerId) => {
   
    
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM profsliste WHERE matricule = ${customerId}`, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  
  //selectionener les elements
  Eleve.getAll = result => {
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
Eleve.trouverEleve = (nom , prenom, matricule, classe) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT nom, prenom, matricule, laclasse, nomecole FROM listeeleve l INNER JOIN ecole e ON l.ecoleid = e.id INNER JOIN classe c ON l.classeid = c.id  WHERE l.nom = "${nom}" AND l.prenom = "${prenom}" AND l.matricule = ${matricule} AND c.laclasse = "${classe}"`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
module.exports = Eleve;