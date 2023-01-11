const {  User, RefreshToken } = require("../models");
const bcrypt = require('bcrypt');
const { Op } = require("sequelize")
const jwt = require("jsonwebtoken")
const config = require('../helper/authConfig')

const authController = {
    loginAction: async(req, res) => {
      
      const user = await User.findOne({
        where: {
        [Op.or]: 
        { 
          ... req.body.email ? { email: req.body.email } : {},
          ... req.body.pseudo ?{ pseudo: req.body.pseudo } : {},
        } 
         }
      });
      
      if(!user){
        res.status(400).json(`User/mail not found`);
        return;
      }

      const result = await bcrypt.compare(req.body.password, user.password);

      if(!result){
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration});
      
        let refreshToken = await RefreshToken.createToken(user)
        // console.log("test",refreshToken);
      res.status(200).json({token, refreshToken, user})
      // else {
       
      //   res.status(401).json('Wrong password and/or email/pseudo');
      // }
    },

    refreshToken: async (req, res) => {
      const { refreshToken: requestToken } = req.body;

      if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
      }

      
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

        console.log(refreshToken)

        if (!refreshToken) {
          res.status(403).json({ message: "Refresh token is not in database!" });
          return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
          RefreshToken.destroy({ where: { id: refreshToken.id } });
          
          res.status(403).json({
            message: "Refresh token was expired. Please make a new signin request",
          });
          return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: refreshToken.token,
        });
    },
    
    signupAction: async (req, res) => {
      if(req.body.password !== req.body.passwordConfirm){
        res.status(400).json(`password need to be indentical `)
        return;
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create(req.body);
      if(user){
        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: config.jwtExpiration});
        
          let refreshToken = await RefreshToken.createToken(user)
        return res.status(201).send({token, refreshToken, user});
      }else {
        return res.status(409).send("Mail or Pseudo already exist")
      }
    },

    logout: (req, res) =>{
      req.user = null;
      res.status(200).json(`You have been disconnected`)
    }
}

module.exports = authController;
// Export the controller in the authRouter