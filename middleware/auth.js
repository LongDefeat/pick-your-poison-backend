/** Middleware to use when they must provide a valid token and be user matching
 * username provided as route param.
 * 
 * If not, raises Unauthorized.
 */

 function ensureCorrectUserOrAdmin(req, res, next){
    try {
        const user = res.locals.user;
        if (!(user && (user.isAdmin || user.username === req.params.username))){
            throw new UnauthorizedError();
        } 
        return next();
    } catch (err){
        return next(err);
    }
}


module.exports = {
    ensureCorrectUserOrAdmin,
};
  