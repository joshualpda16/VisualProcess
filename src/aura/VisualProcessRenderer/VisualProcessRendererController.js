({
	doInit : function(component, event, helper) {
		var action = component.get("c.getFlow");
        var flowComponents = [], okIds = [];
        var isMoving = {
            'status' : false
        };
        //var newId;
        
        action.setParams({ 
            visualProcessId : 'a0H6A000004Kd0CUAS'
		});

        action.setCallback(this, function(response) {

            if (response.getState() == "SUCCESS") {
				var allValues = response.getReturnValue();

                if(allValues != null){
                    for (var i = 0; i < allValues.length; i++) {
                        allValues[i].current = (i==0);
                        flowComponents.push(allValues[i]);
                    }
                    
                    component.set("v.flowComponents", flowComponents);
                }
            }
        });

        $A.enqueueAction(action);

        var x = document.getElementsByClassName("modal-footer");
        console.log(document);
        
    },
    
})