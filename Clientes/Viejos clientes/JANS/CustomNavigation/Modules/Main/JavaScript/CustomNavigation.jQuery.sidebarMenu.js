define('CustomNavigation.jQuery.customSidebarMenu', [
    'jQuery'
], function CustomNavigationjQueryCustomSidebarMenuModule(
    jQuery
) {
    'use-strict';

    var detectAnimationSupport = function detectAnimationSupport() {
        var i = 0;
        var domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');
        var elm = document.createElement('div');

        if (elm.style.animationName !== undefined) {
            return true;
        }

        for (i; i < domPrefixes.length; i++) {
            if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                return true;
            }
        }

        return false;
    };

    var menu = function menu(el) {
        var animating = false;
        var hasAnimationSupport = detectAnimationSupport();
        var classNames = {
            menuOpened: 'header-sidebar-menu-opened',
            menuPath: 'header-sidebar-menu-path',
            menuTransition: 'header-sidebar-menu-transition',
            animateIn: 'header-sidebar-menu-flyer-in',
            animateOut: 'header-sidebar-menu-flyer-out',
            flyer: 'header-sidebar-menu-flyer'
        };
        var heightStack = [];
        var rootUl = {};
        var animate = function animate(subMenu, animationClass, cb) {
            var flyerMenu = subMenu.clone(false);

            flyerMenu
                .removeClass()
                .addClass(classNames.flyer)
                .insertAfter(rootUl)
                .addClass(animationClass);

            if (animationClass === classNames.animateIn) {
                heightStack.push(rootUl.height());
                rootUl.css('height', flyerMenu.height());
            } else {
                rootUl.css('height', heightStack.pop());
            }

            flyerMenu.data('callback', cb);

            if (!hasAnimationSupport) {
                if (cb) {
                    cb();
                }
                flyerMenu.remove();
                animating = false;
                rootUl.addClass(classNames.menuTransition); // fix ios transition glitch
            }
        };
        var wrapper = el;
        var lastOpenedMenu = wrapper;
        var flyerClassName = '';

        rootUl = wrapper.find('.header-sidebar-menu:first');

        // initializing menu
        lastOpenedMenu.addClass(classNames.menuPath);
        lastOpenedMenu.addClass(classNames.menuOpened);

        jQuery(rootUl).on('click', '[data-action="push-menu"]', function On(e) {
            var parentLi = {};
            var pushingMenu = {};
            var anchor = {};

            e.preventDefault();
            e.stopPropagation();

            if (animating === true) {
                return;
            }
            animating = true;

            anchor = jQuery(this);
            parentLi = anchor.closest('li');
            pushingMenu = anchor.next();

            animate(pushingMenu, classNames.animateIn, function anim() {
                // change the last opened menu.
                lastOpenedMenu.removeClass(classNames.menuOpened);
                lastOpenedMenu = parentLi;

                // add current opened subview
                parentLi.addClass(classNames.menuPath).addClass(classNames.menuOpened);
            });
        });

        jQuery(rootUl).on('click', '[data-action="pop-menu"]', function (e) {
            var anchor = {};
            var anchorMenu = {};
            var openedLi = {};

            e.preventDefault();
            e.stopPropagation();

            if (animating === true) {
                return;
            }
            animating = true;

            anchor = jQuery(this); // anchor is the back button
            anchorMenu = anchor.closest('ul');
            openedLi = anchor.closest('.' + classNames.menuOpened);

            openedLi.removeClass(classNames.menuPath).removeClass(classNames.menuOpened);

            lastOpenedMenu = openedLi.closest('.' + classNames.menuPath);
            lastOpenedMenu.addClass(classNames.menuOpened);
            animate(anchorMenu, classNames.animateOut);
        });

        flyerClassName = '.' + classNames.flyer;
        jQuery(wrapper).on(
            'animationend MSAnimationEnd oAnimationEnd webkitAnimationEnd',
            flyerClassName,
            function () {
                var cb = jQuery(this).data('callback');
                if (cb) {
                    cb();
                }

                jQuery(this).remove();
                animating = false;
                rootUl.addClass(classNames.menuTransition); // fix ios transition glitch
            }
        );
    };

    // this is how you define a plugin of jQuery, then you call jQuery to call this
    jQuery.fn.customSidebarMenu = function () {
        return this.each(function () {
            menu(jQuery(this));
        });
    };

    return jQuery.fn.customSidebarMenu;
});
