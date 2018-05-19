({
    doInit: function(component, event, helper) {
        var action = component.get("c.getComponentTypes");
        var types = [];
        
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();

                for (var i = 0; i < allValues.length; i++) {
                    types.push(allValues[i]);
                }
                
                component.set("v.componentTypes", types);
            } else{
                var errors = response.getError();
                if (errors)
                    if (errors[0] && errors[0].message)
                        console.log("Error message: " + errors[0].message);
                else
                    console.log("Unknown error");
            }
        });
        $A.enqueueAction(action);
    },

    addingComponent: function(component, event, helper){
        var type = event.getSource().get('v.value');

        //Fire event        
        var appEvent = $A.get("e.c:VisualProcessEventAddingComponent");
        
        appEvent.setParams({
            "type":type.name,
            "label":type.label
        });
        
        appEvent.fire();
    },
    
    hidePane: function(component, event, helper){
        //Fire event        
        var appEvent = $A.get("e.c:VisualProcessEventHidePane");
        
        appEvent.setParams({
            "pane":"ComponentSelector"
        });
        
        appEvent.fire();
    }
})