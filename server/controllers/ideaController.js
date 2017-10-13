const Idea = require('../models/idea.js'),
      db = require('../models/database');


const IdeaController = {};

IdeaController.createIdeaTable = (req, res) => {
  let query = "CREATE TABLE ideas (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), idea VARCHAR(255), tag VARCHAR(255))";
  db.conn.one(query)
    .then(createdIdeas => res.status(200).send({'msg': 'Idea sucessfully created'}));
    .catch(err => res.status(404).send(err));
}

IdeaController.getIdea = (req, res) => {
  db.getAll(ideas);
}

module.exports = IdeaController;
