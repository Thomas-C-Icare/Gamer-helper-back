// const userMiddleware = function(req, res, next){
//     if(req.session.user){
//     // If we have a session
      
//       res.locals.user = req.session.user;
//     // The infos in locals of the person has been authenticated can be used in the session later
      
//     }
//     else {
      
//       res.locals.user = false; 
//     }
//     // This line means processing authentication as the the current user 
//     // has not been authenticated.
  
   
//     next();
//     // Middleware finishing his role, waiting for the next step
//   };
  
//   module.exports = userMiddleware;
//     // Exporting our middleware in the index / server.js