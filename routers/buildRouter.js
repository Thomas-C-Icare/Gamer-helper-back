const { Router } = require("express")

const buildController = require("../controllers/buildController");
// Importation of the buildController

const buildRouter = new Router();

buildRouter.get('/user/:id/builds', cw(buildController.getBuildsInUser));
buildRouter.post('/builds', cw(buildController.createBuild));
buildRouter.patch('/builds/:id', cw(buildController.modifyBuild));
buildRouter.delete('/builds/:id', cw(buildController.deleteBuild));
// CRUD roads for builds

module.exports = buildRouter;
// Exporting the buildRouter in Index/Routers

/**
 * @param {*}mdw
 * @return {Controller wrapper for the function in the controller using async await try catch}
*/

function cw(mdw) {
    return async (req, res) => {
      try {
        await mdw(req, res);
      } catch (error) {
        console.error(error);
        res.json({ error: "Unexpected server error. Please try again later." });
      }
    };
  }

/**
 * @swagger
 * /user/{id}/builds:
 *  get:
 *    summary: Get an user build by ID
 *    description: Return an user build
 *    tags: [Build]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user build to return
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: User build found
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Build'
 *      400: 
 *        description: Invalid ID supplied
 *      404:
 *        description: User build not found
*/  

/**
 * @swagger
 * /builds/:id:
 *  patch:
 *    summary: Update an user's build by ID
 *    description: This can only be done by the logged in user
 *    tags: [Build]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user build to update
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/Build'  
 *    responses:
 *      200:
 *        description: User build updated successfully
 *      400:
 *        description: Invalid ID supplied
 *      404:
 *        description: User build not found
*/

/**
 * @swagger
 * /builds:
 *  post:
 *    summary: Add a new user build
 *    description: This can only be done by the logged in user
 *    tags: [Build]
 *    requestBody:
 *      description: The user build to create
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Build'    
 *    responses:
 *      200:
 *        description: User build added successfully
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Build' 
 *      400:
 *        description: Invalid ID supplied
 *      404:
 *        description: The user build was not found
*/

/**
 * @swagger
 * /builds/:id:
 *  delete:
 *    summary: Delete an user build by ID
 *    description: This can only be done by the logged in user
 *    tags: [Build]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user build to delete
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: User build was successfully deleted
 *      400:
 *       description: Invalid ID supplied
 *      404:
 *        description: User build was not found  
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *     Build:
 *      type: object
 *      properties:
 *        id:
 *            type: integer
 *        title:
 *            type: string  
 *        widget_id:
 *            type: integer
 *        user_id:
 *            type: integer   
 */