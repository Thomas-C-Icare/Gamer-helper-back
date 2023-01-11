const { Build } = require("../models");
// Importing build from models

const buildController = {
    getBuildsInUser: async (req, res) => {
        const userId = req.params.id;
        const builds = await Build.findAll(
            {
                where: {
                    user_id: userId
                },
                include: 'widgets',
            }
        );
        if (!builds) {
            res.status(404).json('can\'t find build with this id' + userId);
        } else {
            res.json(builds)
        }
    },

    // GetBuildsInUser allows to retrieve a build based on their ID. 
    // The function uses the Sequelize database framework to execute a "findAll" query on the build model, 
    // The findAll method allows you to retrieve a user build base on his ID
    // If the build is not found, the function sends an HTTP status of 404 and a message indicating that we cannot find build with this userID
    // Or the function returns the user's build in JSON format

    createBuild: async (req, res) => {
        const { title, user_id } = req.body;       
        let bodyErrors = [];
        if(!title){
            bodyErrors.push(`title cannot be null`);
        }
        if(!user_id){
            bodyErrors.push(`user_id cannot be null`);
        }
        if(bodyErrors.length){
            res.status(400).json(bodyErrors);
        } else {
            let newBuild = Build.build({ title, user_id});
            await newBuild.save();
            res.json(newBuild);
        }
    },

    // 

    modifyBuild: async (req, res) => {
        const buildId = req.params.id;
        const { title, user_id} = req.body;
        let build = await Build.findByPk(buildId, {
            include: ['widget']
        });
        if(!build){
            res.status(404).json(`can't find build with id ${buildId}`)
        } else {
            if(title){
                build.title = title;
            }
            await build.save();
            res.json(build);
        }
    },

    // ModifyBuild allows to modify build with widget
    // The function uses the Sequelize database framework to execute a "findbyPk" query on the build model
    // The "findByPk" method allows you to modify a user build based on their ID
    // If the build is not found, the function sends an HTTP status of 404 and a message indicating that the build can't be found.
    // Or the function returns the new save build data in JSON format

    deleteBuild: async (req, res) => {
        const buildId = req.params.id;
        let build = await  Build.findByPk(buildId);
        if(!build) {
            res.status(404).json(`Can't find build with id ${buildId}`);
        } else {
            await build.destroy();
            res.status(200).json('all good');
        }
    }
    
    // DeleteBuild allow to delete build
    // The function uses the Sequelize database framework to execute a "destroy" query on the build model
    // The "findByPk" method allows you to find a user build based on their ID
    // If the build is not found, the function sends an HTTP status of 404 and a message indicating that the build can't be found.  
    // The function sends an HTTP status of 200 and a message indicating that the build has been deleted
};

module.exports = buildController;
// Export the controller in the buildRouter
