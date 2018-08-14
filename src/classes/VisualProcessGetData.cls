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
        	System.debug('visualProcessId: ' + visualProcessId);
        	
            List<Map<String, Object>> retFlow = new List<Map<String, Object>>(); 
            Map<String, Object> c; 

            List<VisualProcessComponent__c> cmps = [SELECT Id, Name,
                                                        Label__c,
                                                        Parent__c,
                                                        Type__r.Name,
                                                        Position__c,
                                                        IsContainer__c,
                                                        (SELECT Id, Name, Label__c,Type__r.Name, Type__r.Label__c,Position__c FROM Visual_Process_Components__r ORDER BY Position__c ASC)
                                                    FROM VisualProcessComponent__c
                                                    WHERE Visual_Process__c = :visualProcessId
                                                    ORDER By Position__c];

			System.debug('cmps: ' + cmps);

            if(cmps.size() == 0)
                throw new AuraHandledException('No configured components');

            for(VisualProcessComponent__c cmp : cmps){
                if(cmp.Type__r.Name == 'step'){
                    c = new Map<String, Object>();
                    c.put('sfId', cmp.Id);
                    c.put('name', cmp.Name);
                    c.put('label', cmp.Label__c);
                    c.put('type', cmp.Type__r.Name);
                    c.put('position', cmp.Position__c);
                    //c.put('childs', new List<Map<String, Object>>());
                    c.put('isContainer', cmp.IsContainer__c);
                    
                    List<Map<String, Object>> childs = new List<Map<String, Object>>();
                    Map<String, Object> mapCmp;

                    for(VisualProcessComponent__c child : cmp.Visual_Process_Components__r){
                        mapCmp = new Map<String, Object>();
                        mapCmp.put('sfId', child.Id);
                        mapCmp.put('name', child.Name);
                        mapCmp.put('label', child.Label__c);
                        mapCmp.put('type', child.Type__r.Name);
                        mapCmp.put('position', child.Position__c);
                        mapCmp.put('typeLabel', child.Type__r.Label__c);
                        childs.add(mapCmp);
                    }

                    c.put('childs', childs);

                    retFlow.add(c);
                }
            }
    
            return retFlow;
        } catch(AuraHandledException aEx){
			throw aEx;
        } catch(Exception ex){
            throw new AuraHandledException('Exception: ' + ex.getMessage() + ' - ' + ex.getStackTraceString());
        }
    }
}