define('Header.MiniProjects.View', [
    'LiveOrder.Model',
    'Header.MiniCartSummary.View',
    'Header.MiniProjectsItemCell.View',
    'Profile.Model',
    'Configuration',
    'header_mini_projects.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'underscore',
    'Utils'
], function HeaderMiniProjectsView(
    LiveOrderModel,
    HeaderMiniCartSummaryView,
    HeaderMiniProjectsItemCellView,
    ProfileModel,
    Configuration,
    headerMiniProjectsTpl,
    _,
    Backbone,
    BackboneCompositeView,
    BackboneCollectionView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniProjectsTpl,
        initialize: function initialize() {
            var self = this;
            this.projectsUtils = this.options.application.ProductListModule.Utils;
            // for loading status
            this.isLoading = true;
            this.projectsCount = 0;
            // projects projects promise
            this.projectsUtils.getProductListsPromise().done(function getProductListsPromiseDone() {
                var projectsList = self.projectsUtils.getProjetsLists();
                var productListsInstance = self.projectsUtils.getProductLists();
                self.projectsCount = projectsList.length;
                self.isLoading = false;
                self.render();
                productListsInstance.on('change', function productListsInstanceChange() {
                    projectsList = self.projectsUtils.getProjetsLists();
                    self.projectsCount = projectsList.length;
                    self.render();
                });
            });
            BackboneCompositeView.add(this);
        },
        render: function render() {
            Backbone.View.prototype.render.apply(this, arguments);
            // on tablet or desktop make the minicart dropdown
            if (_.isTabletDevice() || _.isDesktopDevice()) {
                this.$('[data-type="mini-projects"]').attr('data-toggle', 'dropdown');
            }
        },
        childViews: {
            'Header.MiniProjectsItemCell': function HeaderMiniProjectsItemCell() {
                var projects = this.projectsUtils.getProjetsLists();
                var collection = projects.map(function getProjetsListsMap(project) {
                    var id = project.id;
                    var name = project.get('name');
                    var itemsCount = project.get('items').length;
                    return {
                        id: id,
                        name: name,
                        itemsCount: itemsCount
                    };
                });
                return new BackboneCollectionView({
                    collection: !this.isLoading ? new Backbone.Collection(collection) : new Backbone.Collection(),
                    childView: HeaderMiniProjectsItemCellView,
                    viewsPerRow: 1
                });
            }
        },
        getContext: function getContext() {
            return {
                projectsCount: this.projectsCount,
                isLoading: this.isLoading,
                showLines: this.projectsCount > 0
            };
        }
    });
});
