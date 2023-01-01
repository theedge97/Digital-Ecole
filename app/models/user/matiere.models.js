
//sql
const sql = require("../db.js");

// constructor
const Matiere = function(customer) {
    this.lamatiere = customer.lamatiere;
    this.classeid = customer.classeid;
  };

//Permet de verifier si le matricule a un compte existant
Matiere.rechmatiere = (classe) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT lamatiere FROM matiere INNER JOIN classe c ON c.id = matiere.classeid  WHERE c.laclasse = "${classe}" `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  
  
module.exports = Matiere;