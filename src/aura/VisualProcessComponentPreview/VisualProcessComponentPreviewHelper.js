({
    setActiveStep : function(cmp, steps, activeId){
        var active = true;
        var x;
        var childs = [];

        var buttons = cmp.get("v.buttons");

        for(x=0; x<steps.length; x++){
            
            if(steps[x].id == activeId){
                buttons.previous.show = (x!=0);
                buttons.next.show = (x!=steps.length-1);
                active = false;
                childs = steps[x].childs;
            }

            steps[x].current = (steps[x].id == activeId);
            steps[x].isActive = active;
        }

        cmp.set("v.buttons", buttons);
        cmp.set("v.childs", childs);
        cmp.set("v.steps", steps);
        cmp.set("v.activeStep", activeId);
    }
})