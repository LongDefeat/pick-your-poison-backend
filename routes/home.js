"use strict";

/** Route for home page. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");


const router = express.Router();

router.post("/", ensureAdmin, async function (req, res, next){
    try {
        const validator = jsonschema.validate(req.body, userName);
        if (!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
});