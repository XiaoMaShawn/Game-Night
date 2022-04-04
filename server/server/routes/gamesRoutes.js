const express = require('express');
const router = express.Router();

const app = express()

app.use(express.json)

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM games;`)
      .then(data => {
        const games = data.rows;
        res.json({ games });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  function exist(array, itemName) {
    if (array.find(ele => ele.name === itemName)) {
      return true;
    }
    return false;
  }
  router.post("/new", (req, res) => {
    db.query(`SELECT * FROM games;`)
      .then((data) => {
        const games = data.rows;
        const name = req.body.game;

        console.log('games here', games);
        console.log('req game name:', name);
        console.log('exist', exist(games, name));

        if (exist(games, name)) {
          console.log('game is existing in table');
          res.json({ games });
        } else {
          console.log('we dont have this game');
          const queryString = `
          INSERT INTO games (name, image, category_id)
          VALUES ($1,$2,$3)
          RETURNING *
    `
          // const name = req.body.game;
          const image = req.body.image;
          const category = req.body.category;
          let category_id = 0;
          if (category == 'Video Game') {
            category_id = 1;
          } else if (category == 'Card Game') {
            category_id = 2;
          } else {
            category_id = 3;
          }

          const queryParams = [name, image, category_id]
          return db
            .query(queryString, queryParams)
            .then((data) => {
              const post = data.rows;
              res.json({ post });
            })
            .catch((error) => {
              console.log(error.message)
            })
        }
      })

  })
  return router;
};
