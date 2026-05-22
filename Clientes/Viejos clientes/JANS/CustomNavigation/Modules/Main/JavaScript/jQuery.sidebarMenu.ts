import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';

function Menu(el) {
    const wrapper = el;
    let lastOpenedMenu = wrapper;
    const rootUl = wrapper.find('.header-sidebar-menu:first');
    let animating = false;
    const hasAnimationSupport = detectAnimationSupport();
    const classNames = {
        menuOpened: 'header-sidebar-menu-opened',
        menuPath: 'header-sidebar-menu-path',
        menuTransition: 'header-sidebar-menu-transition',
        animateIn: 'header-sidebar-menu-flyer-in',
        animateOut: 'header-sidebar-menu-flyer-out',
        flyer: 'header-sidebar-menu-flyer'
    };
    const heightStack = [];

    // initializing menu
    lastOpenedMenu.addClass(classNames.menuPath);
    lastOpenedMenu.addClass(classNames.menuOpened);

    jQuery(rootUl).on('click', '[data-action="push-menu"]', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (animating === true) {
            return;
        }
        animating = true;

        const anchor = jQuery(this);
        const parentLi = anchor.closest('li');
        const pushingMenu = anchor.next();

        animate(pushingMenu, classNames.animateIn, function() {
            // change the last opened menu.
            lastOpenedMenu.removeClass(classNames.menuOpened);
            lastOpenedMenu = parentLi;

            // add current opened subview
            parentLi.addClass(classNames.menuPath).addClass(classNames.menuOpened);
        });
    });

    jQuery(rootUl).on('click', '[data-action="pop-menu"]', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (animating === true) {
            return;
        }
        animating = true;

        const anchor = jQuery(this); // anchor is the back button
        const anchorMenu = anchor.closest('ul');
        const openedLi = anchor.closest('.' + classNames.menuOpened);

        openedLi.removeClass(classNames.menuPath).removeClass(classNames.menuOpened);

        lastOpenedMenu = openedLi.closest('.' + classNames.menuPath);
        lastOpenedMenu.addClass(classNames.menuOpened);
        animate(anchorMenu, classNames.animateOut);
    });

    const flyerClassName = '.' + classNames.flyer;
    jQuery(wrapper).on(
        'animationend MSAnimationEnd oAnimationEnd webkitAnimationEnd',
        flyerClassName,
        function() {
            const cb = jQuery(this).data('callback');
            if (cb) {
                cb();
            }

            jQuery(this).remove();
            animating = false;
            rootUl.addClass(classNames.menuTransition); // fix ios transition glitch
        }
    );

    function animate(subMenu, animationClass, cb?) {
        const flyerMenu = subMenu.clone(false);

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
    }
}

function detectAnimationSupport(): boolean {
    const domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');
    const elm = document.createElement('div');

    if (elm.style.animationName !== undefined) {
        return true;
    }

    let i = 0;

    for (i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            return true;
        }
    }

    return false;
}

(jQuery.fn as any).sidebarMenu = function() {
    return this.each(function() {
        Menu(jQuery(this));
    });
};

export = (jQuery.fn as any).sidebarMenu;
