<aura:application controller="VisualProcessGetData" access="global" extends="ltng:outApp" >
    <aura:dependency resource="c:VisualProcessRenderer"/>
    
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    
    <aura:attribute name="urlParameters" type="Object"/>
</aura:application>