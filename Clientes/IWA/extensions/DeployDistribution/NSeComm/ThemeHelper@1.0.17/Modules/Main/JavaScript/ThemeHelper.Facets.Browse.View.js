/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Facets.Browse.View', [
    'Facets.Browse.View',
    'themehelper_facets_facet_browse.tpl',
    'facets_items_collection.tpl',
    'facets_items_collection_view_cell.tpl',
    'facets_items_collection_view_row.tpl',
    'Facets.ItemCell.View',
    'Backbone.CollectionView',
    'underscore',
    'themehelper_facets_item_cell_grid.tpl',
    'themehelper_facets_item_cell_list.tpl',
    'themehelper_facets_item_cell_table.tpl'
], function ThemeHelperFacetsBrowseView(
    FacetsBrowseView,
    facetsBrowseViewTpl,
    facetsItemsCollectionTpl,
    facetsItemsCollectionViewCellTpl,
    facetsItemsCollectionViewRowTpl,
    FacetsItemCellView,
    BackboneCollectionView,
    _
) {
    'use strict';

    _.extend(FacetsBrowseView.prototype, {
        template: facetsBrowseViewTpl,

        childViews: _.extend(FacetsBrowseView.prototype.childViews || {}, {
            'Facets.Items': function FacetsItems() {
                var self = this;
                var displayOption;

                this.itemsDisplayOptions[0].template = 'themehelper_facets_item_cell_list.tpl';
                this.itemsDisplayOptions[1].template = 'themehelper_facets_item_cell_table.tpl';
                this.itemsDisplayOptions[2].template = 'themehelper_facets_item_cell_grid.tpl';

                displayOption = _.find(this.itemsDisplayOptions, function find(option) {
                    return option.id === self.translator.getOptionValue('display');
                });

                return new BackboneCollectionView({
                    childTemplate: displayOption.template,
                    childView: FacetsItemCellView,
                    childViewOptions: {
                        application: this.application
                    },
                    viewsPerRow: parseInt(displayOption.columns, 10),
                    collection: this.model.get('items'),
                    cellTemplate: facetsItemsCollectionViewCellTpl,
                    rowTemplate: facetsItemsCollectionViewRowTpl,
                    template: facetsItemsCollectionTpl,
                    context: {
                        keywords: this.translator.getOptionValue('keywords')
                    }
                });
            }
        })
    });
});
