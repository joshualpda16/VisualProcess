<aura:application extends="force:slds" 
                  implements="force:appHostable" 
                  controller="VisualProcessComponentsUpdateController">
                  
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    <aura:handler event="c:VisualProcessEventAddComponent" action="{!c.addComponentHandler}"/>
    <aura:handler event="c:VisualProcessEventRemoveComponent" action="{!c.removeComponentHandler}"/>
    <aura:handler event="c:VisualProcessEventEditComponent" action="{!c.editComponentHandler}"/>
    <aura:handler event="c:VisualProcessEventEditComponentsPosition" action="{!c.editComponentsPositionHandler}"/>
    
    <aura:registerEvent name="SfIdLocalUpdate" type="c:VisualProcessEventSfIdLocalUpdate"/>
    <aura:registerEvent name="NotifyEvent" type="c:VisualProcessEventNotifyUpdate"/>
    
    <aura:attribute name="VisualProcessId" type="String" default="a0H6A000004Kd0CUAS" />
    
    <html style="height: 100%">
        <body style="height: 100%">
            <c:VisualProcessDesigner ></c:VisualProcessDesigner>
        </body>
    </html>
</aura:application>