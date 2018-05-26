({

	hideEventHandler : function(component, event, helper) {
        var receivedPane = event.getParam("pane");
        
        var pane = component.find(receivedPane);
        helper.shortComponent(pane);
        
        var showButton = component.find(receivedPane + "Show");
        helper.showComponent(showButton);
	},
    
    showPanel : function(component, event, helper) {
        var panelName = event.getSource().get('v.value');
        
        var showButton = component.find(panelName + "Show");
        helper.hideComponent(showButton);
        
        var pane = component.find(panelName);
        helper.longComponent(pane);
	},
        
	showModal : function(component){
		component.set('v.modalConfigShow', true);
	},

	showModalConfig : function(component, event, helper) {
		var header = event.getParam('header');
		//var component = event.getParam('component');

		console.log('Received header: ', header);
		
		component.set('v.modalConfigHeader', header);
		component.set('v.modalConfigShow', true);
	}
})