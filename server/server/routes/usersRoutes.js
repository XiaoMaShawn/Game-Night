const express = require('express');
const router = express.Router();

const app = express()

app.use(express.json)

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/register", (req, res) => {
    const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const queryParams = [username, email, password];
    return db
      .query(queryString, queryParams)

      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((error) => {
        console.log(error.message)
      })
  });


  router.post("/login", (req, res) => {
    const queryString = `
    SELECT email, password FROM users
    WHERE email = $1
    AND password = $2`
      ;
    const email = req.body.email;
    const password = req.body.password;

    const queryParams = [email, password];
    return db
      .query(queryString, queryParams)

      .then((data) => {
        console.log('this is data', data)
        const users = data.rows;
        res.json({ users });
      })
      .catch((error) => {
        console.log(error.message)
      })
  });

  return router;
};