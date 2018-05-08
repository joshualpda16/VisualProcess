({
	doInit: function(component, event, helper) {
        var steps = [];
        component.set("v.steps", steps);
    },
    
    addComponentHandler : function(component, event, helper) {
        var type = event.getParam("type");

        var steps = component.get("v.steps");
        
        if(type == 'step'){
            var name = event.getParam("name");
            var id = event.getParam("id");
            //var childs = event.getParam("childs");

            steps.push({
                "name":name,
                "id":id
            });
            
            component.set("v.steps", steps);
        }
    },

    previewStepHandler : function(component, event, helper){
        var localId = event.getParam("id");
        var childs = event.getParam("childs");

        var steps = component.get("v.steps");
        var x;

        var active = true;
        var childs = [];

        for(x=0; x<steps.length; x++){
            
            if(steps[x].id == localId){
                active = false;
                childs = steps[x].childs;
            }

            steps[x].current = (steps[x].id == localId);
            steps[x].isActive = active;
        }

        component.set("v.childs", childs);
        component.set("v.steps", steps);
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