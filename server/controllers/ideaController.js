const Idea = require('../models/idea.js'),
      db = require('../models/database');


const IdeaController = {};

/**
* Add Idea
*/
IdeaController.createIdea = (req, res) => {
  console.log('createIdea');
  let newIdea = new Idea({
    title: req.body.title,
    idea: req.body.idea,
    tag: req.body.tag || null
  });

  const query = {
    text: "INSERT INTO ideas(title, idea, tag) VALUES($1, $2, $3)",
    values: Object.values(newIdea)
  };


  db.conn.one(query)
    .then(createdIdea => {
      res.status(200).send({
        'msg' : 'ideas successfully created'
      })
    })
    .catch(err => {
      res.status(404).send(err)
    });
};

/**
* get Idea
*/
IdeaController.getIdea = (req, res) => {
  db.getAll('ideas')
  .then(idea => {
    if(!idea) {res.status(404).send('No Idea found')};
    res.status(200).send(idea);
  })
  .catch(err => {
    res.status(404).send(err);
  })
};

module.exports = IdeaController;
