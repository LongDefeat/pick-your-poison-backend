"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users.
 *
 * Returns { username, first_name, last_name, email, is_admin }
 *
 * Throws UnauthorizedError if a user is not found or if entered a wrong password
 */

class User {
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username, 
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    password,
                    created_at AS "createdAt"
            FROM public.user
            WHERE username = $1`,
      [username]
    );
    const user = result.rows[0];

    if (user) {
      // compares hashed password to new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        // deletes user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }

  /** GET user with data
   *
   * Returns {username, firstName, lastName, email, isAdmin }
   */

  static async get(username) {
    console.log("getting user...");
    const userRes = await db.query(
      `SELECT id,
                username,
                password,
                first_name AS "firstName",
                last_name AS "lastName",
                created_at AS "createdAt"
         FROM public.user
         WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username} found...`);

    const { password, ...userInfo } = user;
    return userInfo;
  }

  /** Register user with data
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates
   */

  static async register({ username, password, firstName, lastName, email }) {
    const duplicateCheck = await db.query(
      `SELECT username
            FROM public.user
            WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Duplicate username: ${username}");
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO public.user
            (username, first_name, last_name, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
      [username, firstName, lastName, hashedPassword]
    );

    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
