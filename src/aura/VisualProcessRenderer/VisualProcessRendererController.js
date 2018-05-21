({
	doInit : function(component, event, helper) {
        var action = component.get("c.getFlow");
        var activeChilds
        var flowComponents = [];
        
        action.setParams({visualProcessId : 'a0H6A000004Kd0CUAS'});

        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
				var allValues = response.getReturnValue();

                if(allValues != null){
                    for (var i = 0; i < allValues.length; i++) {
                        allValues[i].current = (i==0);
                        flowComponents.push(allValues[i]);
                    }
                    component.set("v.childs", allValues[0].childs);
                    component.set("v.flowComponents", flowComponents);
                }
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

        component.set("v.buttons",buttons);
    },
    
    doNext : function(component, event, helper) {
        helper.moveStep(component, 'doNext');
    },

    doPrev : function(component, event, helper) {
        helper.moveStep(component, 'doPrev');
    }
})