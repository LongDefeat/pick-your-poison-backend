"use strict";

/** Routes for users */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const axios = require("axios");

const router = express.Router();

/** POST / { user } => { user, token } 
 * 
 * Adds a new user; this is not the registration endpoint. Only for
 * admin users to add new users. The new user being added can be admin.
 * 
 * This returns the newly created user an athentication token for them
 * ---> {user: { username, firstName, lastName, isAdmin }}
*/

router.post("/", ensureAdmin, async function(req, res, next){
    try {
        const validator = jsonschema.validate(req.body, userNewSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.register(req.body);
        const token = createToken(user);
        res.status(201).json({ user, token });
    } catch (err){
        return next(err);
    }
})

/** GET / => { users: [ {username, firstName, lastName }, ...] } 
 * 
 * Returns list of all users
 * NEED ALL USERS FUNCTION
*/

router.get("/:username", async function(req, res, next){
    try {
        const user = await User.get(req.params.username);
        return res.json( { users: [user] })
    } catch (err){
        return next(err);
    }
});

module.exports = router;