define('NSeComm.CustomNavigation.Main.View', [
    'nsecomm_customnavigation_main.tpl',
    'nsecomm_customnavigation_mobile.tpl',
    'SCView',
    'underscore',
    'CustomNavigation.jQuery.customSidebarMenu',
    'jQuery'
], function NSeCommCustomNavigationMainViewModule(
  NSeCommCustomNavigationMainTpl,
  NSeCommCustomNavigationMobileTpl,
  SCViewComponent,
  _,
  CustomNavigationCustomSidebarMenu,
  jQuery
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    var getDeviceType = function getDeviceType() {
        var width = jQuery(window).width();

        if (width !== undefined && width < 768) {
            return 'phone';
        }
        if (width !== undefined && width < 992) {
            return 'tablet';
        }
        return 'desktop';
    };

    function CustomNavigationView(options) {
        SCView.call(this);
        this.options = options || {};

        if (getDeviceType() !== 'desktop') {
            this.template = NSeCommCustomNavigationMobileTpl;
        } else {
            this.template = NSeCommCustomNavigationMainTpl;
        }

        this.attributes = {
            id: 'MyViewId',
            'class': 'my-view'
        };
    }

    CustomNavigationView.prototype = Object.create(SCView.prototype);
    CustomNavigationView.prototype.constructor = CustomNavigationView;
    CustomNavigationView.prototype.getContext = function getContext() {
        var environment = this.options.container.getComponent('Environment');
        var CustomNavigation = environment.getConfig('customNavigation');

        var levels = _(CustomNavigation.firstLevelLinks).map(
            function each1stLevelLink(firstLevelLink) {
                var secondLevel = {
                    icon: {},
                    title: {},
                    subtitle: {},
                    links: {},
                    thirdLevel: {}
                };

                var secondLevelLinks = _(CustomNavigation.secondLevelLinks).filter(
                    function each2ndLevelLink(secondLevelLink) {
                        return secondLevelLink.parentId === firstLevelLink.firstLevelId;
                    }
                );

                secondLevel.icon = _(secondLevelLinks).findWhere({ type: 'Icon' });
                secondLevel.title = _(secondLevelLinks).findWhere({ type: 'Title1' });
                secondLevel.subtitle = _(secondLevelLinks).findWhere({
                    type: 'Title2'
                });
                secondLevel.links = _(secondLevelLinks).filter(function eachElement(
                    secondLevelLink
                ) {
                    var thirdLevelLinks = _(CustomNavigation.thirdLevelLinks).filter(
                        function each3rdLevelLink(thirdLevelLink) {
                            return thirdLevelLink.parentId === secondLevelLink.secondLevelId;
                        }
                    );
                    if (thirdLevelLinks !== '[]') {
                        secondLevelLink.thirdLevel = thirdLevelLinks;
                    }

                    secondLevelLink.image = false;
                    if (secondLevelLink.type === 'LinkAndImage') {
                        secondLevelLink.image = true;
                    }
                    secondLevelLink.external = false;
                    if (secondLevelLink.target === '_blank') {
                        secondLevelLink.external = true;
                    }
                    return /^Link/.test(secondLevelLink.type);
                });

                firstLevelLink.secondLevel = secondLevel;

                return firstLevelLink;
            }
        );

        return {
            firstLevels: levels
        };
    };
    CustomNavigationView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        SCView.prototype.render.apply(self, args);

        if (getDeviceType() !== 'desktop') {
            this.$('[data-type="header-sidebar-menu"]').customSidebarMenu();
        }
    };

    return CustomNavigationView;
});
