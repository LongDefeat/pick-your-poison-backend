const express = require('express');
const router = express.Router();
const axios = require("axios");
const e = require("express");


const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

/** GET cocktail recipe with search form --> SearchForm */
router.get('/search', async (req, res, next) => {
    
    const {recipe} = req.query;
    try{
        const response = await axios.get(`${BASE_URL}${recipe}`, {
            params:{
                query: recipe,    
            }
        });
        return res.send(response.data);
    } catch (err){
        console.log(err);
        return res.send(NotFoundError);
    }
});

module.exports = router;