const pgp = require('pg-promise')();
const db = require('/database');


//Creating a new table called users that will hold the information retrieved from client side
const createUser = new Promise((resolve, reject) => {
    db.query(
        `CREATE TABLE users(
            id SERIAL,
            name VARCHAR(255)
            email VARCHAR(255)
            password VARCHAR(255)
        );`, (err, result) => {
            console.log(result);
            console.log(err);
        });

        resolve();
});

module.exports = userModel;


//Was connecting with this before 
// connect(uri, (err, database) => {
//     if(err) throw new Error(err);
//     console.log('connected');
//     db = database;
// });