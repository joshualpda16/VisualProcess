({
	moveStep : function(component, action) {
		var steps = component.get("v.flowComponents");
		var buttons = component.get("v.buttons");
		var childs;

		for (var i = 0; i < steps.length; i++) {
			if(steps[i].current){
				
				steps[i].isActive = (action === 'doNext');
				steps[i].current = false;

				if(action === 'doPrev'){
					steps[i-1].current = true;
					steps[i-1].isActive = false;
					childs = steps[i-1].childs;
					buttons.previous.show = (steps[i-1].position != 1);
					buttons.next.show = true;
				} else{
					steps[i+1].current = (action === 'doNext');
					buttons.next.show = (steps[i+1].position != steps.length);
					buttons.previous.show = true;
					childs = steps[i+1].childs;
				}
		
				component.set("v.buttons",buttons);
				component.set("v.flowComponents", steps);
				component.set("v.childs", childs);
				break;
			}
		}
	}
})