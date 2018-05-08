public class VisualProcessComponentSelectorController {

	@AuraEnabled
    public static List<Map<String, Object>> getComponentTypes(){
        /*List<String> pickListValuesList = new List<String>();
        
		List<Schema.PicklistEntry> values = VisualProcessComponentType__c.Category__c.getDescribe().getPicklistValues();

        for(Schema.PicklistEntry val : values){
            pickListValuesList.add(val.getLabel());
        }
        
        return pickListValuesList;*/

        List<Map<String, Object>> lstRet = new List<Map<String, Object>>();
        Map<String, Object> category;

        String strActualCategory = '';
        List<Map<String, String>> lstTypes;
        Map<String, String> mapType;

        for(VisualProcessComponentType__c obj : [SELECT Name, Label__c, Category__c 
                                                   FROM VisualProcessComponentType__c 
                                               ORDER BY Category__c]){
            if(obj.Category__c != strActualCategory){
                if(category != null)
                    lstRet.add(category);
                
                strActualCategory = obj.Category__c;
                
                lstTypes = new List<Map<String, String>>();
                category = new Map<String, Object>();

                category.put('category', strActualCategory);
                category.put('items', lstTypes); 
            } 

            mapType = new Map<String, String>();
            mapType.put('name', obj.Name);
            mapType.put('label', obj.Label__c);

            lstTypes.add(mapType);
        }
        lstRet.add(category);

        return lstRet;
    }
}