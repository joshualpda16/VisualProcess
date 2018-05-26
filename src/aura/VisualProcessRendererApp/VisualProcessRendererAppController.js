({
    doInit : function(component, event, helper) {

        var sPageURL = decodeURIComponent(window.location.search.substring(1)); //You get the whole decoded URL of the page.
        var sURLVariables = sPageURL.split('&'); //Split by & so that you get the key value pairs separately in a list
        var i, sParameterName;
		var urlParameters = {};
        
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            urlParameters[sParameterName[0]] = sParameterName[1];
        }
        
        component.set("v.urlParameters", urlParameters);
        
        console.log(urlParameters);

        if(urlParameters.ltn_app_id && urlParameters.ltn_app_id !== ""){
            document.body.parentElement.style.marginLeft = '-20px';
        } else{
            document.body.parentElement.style.marginLeft = '-8px';
        }
    }
})