({
    getComponentTypes: function(component, fieldName, elementId) {
        var action = component.get("c.getComponentTypes");

        var types = [];
        
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();

                for (var i = 0; i < allValues.length; i++) {
                    types.push(allValues[i]);
                }
                
                component.find(elementId).set("v.componentTypes", types);
            }
        });
        $A.enqueueAction(action);
    }
})