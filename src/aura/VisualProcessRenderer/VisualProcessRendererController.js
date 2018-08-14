({
	doInit : function(component, event, helper) {
		var action = component.get("c.getFlow");
        var activeChilds
        var flowComponents = [];
        var buttons = {
            "next" : {
                show : true,
                name : "Siguiente"
            },
            "previous" : {
                show : false,
                name : "Anterior"
            }
        };
        
        var visualProcessId = component.get("v.visualProcessId");
        
        action.setParams({
        	visualProcessId : visualProcessId
    	});

        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
				var allValues = response.getReturnValue();
				
				console.log('allValues', allValues);
				console.log('response', response);
				console.log('action.setParams', action.getParams());
				

                if(allValues != null){
                    for (var i = 0; i < allValues.length; i++) {
                        allValues[i].current = (i==0);
                        flowComponents.push(allValues[i]);
                    }
                    component.set("v.childs", allValues[0].childs);
                    component.set("v.flowComponents", flowComponents);
                    component.set("v.buttons",buttons);
                }
            } else{
                var errors = response.getError();
                if (errors)
                    if (errors[0] && errors[0].message)
                        console.log("Error message: " + errors[0].message);
                else
                    console.log("Unknown error");
            }

            var spinner = component.find("mySpinner");            
            $A.util.toggleClass(spinner, "slds-hide");
        });
 
        $A.enqueueAction(action);
    },
    
    doNext : function(component, event, helper) {
        helper.moveStep(component, 'doNext');
    },

    doPrev : function(component, event, helper) {
        helper.moveStep(component, 'doPrev');
    }
})