public class VisualProcessComponentsUpdateController{
    
    @AuraEnabled
    public static String addNewComponent(String type, String name, String label, String parent, Decimal position, String visualProcessId, Boolean isContainer){
        try{
            
            VisualProcessComponentType__c cmpType = [SELECT Id FROM VisualProcessComponentType__c WHERE Name = :type];
            
            VisualProcessComponent__c cmp = new VisualProcessComponent__c(
            	Name = name,
                Label__c = label,
                Visual_Process__c = visualProcessId,
                Type__c = cmpType.Id,
                Parent__c = parent,
                Position__c = position,
                IsContainer__c = isContainer
            );
            
            insert cmp;
            
            return cmp.Id;
        } catch(Exception ex){
            throw new AuraHandledException('Exception adding new component: ' + ex.getMessage() + ' - ' + ex.getStackTraceString());
        }
    } 

    @AuraEnabled
    public static Boolean updatePositions(Map<String, Object> cmps){
        /*
            'cmps' : [
                {
                    'sfId':<sfId>,
                    'position': '4'
                },
                {
                    'sfId':<sfId>,
                    'position': '3'
                }
            ]
        */
        try{
            List<VisualProcessComponent__c> lstObjComponents = new List<VisualProcessComponent__c>();

            System.debug(cmps.get('lst'));

            List<Object> lstCmps = (List<Object>) cmps.get('lst');

            for(Object objC : lstCmps){
                Map<Object, Object> mapC = (Map<Object, Object>) objC;

                lstObjComponents.add(new VisualProcessComponent__c(
                    Id = (String) mapC.get('sfId'),
                    Position__c = Integer.valueOf(mapC.get('position'))
                ));
            }

            update lstObjComponents;

            return true;
        } catch(Exception ex){
            System.debug(ex.getMessage() + ' - ' + ex.getStackTraceString());
            throw new AuraHandledException('Exception changing component position: ' + ex.getMessage() + ' - ' + ex.getStackTraceString());
        }
    }
    
    @AuraEnabled
    public static Boolean removeStep(String sfId){
        try{
            VisualProcessComponent__c cmp = new VisualProcessComponent__c(Id = sfId);
            
            delete cmp;
            
            return true; 
        } catch(Exception ex){
            throw new AuraHandledException('Exception removing step: ' + ex.getMessage() + ' - ' + ex.getStackTraceString());
        }
    }
    
    @AuraEnabled
    public static Boolean editStepName(String sfId, String newName){
        try{
            VisualProcessComponent__c cmp = new VisualProcessComponent__c(Id = sfId, Name = newName);
            
            update cmp;
            
            return true;
        } catch(Exception ex){
            throw new AuraHandledException('Exception editing component name: ' + ex.getMessage() + ' - ' + ex.getStackTraceString());
        }
    }
        
        
        
}