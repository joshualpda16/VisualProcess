global class VisualProcessComponentDynamicPicklist extends VisualEditor.DynamicPickList {
    
    global override VisualEditor.DataRow getDefaultValue(){
    	return null;
    }
    
    global override VisualEditor.DynamicPickListRows getValues() {
        VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();
        
        List<Visual_Process__c> vps = [SELECT Name FROM Visual_Process__c];
        
        for(Visual_Process__c vp : vps){
	        myValues.addRow(new VisualEditor.DataRow(vp.Name, String.ValueOf(vp.Id)));
        }
        
        return myValues;
    }
    
}