const { Router }= require("express");
const userRouter = require("./userRouter");
const buildRouter = require("./buildRouter");
const widgetRouter = require("./widgetRouter");
const authRouter = require("./authRouter");
//  Importation of every routers in this index router file

const mainRouter = new Router();

mainRouter.get('/', (_, res) => {
    res.send('hello world');
});
// Sending with the hello world in homepage http://localhost:8000

mainRouter.use(userRouter);
mainRouter.use(buildRouter);
mainRouter.use(widgetRouter);
mainRouter.use(authRouter);
// Using our differents routers

module.exports = mainRouter;
// Exporting the mainRouter in server.js