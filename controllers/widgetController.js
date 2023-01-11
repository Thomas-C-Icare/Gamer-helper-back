const { Widget } = require("../models");
// Import widget from models 

const widgetController = {
    getsWidgetsInBuilds: async (req, res) => {
        const buildId = req.params.id;
        const widgets = await Widget.findAll(
            {
                where: {
                    build_id: buildId
                },
                
            }
        );
        if (!widgets) {
            res.status(404).json('can\'t find build with this id' + buildId);
        } else {
            res.json(widgets)
        }
    },

    createWidget: async (req, res) => {
        const { name, position_x, position_y, build_id } = req.body;
        
        let bodyErrors = [];
        if(!name){
            bodyErrors.push(`name cannot be null`);
        }
        if(!position_x){
            bodyErrors.push(`position_x cannot be null`);
        }
        if(!position_y){
            bodyErrors.push(`position_y cannot be null`);
        }
        if(!build_id){
            bodyErrors.push(`build_id cannot be null`);
        }
        if(bodyErrors.length){
            res.status(400).json(bodyErrors);
        } else {
            let newWidget = Widget.build({ name, position_x, position_y, build_id});
            await newWidget.save();
            res.json(newWidget);
        }

    },
    modifyWidget: async (req, res) => {
        const buildId = req.params.bid;
        const widgetId = req.params.wid
        const { name, position_x, position_y} = req.body;
        
        const widget = await Widget.findByPk(widgetId,
            {
                where: {
                    build_id: buildId
                },
                
            }
        );
        if(!widget){
            res.status(404).json(`can't find widget with id ${widgetId}`)
        } else {
            if(name){
                widget.name = name;
            }
            if(position_x){
                widget.position_x = position_x;
            }
            if(position_y){
                widget.position_y = position_y;
            }
            await widget.save();
            res.json(widget);
        }
    },
    
    deleteWidget: async (req, res) => {
        const buildId = req.params.bid;
        const widgetId = req.params.wid;
        let widget = await  widget.findByPk(widgetId, {
            where: {
                build_id: buildId
            },
        });
        if(!widget) {
            res.status(404).json(`Can't find widget with id ${widgetId}`);
        } else {
            await widget.destroy();
            res.json('Ok');
        }
    }
}

module.exports = widgetController;
// Export the controller in the widgetRouter
