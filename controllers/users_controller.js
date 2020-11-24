// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Todo.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

  // POST route for saving a new todo
  app.post("/api/todos", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbTodo) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    // destroy accepts only ONE PARAMETER
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
      // on success no data will be available, use send('message')
    }).then(() => {
      res.send('Todo succsesfully deleted.');
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/todos", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    // update accepts two parameters (data obj and queries condition)
    db.Todo.update(
      // data from the client using req.body
      {
      text: req.body.text,
      complete: req.body.complete
      }, 
    // second parameter queries the database based on where condition
      {
      where: {
        id: req.body.id
      }
      // returns only the number of attributes affected by the update
    }).then(function(rows) {
      res.json(rows);
    });
  });

}; // end module.exports
