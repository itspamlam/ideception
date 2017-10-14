const User = require('../models/userModel.js'),
        db = require('../models/database.js');

const userController = {};

userController.createUser = (req, res) => {
    let newUser = new User({
      firstname: req.body.firstname,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });

    let query = {
        text: 'INSERT INTO users (firstName, username, password, email) VALUES($1, $2, $3, $4) RETURNING _id',
        values: Object.values(newUser)
    };

    db.conn.one(query)
    .then(createUser => res.status(200).send({'msg':'User created!', 'id': createUser._id}))
    .catch(err =>{ 
        console.log('The error is', err);
        res.status(404).send(err)
    });

}

userController.getUser = (req, res) => {
    db.conn.one('users')
    .then(getUser => {
        if(!user){res.status(404).send('No user found!')}; 
        res.status(200).send({'msg':'Got user!', 'id': getUser._id})})
    .catch(err => res.status(404).send(err));
}

module.exports = userController;
