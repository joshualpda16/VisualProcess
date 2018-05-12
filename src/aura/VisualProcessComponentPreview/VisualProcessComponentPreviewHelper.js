({
    setActiveStep : function(cmp, steps, activeId){
        var active = true;
        var x;
        var childs = [];

        for(x=0; x<steps.length; x++){
            
            if(steps[x].id == activeId){
                active = false;
                childs = steps[x].childs;
            }

            steps[x].current = (steps[x].id == activeId);
            steps[x].isActive = active;
        }

        cmp.set("v.childs", childs);
        cmp.set("v.steps", steps);
        cmp.set("v.activeStep", activeId);
    }
})