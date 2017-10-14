const Idea = require('../models/idea.js'),
      db = require('../models/database');


const IdeaController = {};

/**
* Add Idea
*/
IdeaController.createIdea = (req, res) => {
  let newIdea = new Idea({
    title: req.body.title,
    idea: req.body.idea,
    tag: req.body.tag || null,
    user_id: req.body.user_id
  });

  const query = {
    text: "INSERT INTO ideas(title, idea, tag, user_id) VALUES($1, $2, $3, $4)",
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
 * getIdeasByUser - gets all ideas for a given user
 */
IdeaController.getIdeasByUser = (req, res) => {
  db.conn.any(`SELECT * FROM ideas WHERE user_id=${req.params.userId}`)
    .then(foundIdeas => res.status(200).send(foundIdeas))
    .catch(err => res.status(404).send(err));
};

/**
* get Idea - gets ALL ideas from table
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
