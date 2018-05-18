({
	eventAddComponent : function(component, event, helper) {
        var name = event.getParam("name");
        var type = event.getParam("type");
        var label = event.getParam("label");
        var id = event.getParam("id");
        var parent = event.getParam("parent");
        var sfId = event.getParam("sfId");
        var isContainer = event.getParam("isContainer");
        var position = event.getParam("position");

        var debugText = "Component added: ";
        debugText += 'name: ' + name + ' | ';
        debugText += 'type: ' + type + ' | ';
        debugText += 'label: ' + label + ' | ';
        debugText += 'id: ' + id + ' | ';
        debugText += 'parent: ' + parent + ' | ';
        debugText += 'sfId: ' + sfId + ' | ';
        debugText += 'position: ' + position + ' | ';
        debugText += 'isContainer: ' + isContainer;
        
        component.set("v.debugText", debugText);
	},
    
    eventRemoveStep : function(component, event, helper) {
        var id = event.getParam("id");
        var type = event.getParam("type");
        
        component.set("v.debugText", "Component removed: "+type+" ("+id+")");
	},
    
    eventEditComponent : function(component, event, helper) {
        var id = event.getParam("id");
        var type = event.getParam("type");
        var name = event.getParam("name");
        
        component.set("v.debugText", "Component edit: "+type+" ("+name+")");
    },
    
    eventHidePane : function(component, event, helper) {
        var pane = event.getParam("pane");
        component.set("v.debugText", "Hide Pane: " + pane);
    },
    
    addingComponent : function(component, event, helper) {
        var type = event.getParam("type");
        component.set("v.debugText", "Adding component: " + type);
	}
})