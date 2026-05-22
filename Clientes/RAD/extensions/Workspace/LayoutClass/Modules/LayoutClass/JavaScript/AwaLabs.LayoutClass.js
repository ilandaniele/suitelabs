define("AwaLabs.LayoutClass", [
    'underscore'
], function AwaLabsLayoutClass(
    _
){
    'use strict';

    return {
        addClassToLayout: function addClassToLayout(Layout,view){
            Layout.$('#layout').removeClass().addClass(this.layoutClass).addClass('sec_'+view.template.Name);
        },
        mountToApp: function(application){
            var Layout = application.getLayout();
            var self = this;
            Layout.once('afterAppendView',function(view){
                self.layoutClass = Layout.$('#layout').attr('class');
                self.addClassToLayout(Layout,view);
                Layout.on('afterAppendView',function(view){
                    if(!view.inModal){
                        self.addClassToLayout(Layout,view);
                    }
                });
            });
        }
    }
});
