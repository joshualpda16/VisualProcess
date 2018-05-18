({
	doInit : function(component, event, helper) {
		document.body.parentElement.style.height = '100%';
        document.body.style.height = '100%';
    },
    
    editComponentsPositionHandler : function(component, event, helper) {
        var lstComponents = event.getParam("lstComponents");
        var action = component.get("c.updatePositions");
        var lstCmps = {'lst' : lstComponents};

        action.setParams({
            cmps : lstCmps
        });

        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var sfId = response.getReturnValue();

                for(var x=0; x<lstComponents.length; x++)
                    helper.notifyUpdate(lstComponents[x].id, lstComponents[x].type, true);

            } else{
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {

                        for(var x=0; x<lstComponents.length; x++)
                            helper.notifyUpdate(lstComponents[x].id, lstComponents[x].type, false, errors[0].message);

                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
    },
    
    addComponentHandler : function(component, event, helper) {
        var name = event.getParam("name");
        var label = event.getParam("label");
        var localId = event.getParam("id");
        var type = event.getParam("type");
        var parent = event.getParam("parent");
        var sfId = event.getParam("sfId");
        var position = event.getParam("position");
        var isContainer = event.getParam("isContainer");
        var action;
        
        var visualProcessId = component.get("v.VisualProcessId");
        
        if(type != "" && sfId == null){
            action = component.get("c.addNewComponent");

            action.setParams({
                type : type,
                name : name,
                label : label,
                parent : parent,
                position : position,
                visualProcessId : visualProcessId,
                isContainer : isContainer
            });
            
            action.setCallback(this, function(response) {
                if (response.getState() == "SUCCESS") {
                    var sfId = response.getReturnValue();

                    helper.localSfIdUpdate(localId, type, sfId);
                } else{
                    var errors = response.getError();
                    if (errors) {
                        helper.notifyUpdate(localId, type, false, errors[0].message);
                        if (errors[0] && errors[0].message) {
                            helper.notifyUpdate(localId, type, false, errors[0].message);
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        helper.notifyUpdate(localId, type, false, "Unknown error");
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
                    
                    helper.notifyUpdate(localId, type, result, null);
                } else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            helper.notifyUpdate(localId, type, false, errors[0].message);
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        helper.notifyUpdate(localId, type, false, 'Unknow error');
                        console.log("Unknown error");
                    }
                }
            });
        }
        
        $A.enqueueAction(action);
    }
})