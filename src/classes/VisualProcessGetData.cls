public class VisualProcessGetData {

    @AuraEnabled
    public static List<Map<String, Object>> getFlow(String visualProcessId){
        
        /*
            [
                {
                    "type" : "step"
                    "name" : "Name Step 1"
                    "childs" : [
                        {
                            "type":"number",
                            "name":"NameNumber1",
                            "label":"Label Number 1"
                        },
                        {
                            "type":"text",
                            "name":"Name Text 1",
                            "label":"Label Text 1"
                        },
                        {
                            "type":"text",
                            "name":"Name Text 2",
                            "label":"Label Text 2"
                        }
                    ]
                },
                {
                    "type" : "step"
                    "name" : "Name Step 2"
                },
                {
                    "type" : "step"
                    "name" : "Name Step 3"
                },
                
            ]

        */
        
        try{
            List<Map<String, Object>> retFlow = new List<Map<String, Object>>(); 
            Map<String, Object> c; 


            
            List<VisualProcessComponent__c> cmps = [SELECT Id, Name,
                                                        Label__c,
                                                        Parent__c,
                                                        Type__r.Name
                                                    FROM VisualProcessComponent__c
                                                    WHERE Visual_Process__c = :visualProcessId];

            if(cmps.size() == 0)
                return null;

            for(VisualProcessComponent__c cmp : cmps){
                if(cmp.Type__r.Name == 'step'){
                    c = new Map<String, Object>();
                    c.put('sfId', cmp.Id);
                    c.put('name', cmp.Name);
                    c.put('label', cmp.Label__c);
                    c.put('type', 'step');
                    c.put('childs', new List<Map<String, Object>>());
                    
                    retFlow.add(c);
                }
            }
    
            return retFlow;

        } catch(Exception ex){
            throw new AuraHandledException('Exception: ' + ex.getMessage() + ' - ' + ex.getStackTraceString());
        }
    }
}