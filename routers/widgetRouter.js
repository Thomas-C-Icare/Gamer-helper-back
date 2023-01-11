const { Router } = require("express")

const widgetController = require("../controllers/widgetController");
// Importation of the widgetController

const widgetRouter = new Router();

widgetRouter.get('/builds/:id/widgets', cw(widgetController.getsWidgetsInBuilds));
widgetRouter.post('/widget', cw(widgetController.createWidget));
widgetRouter.patch('/builds/:bid/widgets/:wid', cw(widgetController.modifyWidget));
widgetRouter.delete('/builds/:bid/widgets/:wid', cw(widgetController.deleteWidget));
// CRUD roads for widgets 

module.exports = widgetRouter;
// Exporting the WidgetRouter in Index/Routers

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
 * /builds/{id}/widgets:
 *  get:
 *    summary: Get an user widget by ID
 *    description: Return an user widget
 *    tags: [Widget]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the widget to return
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: User widget found
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Widget' 
 *      400:
 *        description: Invalid ID supplied
 *      404:
 *        description: User widget not found
*/  

/**
 * @swagger
 * /builds/:bid/widgets/:wid:
 *  patch:
 *    summary: Update an user widget in build by ID
 *    description: This can only be done by the logged in user
 *    tags: [Widget]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the widget to modify
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Widget'
 *    responses:
 *      200:
 *        description: User widget updated successfully
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Widget' 
 *      400:
 *        description: Invalid ID supplied 
 *      404:
 *        description: User widget not found
*/

/**
 * @swagger
 * /widget:
 *  post:
 *    summary: Add a new user widget in build
 *    description: This can only be done by the logged in user
 *    tags: [Widget]
 *    requestBody:
 *     description: Widget to be added in build
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Widget' 
 *    responses:
 *      200:
 *        description: User widget added successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Widget'
 *      400:
 *        description: Invalid widget supplied
 *      404:
 *        description: User widget not found
*/

/**
 * @swagger
 * /builds/:bid/widgets/:wid:
 *  delete:
 *    summary: Delete an user widget in build by ID
 *    description: This can only be done by the logged in user
 *    tags: [Widget]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the widget to delete
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: User widget was successfully deleted
 *      400:
 *        description: Invalid ID supplied
 *      404:
 *        description: User widget was not found  
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *     Widget:
 *      type: object
 *      properties:
 *        name:
 *            type: string  
 *        position_x:
 *            type: integer
 *        position_y:
 *            type: integer
 *        build_id:
 *            type: integer
 */