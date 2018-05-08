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
            }
        });
        $A.enqueueAction(action);
    },

    addingComponent: function(component, event, helper){
        var cmpName = event.getSource().get('v.value');

        //Fire event        
        var appEvent = $A.get("e.c:VisualProcessEventAddingComponent");
        
        appEvent.setParams({
            "type":cmpName
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