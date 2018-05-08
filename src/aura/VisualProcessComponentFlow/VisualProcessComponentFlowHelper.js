({
	addComponent : function(cmp) {
		console.log('Adding component: ', cmp);
		var appEvent = $A.get("e.c:VisualProcessEventAddComponent");

        appEvent.setParams({
			"name":cmp.name,
			"label":cmp.label,
            "type":cmp.type,
			"id":cmp.id,
			"parent":null,
			"sfId":cmp.sfId,
			"position":cmp.position
        });
        
        appEvent.fire();
	},

	//updateStep : function(localId, sfId, name, childs, type) {
	updateStep : function(step) {
		var appEvent = $A.get("e.c:VisualProcessEventEditComponent"); 

		appEvent.setParams({
			"id":step.id,
			"label":step.label,
			"sfId":step.sfId,
			"name":step.name,
			"childs":step.childs,
			"type":step.type
		});
		
		appEvent.fire();
	},

	showReadyIcon : function(localId){
		//Show ready icon
		var readyIcon = document.getElementById("readyIcon"+localId);
		$A.util.removeClass(readyIcon,'hide-element');
		$A.util.addClass(readyIcon,'show-inline-element');
		
		//Hide fail icon
		var failIcon = document.getElementById("failIcon"+localId);
		$A.util.removeClass(failIcon,'show-inline-element');
		$A.util.addClass(failIcon,'hide-element');
	},

	showFailIcon : function(localId, message){
		//Show error icon
		var failIcon = document.getElementById("failIcon"+localId);
		$A.util.removeClass(failIcon,'hide-element');
		$A.util.addClass(failIcon,'show-inline-element');
		
		//Hide ready icon
		var readyIcon = document.getElementById("readyIcon"+localId);
		$A.util.removeClass(readyIcon,'show-inline-element');
		$A.util.addClass(readyIcon,'hide-element');

		//Error text
		var failMessage = document.getElementById("failMessage"+localId);
		failMessage.innerHTML = '<p>' + message + '</p>';
		
	},

	getNewId : function(component){
		var lastId = component.get("v.lastId");
		component.set("v.lastId", lastId + 1);

		return lastId + 1;
	}
})