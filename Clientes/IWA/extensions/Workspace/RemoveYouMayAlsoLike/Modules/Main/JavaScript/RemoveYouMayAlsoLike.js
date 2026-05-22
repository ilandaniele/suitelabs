
define('RemoveYouMayAlsoLike', [
], function RemoveYouMayAlsoLikeModule(
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');

            cart.removeChildView('Related.Items');
        }
    };
});
