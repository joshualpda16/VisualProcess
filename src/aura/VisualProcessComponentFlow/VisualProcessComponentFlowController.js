({
    doInit: function(component, event, helper) {
        var action = component.get("c.getFlow");
        var flowComponents = [], okIds = [];
        var isMoving = {
            'status' : false
        };
        var newId;
        
        action.setParams({
            visualProcessId : 'a0H6A000004Kd0CUAS'
        });

        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();

                if(allValues != null){
                    for (var i = 0; i < allValues.length; i++) {
                        newId = helper.getNewId(component);
                        allValues[i].id = newId;
                        flowComponents.push(allValues[i]);
                        
                        helper.addComponent(flowComponents[i]);
                        okIds.push(newId);
                    }
                    
                    //helper.updateStep(flowComponents[x]);
                    component.set("v.flowComponents", flowComponents);
                }

                setTimeout(function(){
                    for(i = 0; i < okIds.length; i++)
                        helper.showReadyIcon(okIds[i]); 
                }, 500);
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
        var message = event.getParam("message");

        if(type == "step"){
            var flowComponents = component.get("v.flowComponents");
        
            if(flowComponents.length > 0){
                if(success){
                    helper.showReadyIcon(localId);
                } else{
                    helper.showFailIcon(localId, message);
                }
            }
        }
    },
    
    updateSfIdHandler : function(component, event, helper){
        var localId = event.getParam("id");
        var type = event.getParam("type");
        var sfId = event.getParam("sfId");
        var x;
        
        var flowComponents = component.get("v.flowComponents");
        
        if(flowComponents.length > 0){
            for(x=0; x<flowComponents.length; x++)
                if(flowComponents[x].id == localId)
                    flowComponents[x].sfId = sfId;

            component.set("v.flowComponents", flowComponents);
            
            helper.showReadyIcon(localId);
        }
    },
    
    saveStepName : function(component, event, helper){
        if (event.keyCode === 13) { //if press Enter key
            var localId = event.currentTarget.dataset.id;
            var flowComponents = component.get("v.flowComponents");
            var x, sfId, childs = [];
            var newName = 'error';
            
            for(x=0; x<flowComponents.length;x++)
                if(flowComponents[x].id == localId){
                    newName = flowComponents[x].name;
                    sfId = flowComponents[x].sfId;
                    childs = flowComponents[x].childs;

                    break;
                }

            helper.updateStep(flowComponents[x]);

            component.set("v.flowComponents", flowComponents);
            
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
        var typeLabel = event.getParam("label");
        var newId = helper.getNewId(component);

        var newChild = {
            'type' : type,
            'typeLabel' : typeLabel,
            'name' : "new_" + type + newId,
            'label' : "New " + type + " " + newId,
            'id' : newId
        };

        component.set("v.newChild", newChild);
    },

    addComponent : function(component, event, helper){
        component.set("v.isAdding", false);

        var objStep = event.getSource().get('v.value');
        var flowComponents = component.get("v.flowComponents");
        var newChild = component.get("v.newChild");
        var x;

        for(x=0; x<flowComponents.length;x++)
            if(flowComponents[x].id == objStep.id){
                newChild.position = flowComponents[x].childs.length+1;
                newChild.parent = objStep.sfId;
                newChild.isContainer = false;
                flowComponents[x].childs.push(newChild);
                break;
            }
        
        component.set("v.flowComponents", flowComponents);
        
        helper.updateStep(flowComponents[x]);
        helper.addComponent(newChild);
    },

    startMoving : function(component, event, helper){
        component.get("v.isMoving");

        var cmp = event.getSource().get('v.value');

        var objIsMoving = {
            'status': true,
            'cmp' : cmp
        };

        component.set("v.isMoving", objIsMoving);

        var disableStep = document.getElementById("disableStep"+cmp.id);
		$A.util.removeClass(disableStep,'hide-element');
		$A.util.addClass(disableStep,'show-element');
    },

    endMoving : function(component, event, helper){
        var cmp = event.getSource().get('v.value');

        var cmpToMove = component.get("v.isMoving");
        cmpToMove = cmpToMove.cmp;

        var flowComponents = component.get("v.flowComponents");

        if(cmp.position !== cmpToMove.position && cmp.position !== cmpToMove.position+1){
            var inserted = false;
            var deleted = false;
            var x;
            var newPosition = 1;
            var newComponents = [];

            // for(x=0; x<flowComponents.length; x++){
            //     if(flowComponents[x].id == cmp.id){
            //         cmpToMove.position = newPosition++;
            //         newComponents.push(cmpToMove);
            //         flowComponents[x].position = newPosition++;
            //         newComponents.push(flowComponents[x])
            //     } else if(flowComponents[x].id == cmpToMove.id){
            //         //do not push
            //     } else{
            //         flowComponents[x].position = newPosition++; 
            //         newComponents.push(flowComponents[x]);
            //     }
            // }

            for(x=0; x<flowComponents.length; x++){
                if(flowComponents[x].id == cmp.id){
                    newComponents.push(JSON.parse(JSON.stringify(cmpToMove)));
                    newComponents[newComponents.length-1].position = newPosition++;
                    newComponents.push(JSON.parse(JSON.stringify(flowComponents[x])));
                    newComponents[newComponents.length-1].position = newPosition++;
                } else if(flowComponents[x].id == cmpToMove.id){
                    //do not push
                } else{
                    newComponents.push(JSON.parse(JSON.stringify(flowComponents[x])));
                    newComponents[newComponents.length-1].position = newPosition++; 
                }
            }

            var updatedCmps = [];
            var y, z;

            for(y=0;y<flowComponents.length;y++)
                for(z=0;z<newComponents.length;z++)
                    if(flowComponents[y].id === newComponents[z].id 
                        && flowComponents[y].position != newComponents[z].position)
                        updatedCmps.push(newComponents[z]);

            helper.updatePositions(updatedCmps);

            flowComponents = newComponents;
        }

        component.set("v.flowComponents", flowComponents);

        var disableStep = document.getElementById("disableStep"+cmpToMove.id);
		$A.util.removeClass(disableStep,'show-element');
		$A.util.addClass(disableStep,'hide-element');

        var objIsMoving = {
            'status': false,
            'cmp' : null
        };

        component.set("v.isMoving", objIsMoving);
    },
    
    removeStep : function(component, event, helper){
        var strStepId = event.getSource().get('v.value');
        var flowComponents = component.get("v.flowComponents");
        var x, sfId;
        
        if(flowComponents.length > 0){   
            for(x=0; x<flowComponents.length; x++)
                if(flowComponents[x].id == strStepId){
                    sfId = flowComponents[x].sfId;
                    flowComponents.splice(x, 1);
                }
            
            component.set("v.flowComponents", flowComponents);
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
        var flowComponents = component.get("v.flowComponents");
        var childs = [];
        var newId = helper.getNewId(component);
        
        var source = event.getSource().get('v.value');
        var position;

        if(source === 'AddStepButton')
            position = flowComponents.length + 1;

        flowComponents.push({
            "name":"Step "+newId,
            "label":"Step "+newId,
            "id" : newId,
            "childs" : childs,
            "type" : "step",
            "position" : position,
            "sfId" : null,
            "isContainer" : true
        });
        
        component.set("v.flowComponents", flowComponents);
        
        helper.addComponent(flowComponents[flowComponents.length-1]);
        
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