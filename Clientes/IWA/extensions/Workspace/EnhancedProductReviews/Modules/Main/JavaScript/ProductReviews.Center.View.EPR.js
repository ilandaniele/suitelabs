define('ProductReviews.Center.View.EPR', [
    'ProductReviews.Center.View',
    'GlobalViews.Pagination.View',
    'Configuration',
    'UrlHelper',
    'Backbone',
    'underscore'
], function ProductReviewsCenterViewEPR(
    ProductReviewsCenterView,
    GlobalViewsPaginationView,
    Configuration,
    UrlHelperModule,
    Backbone,
    _
) {
    'use strict';

    _(ProductReviewsCenterView.prototype).extend({
        pager: function pager(page) {
            return page >= 1
                ? '/' + UrlHelperModule.UrlHelper.setUrlParameter(
                        Backbone.history.fragment,
                        'page',
                        page
                    )
                : '/' + UrlHelperModule.UrlHelper.removeUrlParameter(
                        Backbone.history.fragment,
                        'page'
                    );
        },

        initialize: _(ProductReviewsCenterView.prototype.initialize).wrap(
            function initialize(fn) {
                var self = this;
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                if (this.queryOptions && this.queryOptions.page) {
                    this.on('afterViewRender', function afterViewRender() {
                        _.defer(function deferredScroll() {
                            var $elem = self.$('.product-reviews-center-container');
                            var domElem = $elem.get(0);

                            if (domElem) {
                                domElem.scrollIntoView(true);
                            }
                        });
                    });
                }

                return init;
            }
        ),

        setupListHeader: _(ProductReviewsCenterView.prototype.setupListHeader).wrap(
            function setupListHeader(fn) {
                var ret = fn.apply(this, _(arguments).toArray().slice(1));

                ret.pager = this.pager;

                return ret;
            }
        ),

        childViews: _(ProductReviewsCenterView.prototype.childViews).extend({}, ProductReviewsCenterView.prototype.childViews, {
            'GlobalViews.Pagination': function GlobalViewsPagination() {
                return new GlobalViewsPaginationView(
                    _.extend(
                        {
                            currentPage: this.collection.page || 0,
                            totalPages: this.collection.totalPages || 0,
                            pager: this.pager,
                            extraClass: 'pull-right no-margin-top no-margin-bottom'
                        },
                        Configuration.get('defaultPaginationSettings')
                    )
                );
            }
        })
    });
});
