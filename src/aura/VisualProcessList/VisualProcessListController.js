({
	init : function(cmp, event, helper) {
        var actions = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Delete', name: 'delete' }
        ];
            
        cmp.set('v.columns', [
            { label: 'Name', fieldName: 'name', type: 'text' },
            { label: 'Version', fieldName: 'Version__c', type: 'Integer' },
            { label: 'Created By', fieldName: 'CreatedBy', type: 'Date'},
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        
        cmp.set('v.data', [
            {
                name: "VisualProcess1"
            },
            {
                name: "VisualProcess 21"
            },
            {
                name: "VisualProcess 31"
            }
        ]);
	}
})