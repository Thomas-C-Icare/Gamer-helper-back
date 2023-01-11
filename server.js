require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routers');
const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gamer Helper API",
            version: "1.0.0",
            description: "Management games, from the management of a factory to that of a royal dynasty passing by a football team or an F1 team. What do all of these (retro) games have in common? Taking notes, lots of notes, to optimize and organize your game. The idea is to create an application that brings together tools to facilitate note taking and optimization. Some useful links to get you started: -[The Gamer Helper repository Front](https://github.com/O-clock-Icare/projet-03-gamer-heleper-front) -[The Gamer Helper repository Back](https://github.com/O-clock-Icare/projet-03-gamer-heleper-back) Made By Thomas Y.",
        },
        servers: [
         {
            url: "http://localhost:3001/"
         }
        ],                  
    },
        apis: ["./routers/*.js"],
        // models: ["./models/*.js"]
}


const specs = swaggerJsDoc(options);

app.use(cors());
// The cors it's a mechanism that allows web servers to control which resources (usually JavaScript files) 
// can be shared between different websites, it is an additional security system 
app.use(express.urlencoded({extended: true}));
// The express.urlencoded() method is a built-in middleware function in Express.
// It parses incoming requests with urlencoded payloads and is based on body-parser.
// available under the req.body property.

app.use(express.json())

app.use(cookieParser())
app.use(router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () =>{
    console.log(`http://localhost:${port}`)
    console.log("http://localhost:3001/api-docs");
});
