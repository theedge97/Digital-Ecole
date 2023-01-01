//sql
const sql = require("./db.js");

// constructor
const  Profsinscrit = function(profsinscrit) {
    this.nom = profsinscrit.nom;
    this.prenom = profsinscrit.prenom;
    this.matricule = profsinscrit.matricule;
    this.profsde = profsinscrit.profsde;
    this.telephone = profsinscrit.telephone;
    this.motdepasse = profsinscrit.motdepasse;
    this.datecreation = profsinscrit.datecreation;

  };
  Profsinscrit.create = (newCustomer, result) => {
    sql.query("INSERT INTO profsinscrit SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    });
  };
  Profsinscrit.findMatricule = (customerId,  result) => {
    sql.query(`SELECT * FROM profsinscrit WHERE matricule = ${customerId} `, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  Profsinscrit.rechercher = (  result) => {
    sql.query(`SELECT * FROM profsinscrit `, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  module.exports = Profsinscrit;