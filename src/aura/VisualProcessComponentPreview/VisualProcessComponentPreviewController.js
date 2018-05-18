({
	doInit: function(component, event, helper) {
        var steps = [];
        component.set("v.steps", steps);
    },

    editComponentsPositionHandler : function(component, event, helper) {
        var lstComponents = event.getParam("lstComponents");
        var steps = component.get("v.steps");
        var x,y;

        var newSteps = [];

        //Set new Positions
        for(x=0; x<lstComponents.length;x++)
            for(y=0; y<steps.length; y++)
                if(lstComponents[x].id === steps[y].id)
                    steps[y].position = lstComponents[x].position;

        //Sort Steps
        for(x=1; x<=steps.length;x++)
            for(y=0; y<steps.length;y++)
                if(steps[y].position === x)
                    newSteps.push(steps[y]);
        
        var activeStep = component.get("v.activeStep");
        helper.setActiveStep(component, newSteps, activeStep);
        
        //Set new array
        component.set("v.steps",newSteps);
    },
    
    addComponentHandler : function(component, event, helper) {
        var type = event.getParam("type");

        var steps = component.get("v.steps");
        
        if(type == 'step'){
            var name = event.getParam("name");
            var id = event.getParam("id");
            var position = event.getParam("position");
            var childs = event.getParam("childs");

            steps.push({
                "name":name,
                "id":id,
                "position":position,
                "childs":childs
            });
            
            component.set("v.steps", steps);
        }
    },

    previewStepHandler : function(component, event, helper){
        var localId = event.getParam("id");
        var steps = component.get("v.steps");

        helper.setActiveStep(component, steps, localId);
    },
    
    removeComponentHandler : function(component, event, helper) {
        var type = event.getParam("type");
        var x;
        
        if(type == 'step'){
            var steps = component.get("v.steps");
            var id = event.getParam("id");

            for(x=0; x<steps.length; x++){
                steps[x].isActive = false;
                steps[x].current = false; 

                if(steps[x].id == id)
                    steps.splice(x, 1);
            }
            
            component.set("v.childs", []);
            component.set("v.steps", steps);
        }
    },
    
    editComponentHandler : function(component, event, helper) {
        var type = event.getParam("type");
        var x;
        
        if(type == 'step'){
            var steps = component.get("v.steps");
            var id = event.getParam("id");
            var name = event.getParam("name");
            var childs = event.getParam("childs");

            for(x=0; x<steps.length; x++)
                if(steps[x].id == id){
                    steps[x].name = name;
                    steps[x].childs = childs;
                    
                    if(steps[x].current)
                        component.set("v.childs", childs);
                }
            
            
            component.set("v.steps", steps);
        }
    }
})