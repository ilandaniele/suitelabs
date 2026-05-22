define('NSeComm.AgeRestrictionPopUp',
['jQuery'],
function AgeRestrictionPopUpModule(jQuery) {
    'use strict';

    function showPopUpOnBeforeAddLine(container) {
        var SCISLayout = container.getComponent('SCISLayout');
        var message = 'The customer must be 21 or over 21 years old. Only adults over 21 are allowed to buy this item. Is the customer 21 or over 21?';
        var options = {
            title: 'Warning',
            toastType: 'info',
            toastContent: 'Is the customer 21 or over?',
            messageContent: message,
            confirmationButtonText: 'Yes',
            cancelationButtonText: 'No'
        };

        var cart = container.getComponent('Cart');

        cart.on('afterAddLine', function popUpCreation(itemLine) {
            var deferredObject = jQuery.Deferred();
            var itemID = itemLine.line.item.internalid;
            cart.getLines().then(function linesObtained(lines) {
                var item = lines.find(function isSelectedItem(actualItem) {
                    return itemID === actualItem.item.internalid;
                });

                if (item && item.item.extras.custitem_is_age_restricted) {
                    SCISLayout.showConfirmationPopup(options).then(function popUpResult(result) {
                        if (result.action === 'cancel') {
                            deferredObject.reject('The customer needs to be 21 or over.');
                            cart.voidLine({
                                line_id: item.extras.line.toString()
                            });
                            throw Error();
                        } else {
                            deferredObject.resolve();
                        }
                    });
                } else {
                    deferredObject.resolve();
                }
            });

            return deferredObject;
        });
    }

    return {
        mountToApp: function mountToApp(container) {
            showPopUpOnBeforeAddLine(container);
        }
    };
});
