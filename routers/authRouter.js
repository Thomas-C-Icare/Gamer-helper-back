const { Router } = require("express")

const authController = require("../controllers/authController");
// Importation of the authController

const authRouter = new Router();

authRouter.post('/login', cw(authController.loginAction));
authRouter.post('/signup', cw(authController.signupAction));
authRouter.get('/logout', cw(authController.logout));
authRouter.post('/auth/refreshtoken', cw(authController.refreshToken));
// Authentification roads for the user

module.exports = authRouter;
// Exporting the authRouter in Index/Routers

/**
 * @param {*}mdw
 * @return {Controller wrapper for the function in the controller using async await try catch}
*/

function cw(mdw) {
    return async (req, res) => {
      try {
        await mdw(req, res);
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          // Sequelize error different message 
          res.status(403)
          res.send({ status: 'error', message: "User already exists"});
      }else {
        console.error(error);
        res.json({ error: "Unexpected server error. Please try again later." });
      }}
    };
  }
