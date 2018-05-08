({
	eventAddStep : function(component, event, helper) {
        var name = event.getParam("name");
        var type = event.getParam("type");
        
        component.set("v.debugText", "Component added: "+type+" ("+name+")");
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