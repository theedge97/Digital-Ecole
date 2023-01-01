var express = require('express');
module.exports = app => {
  const forum = require("../controllers/foruminscript.controller.js")
  // Create a new Customer 
  app.get("/inscription", (req, res) => {
    res.render('user/forum')
  });
  app.get("/forumcreer", (req, res) => {
    res.render('user/forumcreer')
  });
  app.get("/forumconnection", (req, res) => {
    res.render('user/forum')
  });

  app.post("/forumcreer", forum.creer);
  
  app.post("/forumconnection", forum.connection);
  app.get("/lesmatiere", forum.lesmatieres);

};
