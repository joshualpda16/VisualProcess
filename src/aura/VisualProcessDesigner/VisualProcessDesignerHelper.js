({
	longComponent: function(cmp) {
        $A.util.removeClass(cmp,'short-element');
        //$A.util.addClass(cmp,'long-element');
    },
    
    shortComponent: function(cmp) {
        $A.util.removeClass(cmp,'long-element');
        $A.util.addClass(cmp,'short-element');
    },
    
    showComponent: function(cmp) {
        $A.util.removeClass(cmp,'hide-element');
        $A.util.addClass(cmp,'show-element');
    },
    
    hideComponent: function(cmp) {
        $A.util.removeClass(cmp,'show-element');
        $A.util.addClass(cmp,'hide-element');
    }
})