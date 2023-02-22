const express = require("express");
const router = express.Router();
const axios = require("axios");
const e = require("express");
const { NotFoundError } = require("../expressError");

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// www.thecocktaildb.com/api/json/v1/1/random.php
const RANDOM_URL = "www.thecocktaildb.com/api/json/v1/1/random.php";

/** GET cocktail recipe with search form --> SearchForm */
router.get("/search", async (req, res, next) => {
  const { recipe } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}${recipe}`, {
      params: {
        query: recipe,
      },
    });
    return res.send(response.data);
  } catch (err) {
    console.log(err);
    return res.send(NotFoundError);
  }
});

/** GET Random cocktail recipe when button clicked */
router.get("/random_recipe", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const recipe = response.data.drinks[0];
    return res.json({ recipe });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

/** GET - List all cocktails by first letter
 *
 * Ex: http://localhost:3001/cocktailDb/cocktail_by_letter?letter=z
 *
 * This yields all cocktails beginning with letter 'z'
 */
router.get("/cocktail_by_letter", async (req, res, next) => {
  const { letter } = req.query;
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const cocktails = response.data.drinks;
    return res.json({ cocktails });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

module.exports = router;
