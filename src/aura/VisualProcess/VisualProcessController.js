({
	doInit : function(component, event, helper) {
		document.body.parentElement.style.height = '100%';
        document.body.style.height = '100%';
	},
    
    addComponentHandler : function(component, event, helper) {
        var name = event.getParam("name");
        var label = event.getParam("label");
        var localId = event.getParam("id");
        var type = event.getParam("type");
        var parent = event.getParam("parent");

        console.log('addComponentHandler.localId ', localId);
        
        var visualProcessId = component.get("v.VisualProcessId");

        var action;
        
        if(type != ""){
            action = component.get("c.addNewComponent");

            action.setParams({
                type : type,
                name : name,
                parent : parent,
                label : label,
                visualProcessId : visualProcessId
            });
            
            action.setCallback(this, function(response) {
                if (response.getState() == "SUCCESS") {
                    var sfId = response.getReturnValue();

                    helper.localSfIdUpdate(localId, type, sfId);
                } else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            
            $A.enqueueAction(action);
        }
    },
    
    removeComponentHandler : function(component, event, helper) {
        var sfId = event.getParam("sfId");
        var type = event.getParam("type");
        
        var action;

        if(type == "step"){
            action = component.get("c.removeStep");
            
            action.setParams({
                sfId : sfId
            });
            
            action.setCallback(this, function(response) {
                console.log(response.getState());
                
                if (response.getState() == "SUCCESS") {
                    var result = response.getReturnValue();
                } else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
        }
        
        $A.enqueueAction(action);
	},

    editComponentHandler : function(component, event, helper){
        var sfId = event.getParam("sfId");
        var type = event.getParam("type");
        var name = event.getParam("name");
        var localId = event.getParam("id");

        if(type == "step"){
            var action = component.get("c.editStepName");
            
            action.setParams({
                sfId : sfId,
                newName : name
            });
            
            action.setCallback(this, function(response) {
                if (response.getState() == "SUCCESS") {
                    var result = response.getReturnValue();
                    
                    helper.notifyUpdate(localId, type, result);
                } else{
                    helper.notifyUpdate(localId, type, false);
                }
            });
        }
        
        $A.enqueueAction(action);
    }
})