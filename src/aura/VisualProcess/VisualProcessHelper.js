({
    localSfIdUpdate : function(localId, type, sfId){
        var appEvent = $A.get("e.c:VisualProcessEventSfIdLocalUpdate");
        
        appEvent.setParams({
            "type":type,
            "id":localId,
            "sfId":sfId
        });
        
        appEvent.fire();
    },
    
    notifyUpdate : function(localId, type, result){
        var appEvent = $A.get("e.c:VisualProcessEventNotifyUpdate");
        
        appEvent.setParams({
            "type":type,
            "id":localId,
            "success":result
        });
        
        appEvent.fire();
    }
})