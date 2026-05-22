define('DynamicHeight.Facets.Browse.View', [
    'Facets.Browse.View',
    'FacetsItemsCollectionView',
    'jQuery',
    'underscore'
], function DynamicHeightFacetsBrowseView(
    FacetsBrowseView,
    FacetsItemsCollectionViewModule,
    jQuery,
    _
) {
    'use strict';

    var FacetsItemsCollectionView = FacetsItemsCollectionViewModule.FacetsItemsCollectionView;

    _.extend(FacetsBrowseView.prototype, {
        initialize: _.wrap(FacetsBrowseView.prototype.initialize, function initialize(fn) {
            var windowResizeFn;
            var viewsPerRow;
            var self = this;

            fn.apply(this, _.toArray(arguments).slice(1));

            this.viewsPerRow = this.getViewsPerRow();

            if (!SC.isPageGenerator()) {
                windowResizeFn = _.debounce(function windowResizeDebounced() {
                    viewsPerRow = self.getViewsPerRow();
                    if (viewsPerRow !== self.viewsPerRow) {
                        self.viewsPerRow = viewsPerRow;
                        self.render();
                    }
                }, 100);

                this.windowResizeHandler = _.bind(windowResizeFn, this);

                jQuery(window).on('resize', this.windowResizeHandler);
            }
        }),

        getViewsPerRow: function getViewsPerRow() {
            var xs = matchMedia('(max-width: 480px)');
            var s = matchMedia('(max-width: 768px)');
            var m = matchMedia('(max-width: 992px)');
            var viewsPerRow = 4;

            if (xs.matches) {
                viewsPerRow = 2;
            } else if (s.matches) {
                viewsPerRow = 2;
            } else if (m.matches) {
                viewsPerRow = 3;
            }

            return viewsPerRow;
        },

        getDisplayOption: function getDisplayOption() {
            var self = this;

            return _.find(this.itemsDisplayOptions, function findDisplayOption(option) {
                return option.id === self.translator.getOptionValue('display');
            });
        },

        childViews: _.extend(FacetsBrowseView.prototype.childViews, {
            'Facets.Items': function FacetsItems() {
                var displayOption = this.getDisplayOption();

                return new FacetsItemsCollectionView({
                    application: this.application,
                    keywords: this.translator.getOptionValue('keywords'),
                    collection: this.model.get('items').models,
                    viewsPerRow: this.viewsPerRow,
                    cellViewTemplate: displayOption.template
                });
            }
        })
    });
});
