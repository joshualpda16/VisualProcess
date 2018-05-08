({
    doInit: function(component, event, helper) {
        var action = component.get("c.getFlow");
        var actualSteps = [];
        var newId;
        
        action.setParams({
            visualProcessId : 'a0H6A000004Kd0CUAS'
        });

        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();

                console.log(allValues);

                if(allValues != null){
                    for (var i = 0; i < allValues.length; i++) {
                        newId = i+1;
                        allValues[i].id = newId;
                        actualSteps.push(allValues[i]);

                        helper.updateStep(actualSteps[i]);
                        helper.showReadyIcon(newId);
                    }
                    
                    component.set("v.actualSteps", actualSteps);
                }
            }
        });

        $A.enqueueAction(action);
    },
    
    hidePane: function(component, event, helper){      
        var appEvent = $A.get("e.c:VisualProcessEventHidePane");
        
        appEvent.setParams({
            "pane":"ComponentFlow"
        });
        
        appEvent.fire();
    },
    
    editStepName : function(component, event, helper){
        var strCardId = event.getSource().get('v.value');
        var x;
        
        //Show name edit
        var editStepName = document.getElementById("editStepName"+strCardId);
        $A.util.removeClass(editStepName,'hide-element');
        $A.util.addClass(editStepName,'show-element');
        
        //Hide name label 
        var labelStepName = document.getElementById("labelStepName"+strCardId);
        $A.util.removeClass(labelStepName,'show-element');
        $A.util.addClass(labelStepName,'hide-element');
        
        //Hide ready Icon
        var readyIcon = document.getElementById("readyIcon"+strCardId);
        $A.util.removeClass(readyIcon,'show-element');
        $A.util.addClass(readyIcon,'hide-element');
    },
    
    notifyUpdateHandler : function(component, event, helper){
    	var type = event.getParam("type");
        var localId = event.getParam("id");
        var success = event.getParam("success");
        
        if(type == "step"){
            var actualSteps = component.get("v.actualSteps");
        
            if(actualSteps.length > 0){
                if(success){
                    helper.showReadyIcon(localId);
                } else{
                    helper.showFailIcon(localId);
                }
            }
        }
    },
    
    updateSfIdOnLocal : function(component, event, helper){
        var localId = event.getParam("id");
        var type = event.getParam("type");
        var sfId = event.getParam("sfId");
        var x;
        
        var actualSteps = component.get("v.actualSteps");
        
        if(actualSteps.length > 0){
            for(x=0; x<actualSteps.length; x++)
                if(actualSteps[x].id == localId)
                    actualSteps[x].sfId = sfId;

            component.set("v.actualSteps", actualSteps);
            
            helper.showReadyIcon(localId);
        }
    },
    
    saveStepName : function(component, event, helper){
        if (event.keyCode === 13) { //if press Enter key
            var localId = event.currentTarget.dataset.id;
            var actualSteps = component.get("v.actualSteps");
            var x, sfId, childs = [];
            var newName = 'error';
            
            for(x=0; x<actualSteps.length;x++)
                if(actualSteps[x].id == localId){
                    newName = actualSteps[x].name;
                    sfId = actualSteps[x].sfId;
                    childs = actualSteps[x].childs;
                }

            helper.updateStep(localId, sfId, newName, childs, "step");

            component.set("v.actualSteps", actualSteps);
            
            //Hide edit
            var editStepName = document.getElementById("editStepName"+localId);
            $A.util.removeClass(editStepName,'show-element');
            $A.util.addClass(editStepName,'hide-element');
            
            //Show label
            var labelStepName = document.getElementById("labelStepName"+localId);
            $A.util.removeClass(labelStepName,'hide-element');
            $A.util.addClass(labelStepName,'show-element');

            helper.showReadyIcon(localId);
        }
    },

    previewStep : function(component, event, helper){
        var strStepId = event.getSource().get('v.value');

        //Fire event        
        var appEvent = $A.get("e.c:VisualProcessEventPreviewStep");
        
        appEvent.setParams({
            "id":strStepId
        });
        
        appEvent.fire();
    },

    addingComponentHandler : function(component, event, helper){
        component.set("v.isAdding", true);

        var type = event.getParam("type");

        component.set("v.newChild", type);
    },

    addComponent : function(component, event, helper){
        component.set("v.isAdding", false);

        var strStepId = event.getSource().get('v.value');
        var actualSteps = component.get("v.actualSteps");
        var newChild = component.get("v.newChild");
        var x;

        for(x=0; x<actualSteps.length;x++)
            if(actualSteps[x].id == strStepId){
                actualSteps[x].childs.push({
                    name : newChild,
                    label : "New " + newChild,
                    type : newChild
                });
                break;
            }
        
        component.set("v.actualSteps", actualSteps);
        //helper.updateStep(strStepId, actualSteps[x].sfId, actualSteps[x].name, actualSteps[x].childs, actualSteps[x].label, "step");
        helper.updateStep(actualSteps[x]);
    },
    
    removeStep : function(component, event, helper){
        var strStepId = event.getSource().get('v.value');
        var actualSteps = component.get("v.actualSteps");
        var x, sfId;
        
        if(actualSteps.length > 0){   
            for(x=0; x<actualSteps.length; x++)
                if(actualSteps[x].id == strStepId){
                    sfId = actualSteps[x].sfId;
                    actualSteps.splice(x, 1);
                }
            
            component.set("v.actualSteps", actualSteps);
        }
        
        //Fire event        
        var appEvent = $A.get("e.c:VisualProcessEventRemoveComponent");
        
        appEvent.setParams({
            "id":strStepId,
            "type":"step",
            "sfId": sfId
        });
        
        appEvent.fire();
    },
    
    addStep : function(component, event, helper) {
        var actualSteps = component.get("v.actualSteps");
        var childs = [];
        var newId = 1;

        
        if(actualSteps.length > 0) newId = actualSteps[actualSteps.length-1].id + 1;
        
        actualSteps.push({
            "name":"Step "+newId,
            "label":"Step "+newId,
            "id" : newId,
            "childs" : childs,
            "type" : "step"
        });
        
        component.set("v.actualSteps", actualSteps);
        
        helper.addComponent(actualSteps[actualSteps.length-1]);
        
        /*$A.createComponents([
            ["aura:HTML",{ 
                tag: "div",
                HTMLAttributes:{"id": "Temp","class": "slds-col slds-m-bottom_small"}
            }],
            ["aura:HTML",{ 
                tag: "div",
                HTMLAttributes:{"id": "Temp2","class": "slds-box"}
            }]],
            function(compo){
                var container = component.find("stepsContainer");
                if (container.isValid()) {
                    //Get Container
                    var body = container.get("v.body");
                    
                    //Ger column div
                    var colDiv = compo[0];
                    var boxDiv = compo[1];
                    
                    colDiv.set("v.body", boxDiv);
                    
                    body.push(colDiv);
                    container.set("v.body", body);
                }
            }
        );*/
    }
})