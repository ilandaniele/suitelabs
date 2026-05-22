define('SchemaOrg.BaseModule', [
    'underscore'
], function SchemaOrgBaseModule(
    _
) {
    'use strict';

    return {
        init: function initialize(options) {
            _.extend(this, options);
            this.addToPusher();
        },

        moduleType: 'jsonLD',

        addToPusher: function addToPusher() {
            try {
                this.pusher.modulesToPush[this.moduleType] = JSON.stringify(this.createJSONLD());
                this.pusher.pushData();
            } catch (e) {
                // eslint-disable-next-line
                console.log('Schema Error:', e);
                return this;
            }
            return this;
        },

        createJSONLD: function createJSONLD() {
            return {};
        }
    };
});
