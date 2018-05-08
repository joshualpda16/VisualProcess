public class VisualProcessComponentsUpdateController{
    
    @AuraEnabled
    public static String addNewComponent(String type, String name, String label, String parent, Decimal position, String visualProcessId){
        try{
            
            VisualProcessComponentType__c cmpType = [SELECT Id FROM VisualProcessComponentType__c WHERE Name = :type];
            
            VisualProcessComponent__c cmp = new VisualProcessComponent__c(
            	Name = name,
                Label__c = label,
                Visual_Process__c = visualProcessId,
                Type__c = cmpType.Id,
                Parent__c = parent,
                Position__c = position 
            );
            
            insert cmp;
            
            return cmp.Id;
        } catch(Exception ex){
            throw new AuraHandledException('Exception: ' + ex.getMessage() + ' - ' + ex.getStackTraceString());
        }
    } 
    
    @AuraEnabled
    public static Boolean removeStep(String sfId){
        try{
            VisualProcessComponent__c cmp = new VisualProcessComponent__c(Id = sfId);
            
            delete cmp;
            
            return true; 
        } catch(Exception ex){
            throw new AuraHandledException('Exception: ' + ex.getMessage() + ' - ' + ex.getStackTraceString());
        }
    }
    
    @AuraEnabled
    public static Boolean editStepName(String sfId, String newName){
        try{
            VisualProcessComponent__c cmp = new VisualProcessComponent__c(Id = sfId, Name = newName);
            
            update cmp;
            
            return true;
        } catch(Exception ex){
            throw new AuraHandledException('Exception: ' + ex.getMessage() + ' - ' + ex.getStackTraceString());
        }
    }
        
        
        
}