
//sql
const sql = require("./db.js");

// constructor
const Customer = function(customer) {
    this.nom = customer.nom;
    this.prenom = customer.prenom;
    this.matricule = customer.matricule;
  };
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO profsliste SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    });
  };
//selectionner les elements par leurs matricules
Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM profsliste WHERE matricule = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0].matricule);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  //selectionener les elements
  Customer.getAll = result => {
    sql.query("SELECT * FROM profsliste", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      
    });
  };
 
//rechercher un matricule 
Customer.findMatricule = (customerId, result) => {
    sql.query(`SELECT * FROM profsliste WHERE matricule = ${customerId}`, (err, res) => {
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
module.exports = Customer;