define('AwaLabs.SchemaOrg', [
    'Backbone',
    'Backbone.View',
    'SchemaOrg.Breadcrumb',
    'SchemaOrg.Organization',
    'SchemaOrg.Product',
    'SchemaOrg.ProductList',
    'SchemaOrg.RelatedItems',
    'SchemaOrg.CorrelatedItems',
    'jQuery',
    'underscore'
], function AwaLabsNProgress(
    Backbone,
    BackboneView,
    SchemaOrgBreadcrumb,
    SchemaOrgOrganization,
    SchemaOrgProduct,
    SchemaOrgProductLis,
    SchemaOrgRelatedItems,
    SchemaOrgCorrelatedItems,
    jQuery,
    _
) {
    'use strict';

    var SchemaOrgModule = {
        viewsConfig: {
            facets_facet_browse: {
                schemaModule: SchemaOrgProductLis,
                fn: 'executeSchemaOrgOnViewRender'
            },
            global_views_breadcrumb: {
                schemaModule: SchemaOrgBreadcrumb,
                fn: 'executeSchemaOrgOnViewRender'
            },
            home: {
                schemaModule: SchemaOrgOrganization,
                fn: 'executeSchemaOrgOnViewRender'
            },
            product_details_full: {
                schemaModule: SchemaOrgProduct,
                fn: 'executeSchemaOrgOnViewRender'
            },
            item_relations_related: {
                schemaModule: SchemaOrgRelatedItems,
                fn: 'executeSchemaOrgOnViewRender'
            },
            item_relations_correlated: {
                schemaModule: SchemaOrgCorrelatedItems,
                fn: 'executeSchemaOrgOnViewRender'
            },
            product_reviews_center: {
                fn: 'updateSchemaOrgWithReviews'
            }
        },

        updateSchemaOrgWithReviews: function updateSchemaOrgWithReviews(view) {
            if (view.collection.length) {
                Backbone.Events.trigger('SchemaOrg:Reviews', view.collection);
            }
        },

        executeSchemaOrgOnViewRender: function executeSchemaOrgOnViewRender(view, viewOptions) {
            viewOptions.schemaModule.init({ view: view, pusher: this, application: this.application });
        },

        modulesToPush: {},

        pushData: function pushData() {
            var scriptTag = null;
            jQuery('#json-ld-schema').empty();
            jQuery('[type="application/ld+json"]').remove();
            _.each(this.modulesToPush, function fnEach(jsonLD) {
                if (SC.isPageGenerator()) {
                    scriptTag = document.createElement('script');
                    scriptTag.setAttribute('type', 'application/ld+json');
                    scriptTag.innerHTML = jsonLD;
                    jQuery('#json-ld-schema').append(scriptTag);
                } else {
                    jQuery('#json-ld-schema').append('<script type="application/ld+json">' + jsonLD + '</script>');
                }
            });
        },

        mountToApp: function monuntToApp(application) {
            this.application = application;
            jQuery('body').prepend('<div id="json-ld-schema"></div>');
        }
    };

    // Trigger Schema modules based on view that is render
    // eslint-disable-next-line
    BackboneView.prototype._render = _.wrap(BackboneView.prototype._render, function wrapRender(fn) {
        var originalRender = fn.apply(this, _.toArray(arguments).slice(1));
        var viewRenderOptions = SchemaOrgModule.viewsConfig[this.template.Name];
        if (viewRenderOptions && SchemaOrgModule[viewRenderOptions.fn]) {
            SchemaOrgModule[viewRenderOptions.fn](this, viewRenderOptions);
        }
        this.$('[itemscope]').removeAttr('itemscope');
        this.$('[itemprop]').not('[itemprop="itemListElement"]').removeAttr('itemprop');
        this.$('[itemtype]').removeAttr('itemtype');
        return originalRender;
    });


    return SchemaOrgModule;
});
