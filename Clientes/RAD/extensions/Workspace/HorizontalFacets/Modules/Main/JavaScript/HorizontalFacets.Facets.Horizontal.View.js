
define('HorizontalFacets.Facets.Horizontal.View', [
    'facets_horizontal_view.tpl',
    'SCView',
    'jQuery',
    'Utils',
    'underscore'
], function FacetsHorizontalViewModule(
    FacetsHorizontalViewTpl,
    SCViewComponent,
    jQuery,
    Utils,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function FacetsHorizontalView(options) {
        var windowResizeFn;
        var self = this;

        SCView.call(this);

        this.options = options || {};
        this.template = FacetsHorizontalViewTpl;

        this.layout = options.application.getComponent('Layout');

        this.deviceType = Utils.getDeviceType();

        if (!SC.isPageGenerator()) {
            windowResizeFn = _.debounce(function windowResizeDebounced() {
                if (self.deviceType !== Utils.getDeviceType()) {
                    window.dispatchEvent(new CustomEvent('renderHorizontalFacet'));
                }
            }, 100);

            this.windowResizeHandler = _.bind(windowResizeFn, this);

            jQuery(window).on('resize', this.windowResizeHandler);
        }

        this.layout.on('afterShowContent', function afterShowContent() {
            self.reattachFacetMenu(jQuery('.facets-horizontal-nav-container'));

            jQuery('body').on('click', self.hideFacetMenu);
        });
    }

    FacetsHorizontalView.prototype = Object.create(SCView.prototype);

    FacetsHorizontalView.prototype.constructor = FacetsHorizontalView;

    FacetsHorizontalView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="show-facet-menu"]': 'showFacetMenu'
        };
    };

    FacetsHorizontalView.prototype.render = function render() {
        SCView.prototype.render.apply(this, arguments);
    };

    FacetsHorizontalView.prototype.reattachFacetMenu = function reattachFacetMenu($targetContainer) {
        var $facetContainer;

        if (Utils.isDesktopDevice()) {
            $facetContainer = jQuery('.facets-facet-browse-facets').detach();
            $targetContainer.append($facetContainer);

            // Re-attach collapse events since the element was detached
            jQuery('[data-view="Facets.FacetedNavigationItems"] [data-toggle="collapse"]').on('click', function onCollapseClick(e) {
                var $target = jQuery(e.target);
                var closestTarget = $target.closest('[data-target]');
                var $closestTarget = jQuery(closestTarget);
                var collapseTarget = $closestTarget.data('target');
                var $collapseTarget = jQuery(collapseTarget);

                $collapseTarget.collapse('toggle');
            });
        }
    };

    FacetsHorizontalView.prototype.showFacetMenu = function showFacetMenu(e) {
        var $target = jQuery(e.target);
        var facetId = $target.data('facet-id') || $target.closest('[data-facet-id]').data('facet-id');
        var closestNavContainer = $target.closest('.facets-horizontal-nav');
        var facetNavigationItemsContainer = jQuery('[data-view="Facets.FacetedNavigationItems"');

        if (!jQuery.contains(facetNavigationItemsContainer[0], $target[0])) {
            // Move the facet menu so it can be properly displayed on the screen right below the selected menu
            this.reattachFacetMenu($target);

            window.dispatchEvent(new CustomEvent('displayHorizontalFacet', { detail: { id: facetId } }));

            if ($target.hasClass('collapsed')) {
                $target.removeClass('collapsed');
                jQuery('.facets-horizontal-nav').not(closestNavContainer).addClass('collapsed');
            }

            jQuery('.facets-facet-browse-facets').fadeIn();
        }
    };

    FacetsHorizontalView.prototype.hideFacetMenu = function hideFacetMenu(e) {
        var $target = jQuery(e.target);
        var $container = jQuery('.facets-horizontal-nav-container');

        if (
            Utils.isDesktopDevice()
            && !jQuery.contains($container[0], $target[0])
        ) {
            e.stopPropagation();
            jQuery('.facets-horizontal-nav').addClass('collapsed');
            jQuery('.facets-facet-browse-facets').fadeOut();
        }
    };

    FacetsHorizontalView.prototype.getContext = function getContext() {
        var self = this;
        var translator = this.options.translator;
        var facetsConfig = translator.configuration.facets;

        this.standaloneFacets = [];

        _.each(this.options.facets, function eachFacet(facet) {
            var facetConfig = _.find(facetsConfig, function findFacetConfig(config) {
                return config.id === facet.id || config.id === facet.url;
            });

            if (facetConfig && facetConfig.standaloneFacet) {
                self.standaloneFacets.push({
                    name: facetConfig.name,
                    id: facet.id
                });
            }
        });

        return {
            standaloneFacets: this.standaloneFacets
        };
    };

    return FacetsHorizontalView;
});

