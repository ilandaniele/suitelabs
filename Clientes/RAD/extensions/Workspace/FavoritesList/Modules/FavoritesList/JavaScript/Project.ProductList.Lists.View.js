define('Project.ProductList.Lists.View', [
    'ProductList.Lists.View',
    'Backbone.CollectionView',
    'ProductList.ListDetails.View',
    'Utils',
    'Backbone',
    'underscore'
], function ProjectProductListListsView(
    ProductListListsView,
    BackboneCollectionView,
    ProductListListDetailsView,
    Utils,
    Backbone,
    _
) {
    'use strict';

    _.extend(ProductListListsView.prototype, {
        childViews: _.extend(ProductListListsView.prototype.childViews, {
            'ProductList.ListDetails': function ProductListListDetails() {
                var noFavoriteCollection = this.collection.clone();
                var defaultTemplate = this.application.getConfig('productList.listTemplates');
                defaultTemplate = defaultTemplate && defaultTemplate.length && defaultTemplate[0];
                if (defaultTemplate && defaultTemplate.name) {
                    noFavoriteCollection.remove(this.collection.findWhere({ name: defaultTemplate.name }));
                }
                return new BackboneCollectionView({
                    childView: ProductListListDetailsView,
                    viewsPerRow: 1,
                    collection: noFavoriteCollection
                });
            }
        }),
        navigateToItems: function navigateToItems(e) {
            var list;
            var internalid;
            var url;
            if (Utils.isTargetActionable(e)) {
                return;
            }
            list = this.getCurrentList(e);
            internalid = list.get('internalid');
            url = '/project/' + (internalid || 'tmpl_' + list.get('templateid'));
            Backbone.history.navigate(url, { trigger: true });
        }
    });
});
