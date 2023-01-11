const { Router } = require("express")

const userController = require("../controllers/userController");
// Importation of the userController

const userRouter = new Router();

userRouter.get('/user/:id', cw(userController.getUser));
userRouter.patch('/user/:id/biography', cw(userController.modifyBiography))
userRouter.patch('/user/:id', cw(userController.modifyUser));
userRouter.get('/user/:id/mail', cw(userController.confirmationDeleteUser))
userRouter.delete('/delete/:id',  cw(userController.deleteUser));
// CRUD roads for users

module.exports = userRouter;
// Exporting the UserRouter in Index/Routers

/**
 * @param {*}mdw
 * @return {Controller wrapper for the function in the controller using async await try catch + error message for pseudo } 
*/

function cw(mdw) {
    return async (req, res) => {
      try {
        await mdw(req, res);
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          res.status(403)
          res.send(error);
        } else {
        console.error(error);
        res.json({ error: "Unexpected server error. Please try again later." });
      }
    };
  }
}

/** 
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Get an user by ID
 *    description: Return an user
 *    tags: [User]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true 
 *      description: ID of the user to return 
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: User found
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/User' 
 *      400: 
 *        description: Invalid ID supplied   
 *      404:
 *        description: User not found
*/

/**
 * @swagger
 * /user/{id}:
 *  patch:
 *    summary: Update an user by ID
 *    description: This can only be done by the logged in user
 *    tags: [User]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user to return
 *      schema:
 *       type: integer
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'  
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *         application/json:
 *          schema:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/User'
 *      400:
 *        description: Invalid ID supplied
 *      404:
 *        description: User not found
*/

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *    summary: Delete an user by ID
 *    description: This can only be done by the logged in user
 *    tags: [User]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user to delete
 *      schema:
 *       type: integer
 *    responses:
 *      200:
 *        description: The delete user was successfully deleted
 *      400:
 *        description: Invalid ID supplied
 *      404:
 *        description: User not found
*/

/**
 * @swagger
 * /login:
 *  post:
 *   summary: Logs user into the system
 *   description: Login user
 *   tags: [User]
 *   parameters:
 *   - name: mail
 *     in: query
 *     description: The user's mail
 *     required: false
 *     schema: 
 *      type: string
 *   - name: password
 *     in: query
 *     description: The user's password
 *     required: false
 *     schema:
 *      type: string
 *   requestBody:
 *    description: Login user
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *     200:
 *      description: User logged in
 *      content:
 *        application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *     400:
 *      description: Invalid mail/password supplied
 *     404:
 *      description: Error 404 not found
*/

/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Create an user
 *    description: Create an user
 *    tags: [User]
 *    requestBody:
 *     description: Create an user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateUser'
 *    responses:
 *      201:
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CreateUser'
 *      400:
 *        description: Invalid mail/password supplied
 *      404:
 *        description: Error 404 not found   
*/

/**
 * @swagger
 * /logout:
 *   get:
 *    summary: Logs out current logged in user session
 *    description: Logout user
 *    tags: [User]
 *    responses:
 *     200:
 *      description: User logged out
*/


/**
 * @swagger
 *  components:
 *    schemas:
 *     User:
 *      type: object
 *      properties:
 *        id:
 *            type: integer
 *        firstname:
 *            type: string  
 *        lastname:
 *            type: string
 *        pseudo:
 *            type: string
 *        password:
 *            type: string
 *        passwordConfirm:
 *            type: string 
 *        email:
 *            type: string
 *        biography:
 *            type: string    
 */


/**
 * @swagger
 *  components:
 *    schemas:
 *     CreateUser:
 *      type: object
 *      properties:

 *        firstname:
 *            type: string  
 *        lastname:
 *            type: string
 *        pseudo:
 *            type: string
 *        password:
 *            type: string
 *        passwordConfirm:
 *            type: string 
 *        email:
 *            type: string
 *        biography:
 *            type: string  
 */