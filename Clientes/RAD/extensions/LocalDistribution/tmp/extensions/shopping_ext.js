var extensions = {};

extensions['AwaLabs.AssamblyInstructions.2.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/AssamblyInstructions/2.0.1/' + asset;
}

define('AssamblyInstructions.View', [
    'awalabs_assambly_instructions.tpl',
    'AssamblyInstructions.Modal.View',
    'Backbone'
], function AssamblyInstructionsView(
    awalabsAssamblyInstructionsTpl,
    AssamblyInstructionsModalView,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({

        template: awalabsAssamblyInstructionsTpl,
        events: {
            'click [data-action="showModal"]': 'showMessageInModal'
        },
        initialize: function initialize(options) {
            var pdp = options.application.getComponent('PDP');
            this.item = pdp.getItemInfo() ? pdp.getItemInfo().item : {};
            this.application = options.application;
            this.profile = options.profile;
        },
        showMessageInModal: function showMessageInModal() {
            var layout = this.options.application.getComponent('Layout');
            var messageModalView = new AssamblyInstructionsModalView({
                application: this.application
            });

            layout.showContent(messageModalView, { showInModal: true, options: { className: 'assambly-instructions-modal' } });
        },
        getContext: function getContext() {
            var itemAssamblyInstructions = this.item.custitem_item_assembley_instructions;

            return {
                assamblyInstrucitonsLink: itemAssamblyInstructions,
                isUserLoggedIn: this.profile.isloggedin
            };
        }
    });
});


define('AssamblyInstructions.Modal.View', [
    'awalabs_assambly_modal.tpl',
    'Backbone'
], function AssamblyInstructionsView(
    awalabsAssamblyInstructionsModalTpl,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        events: {
            'click [data-action="goToLogin"]': 'redirectToLogin'
        },
        template: awalabsAssamblyInstructionsModalTpl,
        initialize: function initialize(options) {
            this.application = options.application;
        },
        redirectToLogin: function redirectToLogin(e) {
            // To redirect the login to the item once the user logs in.
            var environmentComponent = this.application.getComponent('Environment');
            var login = environmentComponent.getConfig('siteSettings.touchpoints.login') +
                '&origin=' + environmentComponent.getConfig('currentTouchpoint') +
                '&origin_hash=' + encodeURIComponent(Backbone.history.fragment);
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();

            window.location.href = login;
        },
        getContext: function getContext() {
            var environmentComponent = this.application.getComponent('Environment');
            return {
                assamblyInstructionMessage: environmentComponent.getConfig('assamblyInstructions.message')
            };
        }
    });
});


define('AwaLabs.AssamblyInstructions', [
    'AssamblyInstructions.View'
],
function AwaLabsAssamblyInstructions(
    AssamblyInstructionsView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var profileComponent = application.getComponent('UserProfile');
            var pdp = application.getComponent('PDP');

            if (layout && profileComponent) {
                // We wait for the profile to pass it to the view.
                profileComponent.getUserProfile().then(function afterGetUserProfile(profile) {
                    layout.addChildView('AssamblyInstructions', function addChildView() {
                        return new AssamblyInstructionsView({
                            application: application,
                            profile: profile
                        });
                    });
                });

                // Hides the AssamblyInstructions data view If assembly Instructions Approved is not checked.
                layout.addToViewContextDefinition('ProductDetails.Full.View', 'showAssamblyInstructions', 'boolean',
                function addToContextshowAssamblyInstructions() {
                    var item = pdp.getItemInfo() ? pdp.getItemInfo().item : {};
                    return item.custitem98 && item.custitem_item_assembley_instructions;
                });
            }
        }
    };
});


};

extensions['AwaLabs.AutoSlider.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/AutoSlider/2.1.0/' + asset;
}

define('AwaLabs.AutoSlider', [
    'Configuration',
    'jQuery',
    'underscore'
], function AwaLabsAutoSlider(
    Configuration,
    jQuery,
    _
) {
    'use strict';

    function initSliders() {
        _.delay(function delayedInit() {
            // eslint-disable-next-line no-underscore-dangle
            var currentView = SC.Application.layout._currentView;
            var $sliders = (currentView && currentView.$('[data-autoslider]')) || [];
            var options = Configuration.bxSliderDefaults;

            _.each($sliders, function eachSlider(slider) {
                var $slider = jQuery(slider);
                var isSliderInit = $slider.data('sliderinit') === 'yes';
                if (!isSliderInit) {
                    try {
                        options = {
                            nextText: '<a class="home-slider-next-icon"><\/a>',
                            prevText: '<a class="home-slider-prev-icon"><\/a>',
                            mode: 'fade'
                        };
                    } catch (e) {
                        console.log(e);
                    }

                    $slider.bxSlider(options);
                    $slider.data('sliderinit', 'yes');
                }
            });
        }, 100);
    }

    return {
        mountToApp: function mountToApp(application) {
            application.getLayout().on('afterAppendView', function fn() {
                initSliders();
            });

            if (window.CMS) {
                window.CMS.on('page:content:set', function initSlider() {
                    initSliders();
                });
            }
        }
    };
});


};

extensions['AwaLabs.AwaFileUpload.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/AwaFileUpload/2.1.0/' + asset;
}

define('FileUpload.File.Collection', [
    'Backbone',
    'FileUpload.File.Model',
    'underscore',
    'Utils'
], function FileUploadFileCollection(
    Backbone,
    FileUploadFileModel
) {
    'use strict';

    return Backbone.Collection.extend({
        url: function url() {
            var urlSuitelet = SC.ENVIRONMENT.published.file_upload_suitelet_url;
            var urlObject = new URL(urlSuitelet);
            urlObject.hostname = Backbone.history.location.host;
            return urlObject.toString();
        },

        model: FileUploadFileModel
    });
});


define('FileUpload.File.Model', [
    'Backbone'
], function FileUploadFileModel(
    Backbone
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: function getUrlRoot() {
            var url = SC.ENVIRONMENT.published.file_upload_suitelet_url;
            var urlObject = new URL(url);
            urlObject.hostname = Backbone.history.location.host;
            return urlObject.toString();
        }
    });
});


define('FileUpload.File.Thumbnail.View', [
    'fileupload_image_thumbnail.tpl',
    'Backbone',
    'GlobalViews.Confirmation.View',
    'underscore'
], function FileUploadThumbnailView(
    fileuploadimagethumbnailtpl,
    Backbone,
    ConfirmationView,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: fileuploadimagethumbnailtpl,

        events: {
            'click [data-action="fileupload-file-remove-file"]': 'removeFileUpload'
        },

        getContext: function getContext() {
            return {
                isNew: this.options.isNew ? this.options.isNew : false,
                name: this.model.get('name'),
                fileID: this.model.get('internalid')
            };
        },

        removeFileUpload: function removeFileUpload(e) {
            var view;
            var model = this.model;

            e.preventDefault();
            view = new ConfirmationView({
                title: _.translate('Remove File Upload'),
                body: _.translate('Are you sure you want to remove this file?'),
                callBack: this.removeFile,
                className: 'credit-application-modal',
                callBackParameters: {
                    context: this,
                    model: model
                },
                autohide: true
            });
            this.options.application.getLayout().showInModal(view);
        },

        removeFile: function removeFile(options) {
            options.model.destroy();
        }

    });
});


define('FileUpload.File.View', [
    'fileupload.tpl',
    'FileUpload.File.Collection',
    'FileUpload.File.Model',
    'FileUpload.File.Thumbnail.View',
    'Backbone.CollectionView',
    'Backbone',
    'underscore',
    'jQuery'
], function FileUploadFileView(
    fileuploadtpl,
    FileUploadFileCollection,
    FileUploadFileModel,
    FileUploadFileThumbnailView,
    BackboneCollectionView,
    Backbone,
    _,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: fileuploadtpl,

        events: {
            'change [name="fileupload-uploader"]': 'uploadFile'
        },

        childViews: {
            'FileUpload.FileThumbnail': function fnFileUploadFileThumbnailView() {
                return new BackboneCollectionView({
                    collection: this.collection,
                    childView: FileUploadFileThumbnailView,
                    viewsPerRow: 5,
                    childViewOptions: {
                        application: this.application,
                        isNew: true
                    }
                });
            }
        },

        initialize: function initialize(options) {
            var self = this;
            this.collection = new FileUploadFileCollection();
            this.model = options.model;
            this.application = options.application;
            this.maxFiles = options.maxFiles || 1;

            this.collection.on('add sync remove', function reRender() {
                self.render();
                self.model.set('files', self.collection.map(function setAttr(model) {
                    return model.attributes;
                }));
            });
        },

        uploadFile: function uploadFile(e) {
            var files = e.currentTarget.files;
            var File;
            var formData;
            var self = this;
            jQuery('#loading_file').toggleClass('hidden');
            jQuery(e.currentTarget).attr('disabled', true);
            if (files && files.length > self.maxFiles) {
                jQuery('#loading_file').toggleClass('hidden');
                self.showError(_(self.maxFiles + ' file(s) limit has been exceeded').translate());
            } else {
                _.each(files, function eachFile(file) {
                    if (self.collection.length >= self.maxFiles) {
                        jQuery('#loading_file').toggleClass('hidden');
                        self.showError(_(self.maxFiles + ' file(s) limit has been exceeded').translate());
                    } else {
                        File = new FileUploadFileModel(file);
                        formData = new FormData();
                        formData.append('file', file);

                        File.save(file, {
                            processData: false,
                            contentType: false,
                            cache: false,
                            data: formData,
                            beforeSend: function beforeSend() {}
                        }).done(function caseFileSaveDone(data) {
                            jQuery(e.currentTarget).attr('disabled', false);
                            jQuery('#loading_file').toggleClass('hidden');
                            if (self.collection.length <= 9) {
                                self.collection.add(new FileUploadFileModel(_.extend(data, { internalid: data.internalid })));
                            } else {
                                self.showError(_('10 files limit has been exceeded').translate());
                            }
                        });
                    }
                });
            }
        }
    });
});


define('AwaLabs.FileUpload', [
    'FileUpload.File.View'
], function AwaLabsFileUpload() {
    'use strict';
});


};

extensions['AwaLabs.BackInStockNotification.2.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/BackInStockNotification/2.0.1/' + asset;
}

define('BackInStockNotification.PDP.View', [
    'underscore',
    'Profile.Model',
    'suitecommerce_stocknotifications_pdp.tpl',
    'SuiteCommerce.StockNotifications.PDP'
], function BackInStockNotificationPDPView(
    _,
    ProfileModel,
    BackinStockTemplateCustom
) {
    'use strict';

    var SuiteCommerceStockNotificationsPDPView;
    var SuiteCommerceStockNotificationsPDP;
    var PDPModel1;

    try {
        SuiteCommerceStockNotificationsPDPView = require('SuiteCommerce.StockNotifications.PDP.View'); // eslint-disable-line global-require
        SuiteCommerceStockNotificationsPDP = require('SuiteCommerce.StockNotifications.PDP'); // eslint-disable-line global-require
        PDPModel1 = require('SuiteCommerce.StockNotifications.PDP.Model'); // eslint-disable-line global-require
        if (SuiteCommerceStockNotificationsPDPView && SuiteCommerceStockNotificationsPDPView.PdpView &&
            SuiteCommerceStockNotificationsPDPView && SuiteCommerceStockNotificationsPDPView.PdpView.prototype) {
            _.extend(SuiteCommerceStockNotificationsPDPView.PdpView.prototype, {
                template: BackinStockTemplateCustom,
                itemShouldShowStockSubscription: function itemShouldShowStockSubscription() {
                    var profile = ProfileModel.getInstance();
                    var isTrade = profile.get('isTrade');
                    var childs = this.pdp.getSelectedMatrixChilds();
                    var stockInfo = this.pdp.getStockInfo();
                    return !(isTrade || (childs && childs.length > 1) || stockInfo.isInStock);
                }
            });
        }

        _.extend(SuiteCommerceStockNotificationsPDP, {
            addPdpChildView: function addPdpChildView(container, pdp) {
                pdp.addChildViews(pdp.PDP_FULL_VIEW, {
                    'Product.Stock.Info': {
                        'StockNotifications.PDP': {
                            childViewIndex: 10,
                            childViewConstructor: function childViewConstructor() {
                                if (!pdp.getItemInfo().item.keyMapping_showGrid) {
                                    return new SuiteCommerceStockNotificationsPDPView.PdpView({
                                        pdp: pdp,
                                        container: container,
                                        model: new PDPModel1.PdpModel()
                                    });
                                }
                                return null;
                            }
                        }
                    }
                });
            }
        });
    } catch (e) {
        console.log(e); // eslint-disable-line no-console
    }
});


define('InventoryDisplay.PDP.View', [
    'underscore',
    'Profile.Model'
], function InventoryDisplayPDPView(
    _,
    ProfileModel
) {
    'use strict';

    var SuiteCommerceInventoryDisplayMessageRegularItemView;
    var InventoryDisplayConfiguration;

    try {
        /* eslint-disable global-require */
        SuiteCommerceInventoryDisplayMessageRegularItemView = require('SuiteCommerce.InventoryDisplay.Message.RegularItem.View');
        InventoryDisplayConfiguration = require('SuiteCommerce.InventoryDisplay.InventoryDisplay.Configuration');
        _.extend(SuiteCommerceInventoryDisplayMessageRegularItemView.ItemMessageView.prototype, {
            getStockMessage: function getStockMessage() {
                var profile = ProfileModel.getInstance();
                var isTrade = profile.get('isTrade');

                var stockMessage = '';
                if (this.isInStock()) {
                    stockMessage = this.item.custitem_ns_sc_ext_id_stock_message
                        || InventoryDisplayConfiguration.InventoryDisplayConfiguration.inStockMessageForRegularItems;
                    if (this.isUnderThreshold()) {
                        stockMessage = this.item.custitem_ns_sc_ext_id_low_stock_msg ||
                            InventoryDisplayConfiguration.InventoryDisplayConfiguration.lowStockMessage;
                    }
                } else if (isTrade && this.item.isbackorderable) {
                    stockMessage = this.item.custitem_ns_sc_ext_id_bo_msg
                        || InventoryDisplayConfiguration.InventoryDisplayConfiguration.backorderMessageForRegularItems;
                }
                return stockMessage;
            }
        });
    } catch (e) {
        console.log(e); // eslint-disable-line no-console
    }
});


define('BackInStockNotification.StockNotifications.Subscription.Create.View', [
    'underscore',
    'suitecommerce_stocknotifications_subscription_create.tpl'
], function BackInStockNotificationStockNotificationsSubscriptionCreateView(
    _,
    backInStockSubscriptionCustom
) {
    'use strict';

    var SuiteCommerceStockNotificationsSubscriptionCreateView;
    try {
        SuiteCommerceStockNotificationsSubscriptionCreateView =
            require('SuiteCommerce.StockNotifications.Subscription.Create.View'); // eslint-disable-line global-require
        _.extend(SuiteCommerceStockNotificationsSubscriptionCreateView.SubscriptionCreateView.prototype, {
            template: backInStockSubscriptionCustom
        });
    } catch (e) {
        console.log(e); // eslint-disable-line no-console
    }
});


define('AwaLabs.BackInStockNotification', [
    'Profile.Model',
    'BackInStockNotification.PDP.View',
    'InventoryDisplay.PDP.View',
    'BackInStockNotification.StockNotifications.Subscription.Create.View'
], function BackInStockNotification(
    ProfileModel
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var pdp = container.getComponent('PDP');
            var profile;
            var pdpInfo;
            var itemInfo;
            var itemStock;
            if (layout && pdp) {
                layout.addToViewContextDefinition('Cart.AddToCart.Button.View', 'isCurrentItemPurchasable', 'boolean', function fn(context) {
                    profile = ProfileModel.getInstance();
                    pdpInfo = pdp && pdp.getStockInfo();
                    if (profile.get('isTrade')) {
                        return true;
                    }
                    if (pdpInfo) {
                        return pdpInfo.isInStock;
                    }
                    return context.isCurrentItemPurchasable;
                });
                layout.addToViewContextDefinition('Cart.AddToCart.Button.View', 'isTradeAndNotIsBackOrderable', 'boolean', function fn() {
                    profile = ProfileModel.getInstance();
                    itemInfo = pdp && pdp.getItemInfo();
                    itemStock = pdp && pdp.getStockInfo();

                    return profile.get('isTrade') &&
                        itemInfo &&
                        itemInfo.item &&
                        !itemInfo.item.isbackorderable &&
                        itemStock &&
                        !itemStock.isInStock;
                });
            }
        }
    };
});


};

extensions['AwaLabs.BulbUpsell.2.1.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/BulbUpsell/2.1.1/' + asset;
}

define('BulbUpsell.View', [
    'Profile.Model',
    'jQuery',
    'SCView',
    'bulb_upsell.tpl',
    'underscore'
], function BulbUpsellViewModule(
    ProfileModel,
    jQuery,
    SCViewComponent,
    BulbUpsellTpl,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function BulbUpsellView(options) {
        var self = this;

        SCView.call(this);

        this.options = options || {};
        this.template = BulbUpsellTpl;
        this.contextDataRequest = ['item'];

        this.pdp = options.application.getComponent('PDP');
        this.environment = options.application.getComponent('Environment');
        this.search = options.application.getComponent('Search');

        this.profile = ProfileModel.getInstance();

        this.pdp.on('afterOptionSelection', function afterOptionSelection(event) {
            var matrixDimension;

            matrixDimension = self.getMatrixDimension();

            if (event && matrixDimension && matrixDimension.cartOptionId === event.cartOptionId) {
                self.render();
            }
        });

        this.pdp.on('afterQuantityChange', function afterQuantityChange() {
            self.render();
        });
    }

    BulbUpsellView.prototype = Object.create(SCView.prototype);

    BulbUpsellView.prototype.constructor = BulbUpsellView;

    BulbUpsellView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="select-bulb"]': 'selectBulb'
        };
    };

    BulbUpsellView.prototype.getBulbPreferences = function getBulbPreferences() {
        var customFields;
        var selectedBulb;
        var normalBulb;
        var frostedBulb;
        var noBulb;

        if (this.profile.get('isLoggedIn') === 'T') {
            customFields = this.profile.get('customfields');
            normalBulb = _.findWhere(customFields, { name: 'custentity_bulb_option_selected' }) || {};
            frostedBulb = _.findWhere(customFields, { name: 'custentity_bulb_frosted_selected' }) || {};
            noBulb = _.findWhere(customFields, { name: 'custentity_no_bulb_option_selected' }) || {};

            normalBulb = (noBulb.value === 'F' && normalBulb.value === 'T')
                || (noBulb.value === 'F' && normalBulb.value === 'F' && frostedBulb.value === 'F');
            frostedBulb = noBulb.value === 'F' && frostedBulb.value === 'T';
        } else {
            selectedBulb = localStorage.getItem('selectedBulb');
            noBulb = selectedBulb === 'none';
            normalBulb = !selectedBulb || (!noBulb && selectedBulb === 'normal');
            frostedBulb = selectedBulb && !noBulb && selectedBulb === 'frosted';
        }

        return {
            normal: normalBulb,
            frosted: frostedBulb
        };
    };

    BulbUpsellView.prototype.selectBulb = function selectBulb(e) {
        var $target = jQuery(e.currentTarget);
        var $input = $target.find('input');
        var selectedBulb = $target.data('type');
        var self = this;
        var isChecked = $input.prop('checked');
        var selectedValue;

        if (jQuery(e.target).is('label')) {
            this.$('.bulbupsell-main-wrapper input').prop('checked', false);
            $input.prop('checked', !isChecked);
        } else {
            this.$('.bulbupsell-main-wrapper input').not(e.target).prop('checked', false);
        }

        if ($input.prop('checked') && selectedBulb === 'normal') {
            selectedValue = 'normal';
        } else if ($input.prop('checked') && selectedBulb === 'frosted') {
            selectedValue = 'frosted';
        } else {
            selectedValue = 'none';
        }

        if (this.profile.get('isLoggedIn') === 'T') {
            this.$('.bulbupsell-main-wrapper input').prop('disabled', true);
            this.profile.set('selectedBulb', selectedValue);
            this.profile.set('skipLoginDontUpdateProfile', true);

            this.profile.save().then(function afterProfileSave() {
                self.profile.unset('skipLoginDontUpdateProfile', { silent: true });
                self.$('.bulbupsell-main-wrapper input').prop('disabled', false);
                self.render();
            });
        } else {
            localStorage.setItem('selectedBulb', selectedValue);
            this.render();
        }
    };

    BulbUpsellView.prototype.getAvailableBulbsPrices = function getAvailableBulbsPrices(availableBulbs) {
        var promise = jQuery.Deferred();
        var searchUrl;
        var self = this;

        if (availableBulbs && availableBulbs.length) {
            searchUrl = this.search.getUrl({
                id: _.pluck(availableBulbs, 'internalid').join(','),
                fieldset: 'bulbs',
                apiMasterOptions: 'bulbs'
            });

            jQuery
            .get(searchUrl)
            .done(function afterBulbsRequest(response) {
                var price;
                var bulb;
                var i;

                if (response.items) {
                    for (i = 0; i < response.items.length; i++) {
                        bulb = _.findWhere(availableBulbs, { internalid: response.items[i].internalid });
                        price = self.bulbQty * parseFloat(response.items[i].onlinecustomerprice);

                        if (bulb) {
                            bulb.price = price;
                            bulb.priceFormatted = _.formatCurrency(price);
                        }
                    }
                }

                promise.resolve(availableBulbs);
            })
            .fail(function afterBulbsRequestFail(jqXhr) {
                jqXhr.preventDefault = true;
            });
        }

        return promise;
    };

    BulbUpsellView.prototype.getAvailableBulbs = function getAvailableBulbs() {
        var availableBulbs = [];
        var promise = jQuery.Deferred();
        var bulbPreference = this.getBulbPreferences();

        if (this.item.custitem_bulb_id) {
            availableBulbs.push({
                internalid: this.item.custitem_bulb_id,
                label: this.item.custitem_bulb_upsell_label
                    || this.environment.getConfig('bulbs.bulbText')
                    || '',
                bulbQty: this.bulbQty,
                type: 'normal',
                checked: bulbPreference.normal
                    || (bulbPreference.frosted && !this.item.custitem_bulb_frosted_id)
            });
        }

        if (this.item.custitem_bulb_frosted_id) {
            availableBulbs.push({
                internalid: this.item.custitem_bulb_frosted_id,
                label: this.item.custitem_bubl_upsell_label_frosted
                    || this.environment.getConfig('bulbs.bulbFrostedText')
                    || '',
                bulbQty: this.bulbQty,
                type: 'frosted',
                checked: bulbPreference.frosted
                    || (bulbPreference.normal && !this.item.custitem_bulb_id)
            });
        }

        this.getAvailableBulbsPrices(availableBulbs).done(function afterGettingBulbPrices(availableBulbsWithPrices) {
            promise.resolve(availableBulbsWithPrices);
        });

        return promise;
    };

    BulbUpsellView.prototype.setBulbOption = function setBulbOption(bulbItem) {
        var product = this.pdp.getItemInfo();
        var bulbItemOption = _.findWhere(product.options, { cartOptionId: 'custcol_bulb_item' });
        var bulbQtyOption = _.findWhere(product.options, { cartOptionId: 'custcol_bulb_qty' });
        var bulbItemOptionValue = bulbItemOption
            && bulbItemOption.value
            && bulbItemOption.value.internalid
            ? bulbItemOption.value.internalid
            : null;

        var bulbQtyOptionValue = bulbQtyOption
            && bulbQtyOption.value
            && bulbQtyOption.value.internalid
            ? bulbQtyOption.value.internalid
            : null;

        if (bulbItem !== bulbItemOptionValue) {
            this.pdp.setOption('custcol_bulb_item', bulbItem ? String(bulbItem) : null);
        }

        if (this.bulbQty !== bulbQtyOptionValue) {
            this.pdp.setOption('custcol_bulb_qty', String(this.bulbQty));
        }
    };

    BulbUpsellView.prototype.getMatrixDimension = function getMatrixDimension() {
        var product = this.pdp.getItemInfo();
        var matrixDimension = _.findWhere(product.options, { isMatrixDimension: true });

        return matrixDimension;
    };

    BulbUpsellView.prototype.getItem = function getItem() {
        var isMatrix = this.pdp.getAllMatrixChilds().length > 0;
        var selectedMatrixChildren;
        var product;
        var item;

        if (isMatrix) {
            selectedMatrixChildren = this.pdp.getSelectedMatrixChilds();

            if (selectedMatrixChildren.length === 1) {
                item = selectedMatrixChildren[0];
            }
        } else {
            product = this.pdp.getItemInfo();
            item = product && product.item;
        }

        return item;
    };

    BulbUpsellView.prototype.hideBulbOption = function hideBulbOption() {
        var isOutOfStock = !this.pdp.getStockInfo().isInStock;
        var isRetailOrLoggedOut = !this.profile.get('isTrade') || !this.profile.get('isLoggedIn');
        var validOutOfStockBehavior = this.item.outofstockbehavior === '- Default -'
            || this.item.outofstockbehavior === 'Disallow back orders but display out-of-stock message';
        var bulbAlreadyIncluded = this.item.custitem_bulb_included === 'Yes';

        return (isOutOfStock && isRetailOrLoggedOut && validOutOfStockBehavior)
            || bulbAlreadyIncluded
            || !this.bulbQty;
    };

    BulbUpsellView.prototype.render = function render() {
        var product = this.pdp.getItemInfo();
        var args = arguments;
        var self = this;

        this.item = this.getItem();
        this.bulbQty = this.item.custitem18 * product.quantity;

        this.getAvailableBulbs().done(function afterGetBulbs(availableBulbs) {
            var preferred = _.findWhere(availableBulbs, { checked: true });
            self.availableBulbs = availableBulbs;

            if (!self.hideBulbOption() && availableBulbs && availableBulbs.length) {
                self.setBulbOption(preferred ? preferred.internalid : null);

                SCView.prototype.render.apply(self, args);
            }
        });
    };

    BulbUpsellView.prototype.getContext = function getContext() {
        return {
            availableBulbs: this.availableBulbs || [],
            bulbQty: this.bulbQty
        };
    };

    return BulbUpsellView;
});


define('AwaLabs.BulbUpsell.Shopping', [
    'BulbUpsell.View'
], function AwaLabsBulbUpsellShopping(
    BulbUpsellView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var pdp = application.getComponent('PDP');
            var env = application.getComponent('Environment');
            var bulbUpsellEnabled = env && env.getConfig('bulbs.enabled');
            if (pdp && bulbUpsellEnabled) {
                pdp.addChildViews(pdp.PDP_FULL_VIEW, {
                    'BulbUpsellView': {
                        'BulbUpsellView': {
                            childViewIndex: 2,
                            childViewConstructor: function childViewConstructor() {
                                return new BulbUpsellView({
                                    application: application
                                });
                            }
                        }
                    }
                });
                pdp.addChildViews(pdp.PDP_QUICK_VIEW, {
                    'BulbUpsellView': {
                        'BulbUpsellView': {
                            childViewIndex: 2,
                            childViewConstructor: function childViewConstructor() {
                                return new BulbUpsellView({
                                    application: application
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});


};

extensions['ACS.CartAvailabilityBISDate.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/CartAvailabilityBISDate/1.0.0/' + asset;
}


define('CartAvailabilityBISDate', [
]
, function CartAvailabilityBISDate(
    ) {
    'use strict';

    return {
        getNextBusinessDay: function getNextBusinessDay(today) {
            // Copy date so don't affect original
            var date = new Date(+today);
            // Add days until get not Sat or Sun
            do {
                date.setDate(date.getDate() + 1);
            } while (!(date.getDay() % 6));
            return this.getFormattedDate(date);
        },
        getFormattedDate: function getFormattedDate(date) {
            var day = date.getDate().toString();
            var month = (1 + date.getMonth()).toString();
            var year = date.getFullYear();

            month = month.length > 1 ? month : '0' + month;
            day = day.length > 1 ? day : '0' + day;
            return month + '/' + day + '/' + year;
        },
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var self = this;

            layout.addToViewContextDefinition('Cart.Item.Summary.View', 'line', 'string', function fn(context) {
                var line = context.line;
                var cpl = context.line.item.custitem_current_price_list;
                var quantityAvailable = context.line.item.quantityavailable;
                line.quantityAvailable = context.line.item.quantityavailable;
                if (cpl === 'Discontinued') {
                    // If the item Current Price List field is “Discontinued” display “Discontinued”.
                    line.expectedShippingDate = 'Discontinued';
                } else if (quantityAvailable > 0 && cpl === 'Current Price List') {
                    // display the next business day
                    line.expectedShippingDate = self.getNextBusinessDay(new Date()).toLocaleString();
                } else if (!quantityAvailable || quantityAvailable === 0) {
                    // If the item has no quantity available and the Current Price List field is “Current Price List”, display the “Back in Stock Date”
                    line.expectedShippingDate = context.line.item.custitem_back_in_stock_date;
                    line.quantityAvailable = 0;
                }

                return line;
            });

            layout.addToViewContextDefinition('ProductLine.Sku.View', 'line', 'string', function fn(context) {
                var pdp = container.getComponent('PDP');
                var line = context.model.item;
                var cpl = line.custitem_current_price_list;
                var quantityAvailable = line.quantityavailable;
                line.notPDP = !pdp;
                line.quantityAvailable = line.quantityavailable;
                if (cpl === 'Discontinued') {
                    // If the item Current Price List field is “Discontinued” display “Discontinued”.
                    line.expectedShippingDate = 'Discontinued';
                } else if (quantityAvailable > 0 && cpl === 'Current Price List') {
                    // display the next business day
                    line.expectedShippingDate = self.getNextBusinessDay(new Date()).toLocaleString();
                } else if (!quantityAvailable || quantityAvailable === 0) {
                    // If the item has no quantity available and the Current Price List field is “Current Price List”, display the “Back in Stock Date”
                    line.expectedShippingDate = line.custitem_back_in_stock_date;
                    line.quantityAvailable = 0;
                }

                return line;
            });
        }
    };
});


};

extensions['AwaLabs.CartToQuote.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/CartToQuote/2.1.0/' + asset;
}

define('CartToQuote.Model', [
    'Backbone',
    'Utils'
], function CartToQuoteModel(
    Backbone,
    Utils
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/CartToQuote.Service.ss'))
    });
});


define('CartToQuote.View', [
    'Backbone',
    'jQuery',
    'underscore',
    '_carttoquote.tpl',
    'Profile.Model',
    'LiveOrder.Model',
    'CartToQuote.Utils',
    'CartToQuote.Model',
    'ProductList.Model'
], function CartToQuoteView(
    Backbone,
    jQuery,
    _,
    cartToQuoteTpl,
    ProfileModel,
    LiveOrderModel,
    ToQuoteUtils,
    CartToQuoteModel,
    ProductListModel
) {
    'use strict';

    return Backbone.View.extend({
        template: cartToQuoteTpl,
        events: {
            'click [data-action="cart-to-quote"]': 'cartToQuote',
            'click [data-action="cart-detail-to-quote"]': 'cartToQuote'
        },

        initialize: function initialize(options) {
            var profile = ProfileModel.getInstance();
            this.productList = new ProductListModel();
            this.application = options.application;
            this.cartDetail = options.fromCartDetail;
            this.model = new CartToQuoteModel();
            this.liveOrderModel = LiveOrderModel.getInstance();

            if (profile.get('isLoggedIn') === 'T') {
                this.productList.set('internalid', 'quote');
                this.productList.fetch();
            }
        },
        cartToQuote: function quoteToCart(e, allowPropagation) {
            var self = this;
            var cartLines = this.liveOrderModel.get('lines').models;
            if (!allowPropagation) {
                ToQuoteUtils.linesToQuote(this.productList, this.productList.get('internalid'), cartLines).done(function itemsAddedToQuote() {
                    self.model.set('internalid', _.random(1, 100)); // set internalid for call destroy method
                    self.model.destroy().done(function onEmptyCart() {
                        jQuery(e.target).trigger('click', true);
                    });
                });
                e.stopPropagation();
            }
            e.preventDefault();
        },

        getContext: function getContext() {
            return {
                isCartDetail: this.cartDetail
            };
        }
    });
});


define('CartToQuote.Utils', [
    'ProductList.Model',
    'ProductList.Item.Model',
    'underscore',
    'jQuery',
    'Utils',
    'Backbone',
    'Session'
], function CartToQuoteUtils(
    ProductListModel,
    ProductListItemModel,
    _,
    jQuery,
    Utils,
    Backbone,
    Session
) {
    'use strict';

    return {

        linesToQuote: function quoteToCart(plJson, plInternalid, lines) {
            var self = this;
            var promises = [];
            var deferred = jQuery.Deferred();

            var quoteListPromise = self.createProductList(plJson);
            quoteListPromise.done(function QuoteListCreated(json) {
                if (!plInternalid) {
                    deferred.reject(Utils.translate('Quote List fails to be created'));
                }
                _.each(lines, function eachLine(line) {
                    promises.push(self.doAddLineToQuoteList(line, json.internalid, json));
                });

                jQuery.when(promises).done(function then() {
                    deferred.resolve();
                });
            });

            return deferred;
        },

        createProductList: function createProductList(plJson) {
            var deferred = jQuery.Deferred();
            var plModel;
            var plInternalId = plJson.internalid;

            if (!plInternalId) {
                plModel = new ProductListModel(plJson);
                plModel.save().done(function onSave(json) {
                    deferred.resolve(json);
                });
            } else {
                deferred.resolve(plJson);
            }
            return deferred;
        },

        addItemToQuote: function addItemToQuote(productList, productListLine, product) {
            var quantityToAdd;

            if (product.get('item').get('_matrixParent').internalid) {
                productListLine.set('item', product.get('item').get('_matrixParent'), {
                    silent: true
                });
            }

            if (product.get('quantity') < product.get('_minimumQuantity')) {
                quantityToAdd = product.get('_minimumQuantity');
            } else {
                quantityToAdd = product.get('quantity');
            }

            productListLine.set('productList', {
                id: productList.internalid
            });
            productListLine.set('quantity', quantityToAdd);

            return productListLine
                .save(null, {
                    validate: false
                });
        },

        doAddLineToQuoteList: function doAddLineToQuoteList(line, plInternalId, plJson) {
            var itemId = line.get('item') ?
                line.get('item').get('internalid') :
                line.get('internalid');
            var currentItemId;
            var options;
            var deferred = jQuery.Deferred();
            var productListLine;
            var lineToUpdate = _.find(plJson.items, function fnFind(item) {
                currentItemId = item.item ?
                    item.item.internalid :
                    item.internalid;
                options = item.options;
                return (currentItemId === itemId && _.isEqual(line.get('options'), options));
            });
            if (lineToUpdate) {
                lineToUpdate.quantity += line.get('quantity');
                this.updateItemInQuote(lineToUpdate, line).done(function doneFn() {
                    deferred.resolve();
                });
            } else {
                productListLine = ProductListItemModel.createFromProduct(line);
                this.addItemToQuote(plJson, productListLine, line).done(function doneFn(obj) {
                    line.set('pl_item_internalid', obj.internalid, { silent: true });
                    deferred.resolve();
                });
            }
            return deferred;
        },

        updateItemInQuote: function updateItemInQuote(itemInList, line) {
            var quantityToAdd = line.get('quantity');
            var newQuantity = parseInt(itemInList.quantity, 10) + parseInt(quantityToAdd, 10);
            var productListItemModel = new ProductListItemModel({
                internalid: itemInList.internalid
            });
            productListItemModel.set('quantity', newQuantity);
            productListItemModel.set('options', line.get('options'));
            return productListItemModel.save();
        },

        goToLogin: function goToLogin(application) {
            var login = Session.get('touchpoints.login');
            login += '&origin=' + application.getConfig('currentTouchpoint');
            login += '&origin_hash=' + encodeURIComponent(Backbone.history.fragment);
            window.location.href = login;
        },

        validateGiftCertificate: function validateGiftCertificate(item) {
            if (item.itemOptions && item.itemOptions.GIFTCERTRECIPIENTEMAIL) {
                if (!Backbone.Validation.patterns.email.test(item.itemOptions.GIFTCERTRECIPIENTEMAIL.label)) {
                    return false;
                }
            }
            return true;
        }
    };
});


define('CartToQuote.RequestQuoteWizard.Module.Items', [
    'underscore',
    'RequestQuoteWizard.Module.Items',
    'Utils',
    'Profile.Model',
    'jQuery',
    'Product.Model',
    'GlobalViews.Message.View',
    'LiveOrder.Model',
    'Backbone.CollectionView',
    'Transaction.Line.Views.Cell.Actionable.Expanded.View',
    'RequestQuoteWizard.Module.Items.Line.Quantity.View',
    'RequestQuoteWizard.Module.Items.Line.Actions.View'
], function CartToQuoteRequestQuoteWizardModuleItems(
    _,
    RequestQuoteWizardModuleItems,
    Utils,
    ProfileModel,
    jQuery,
    ProductModel,
    GlobalViewsMessageView,
    LiveOrderModel,
    BackboneCollectionView,
    TransactionLineViewsCellActionableExpandedView,
    RequestQuoteWizardModuleItemsLineQuantityView,
    RequestQuoteWizardModuleItemsLineActionsView
) {
    'use strict';

    _.extend(RequestQuoteWizardModuleItems.prototype, {
        events: {
            'click [data-action="add-items-to-cart"]': 'addItemsToCartBulkHandler',
            'change [data-action="select-all"]': 'selectAll',
            'change [data-action="unselect-all"]': 'unselectAll',
            'change [data-action="select"]': 'selectLine'
        },

        childViews: {
            'Items.Collection': function ItemsCollectionFN(options) {
                return new BackboneCollectionView({
                    collection: this.model.get('lines'),
                    viewsPerRow: 1,
                    childView: TransactionLineViewsCellActionableExpandedView,
                    childViewOptions: {
                        navigable: true,
                        application: this.wizard.application,
                        SummaryView: RequestQuoteWizardModuleItemsLineQuantityView,
                        ActionsView: RequestQuoteWizardModuleItemsLineActionsView,
                        showAlert: false,
                        generalClass: options.generalClass || 'requestquote-wizard-module-items-item',
                        showCheckbox: true
                    }
                });
            }
        },

        getContext: _.wrap(RequestQuoteWizardModuleItems.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');
            var collection = this.model.get('lines').models || [];
            var totalPrice = 0;

            context.isPriceEnabled = !user.hidePrices();
            context.showSelectAll = this.wizard.model.get('lines').length > 1;
            context.unselectedLength = this.getUnselectedLength();
            context.collectionLength = this.getCollectionLength();
            context.allselected = this._areAllselected();
            context.isAtLeastOneItemChecked = context.unselectedLength !== context.collectionLength;
            context.allowShare = !!context.collectionLength;
            context.totalPrice = this.wizard.model.get('lines').length * 100;

            if (context.isPriceEnabled) {
                try {
                    _.each(collection, function eachCollection(line) {
                        var qty = line.get('quantity');
                        var item = line.get('item');
                        var price = useRetailPrices ?
                            item.get('pricelevel4') :
                            item.get('onlinecustomerprice_detail').onlinecustomerprice;
                        totalPrice += qty * price;
                    });
                    totalPrice = _.formatCurrency(totalPrice);
                } catch (e) {
                    totalPrice = 'No total price available';
                }
            }
            context.totalPrice = totalPrice;
            return context;
        }),

        getUnselectedLength: function getUnselectedLength() {
            return this.wizard.model.get('lines').filter(function filterLinesFn(record) {
                return !record.checked;
            }).length;
        },

        getUnselectedItems: function getUnselectedLength() {
            var unselected = [];
            this.wizard.model.get('lines').filter(function filterFn(record) {
                if (!record.checked && record.get('item')) {
                    unselected.push(record.get('item').get('internalid'));
                }
                return true;
            });
            return unselected;
        },

        getCollectionLength: function getCollectionLength() {
            return this.wizard.model.get('lines').length;
        },

        unselectAll: function unselectAll() {
            this.toggleCollectionsEvent(false);
            _.each(this.wizard.model.get('lines').models, function eachLinesFn(line) {
                line.checked = false;
            });
            this.toggleCollectionsEvent(true);
            this.render();
        },

        selectAll: function selectAll() {
            this.toggleCollectionsEvent(false);
            _.each(this.wizard.model.get('lines').models, function eachLinesFn(line) {
                line.checked = true;
            });
            this.toggleCollectionsEvent(true);
            this.render();
        },

        selectLine: function selectLine(e) {
            var self = this;
            var isChecked = e.target.checked || false;
            var elem = jQuery(e.target);
            var line = elem.closest('[data-item-id="' + elem.attr('value') + '"]');
            var lineId = line.attr('id');

            e.preventDefault();
            e.stopPropagation();

            _.each(self.wizard.model.get('lines').models, function eachLineFn(currentLine) {
                if (currentLine.id === lineId) {
                    currentLine.checked = isChecked;
                }
            });
            this.render();
        },

        toggleCollectionsEvent: function toggleCollectionsEvent(on) {
            if (on) {
                this.wizard.model.get('lines').on('add remove change', this.render, this);
            } else {
                this.wizard.model.get('lines').off('add remove change', this.render, this);
            }
        },

        _areAllselected: function _areAllselected() {
            var linesSelected = _.filter(this.wizard.model.get('lines').models, function eachLinesFn(line) {
                return !!line.checked;
            });
            return this.wizard.model.get('lines').models.length === linesSelected.length;
        },

        _getSelection: function _getSelection() {
            var lines = [];
            var itemsForCart = [];
            var buttonSelector = [];
            var item;
            var itemForCart;
            _.each(this.wizard.model.get('lines').models, function eachModelFn(plLine) {
                if (plLine.checked !== true) {
                    return;
                }
                lines.push(plLine);
                item = plLine.get('item');
                itemForCart = new ProductModel({
                    internalid: item.id,
                    item: item,
                    quantity: plLine.get('quantity'),
                    _optionsDetails: item.get('itemoptions_detail'),
                    options: plLine.get('options').toJSON()
                });
                itemsForCart.push(itemForCart);
            });
            return {
                lines: lines,
                items_for_cart: itemsForCart,
                button_selector: buttonSelector
            };
        },

        addItemsToCartBulkHandler: function addItemsToCartBulkHandler(e) {
            var self = this;
            var selectedModels = this._getSelection();
            var buttonSelector = e.currentTarget;
            var addToCartPromise;

            this.cart = LiveOrderModel.getInstance();

            e.preventDefault();

            if (selectedModels.lines.length < 1) {
                return;
            }
            addToCartPromise = this.cart.addProducts(selectedModels.items_for_cart);
            this._showWaitMessage();

            addToCartPromise.done(function done() {
                self.unselectAll();
                self.removeItems(selectedModels, true);
                // eslint-disable-next-line no-underscore-dangle
                self._showSuccessMessage();
            });

            if (addToCartPromise) {
                this.disableElementsOnPromise(addToCartPromise, buttonSelector);
            }
        },

        _showWaitMessage: function showWaitMessage() {
            this._showMessage(Utils.translate('Your items are moving to the cart, please be patient.'));
        },

        _showSuccessMessage: function showSuccessMessage() {
            this._showMessage(Utils.translate('Products have been added to cart.'));
        },

        _showMessage: function showMessage(message) {
            var placeholder = this.$('[data-type="alert-placeholder-header"]');
            var globalViewMessage = new GlobalViewsMessageView({
                message: Utils.translate(message),
                type: 'success',
                closable: false
            });
            placeholder.append(globalViewMessage.render().$el.html());
        },

        removeItems: function removeItems(selectedModels, render) {
            this.wizard.model.get('lines').remove(selectedModels.lines);
            if (render) {
                // this.childViewInstances['Items.Collection'].render();
                this.renderChildViewContainer('Items.Collection');

            }

            if (this.wizard.model.get('lines').length === 0) {
                setTimeout(function redirectDelay() {
                    window.location.href = SC.SESSION.touchpoints.viewcart;
                }, 5000);
            }
        }
    });
});


define('CartToQuote.RequestQuoteWizard.Module.Items.Line.Action.View', [
    'underscore',
    'RequestQuoteWizard.Module.Items.Line.Actions.View',
    'LiveOrder.Model',
    'Profile.Model'
], function CartToQuoteRequestQuoteWizardModuleItemsLineActionView(
    _,
    RequestQuoteWizardModuleItemsLineActionsView,
    LiveOrderModel,
    ProfileModel
) {
    'use strict';

    _.extend(RequestQuoteWizardModuleItemsLineActionsView.prototype, {
        events: _.extend(RequestQuoteWizardModuleItemsLineActionsView.prototype.events, {
            'click [data-action="add-item-to-cart"]': 'addItemToCart'
        }),
        addItemToCart: function addItemToCart(e) {
            var self = this;
            var cart = LiveOrderModel.getInstance();
            var addToCartPromise;
            e.preventDefault();
            e.stopPropagation();
            addToCartPromise = cart.addLine(this.model);
            addToCartPromise.then(function thenFn() {
                self.options.model.collection.remove(self.options.model);
            });
            if (addToCartPromise) {
                self.disableElementsOnPromise(addToCartPromise, '[data-line="' + self.model.id + '"]');
            }
        },
        getContext: _.wrap(RequestQuoteWizardModuleItemsLineActionsView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var profile = ProfileModel.getInstance();
            context.lineId = this.options.model.id;
            context.isTradeAndNotIsBackOrderable = profile.get('isTrade') &&
                this.model.get('item') &&
                !this.model.get('item').get('isbackorderable') &&
                this.model.get('item').get('quantityavailable') === 0;
            return context;
        })
    });
});


define('CartToQuote.RequestQuoteWizard', [
    'underscore',
    'RequestQuoteWizard',
    'ProductList.Model',
    'Transaction.Line.Model'
], function CartToQuoteRequestQuoteWizard(
    _,
    RequestQuoteWizard,
    ProductListModel,
    TransactionLineModel
) {
    'use strict';

    _.extend(RequestQuoteWizard, {
        setupPersistence: function setupPersistence(application, model) {
            var self = this;
            this.pl_internalid = null;
            this.pl_json = null;

            model.on('init', function init() {
                application.ProductListModule.Utils.getRequestAQuoteProductList().done(function getRequestAQuoteProductListDone(json) {
                    var products;
                    self.pl_json = json;
                    self.pl_internalid = json.internalid;
                    products = new ProductListModel(json).get('items').models;
                    // set model list id
                    model.set('plInternalId', self.pl_internalid);

                    // Turn the events momentarily off
                    model.get('lines').off('add', self.addLines, self);
                    model.get('lines').off('change', self.changeQuantity, self);
                    model.get('lines').off('remove', self.doRemoveItemFromList, self);
                    model.off('submit', self.doRemoveList, self);

                    _.each(products, function fnEach(product, i) {
                        var selectedLine = TransactionLineModel.createFromProduct(product);
                        selectedLine.set('internalid', _.uniqueId('item_line'));
                        selectedLine.set('pl_item_internalid', product.get('internalid'));

                        model.get('lines').add(selectedLine, { silent: i < products.length - 1 });
                    });

                    // Turn the events on again
                    model.get('lines').on('change', self.changeQuantity, self);
                    model.get('lines').on('add', self.addLines, self);
                    model.get('lines').on('remove', self.doRemoveItemFromList, self);
                    model.on('submit', self.doRemoveList, self);
                });
            });
        }
    });
});


define('CartToQuote.ProductList.DetailsLater.View', [
    'ProductList.DetailsLater.View',
    'underscore'
], function CartToQuoteProductListDetailsLaterView(
    ProductListDetailsLaterView,
    _
) {
    'use strict';

    return _.extend(ProductListDetailsLaterView.prototype, {
        getContext: _.wrap(ProductListDetailsLaterView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            originalRet.name = this.model.get('name');
            originalRet.pusherTarget = this.options.isMarketWizard ? 'market-wizard-pusher' : 'cart-save-for-later';
            return originalRet;
        })
    });
});


define('CartToQuote.MarketWizard.View', [
    'ProductList.DetailsLater.View',
    'ProductList.Model',
    'ProductList.Item.Model',
    'Profile.Model',
    'underscore',
    'jQuery',
    'Backbone',
    'Utils',
    'CartToQuote.Utils',
    'LiveOrder.Model',
    '_carttoquote_market_wizard_view.tpl',
    'CartToQuote.ProductList.DetailsLater.View'
], function CartToQuoteMarketWizardView(
    ProductListDetailsLaterView,
    ProductListModel,
    ProductListItemModel,
    ProfileModel,
    _,
    jQuery,
    Backbone,
    Utils,
    CartToQuoteUtils,
    LiveOrderModel,
    cartToQuoteMarketWizardViewTpl
) {
    'use strict';

    return Backbone.View.extend({
        template: cartToQuoteMarketWizardViewTpl,

        childViews: {
            'Market.Wizard.ProductListDetailsView': function marketWizardProductListDetailsViewFn() {
                return new ProductListDetailsLaterView({
                    application: this.application,
                    model: this.plModel,
                    isMarketWizard: true
                });
            }
        },

        initialize: function initialize(options) {
            var self = this;
            this.application = options.application;
            this.model = LiveOrderModel.getInstance();
            this.profile = ProfileModel.getInstance();
            this.plModel = new ProductListModel();
            this.updateMarketList();
            Backbone.Events.on('cartToQuote:moveToMarketWizard', function moveMarketWizard(object) {
                self.checkIsLoggedIn();
                return self.moveMarketWizard(object.id);
            });
        },

        checkIsLoggedIn: function checkIsLoggedIn() {
            if (this.profile.get('isLoggedIn') !== 'T') {
                CartToQuoteUtils.goToLogin(this.application);
            }
        },

        updateMarketList: function updateMarketList() {
            var self = this;
            ProfileModel.getPromise().done(function profileGetPromiseDone(profile) {
                if (profile.isLoggedIn === 'T') {
                    self.application.ProductListModule.Utils.getRequestAQuoteProductList().done(function onAfterGotRequestAQuoteProductList(quoteListReturn) {
                        self.plModel = new ProductListModel(quoteListReturn);
                        self.plModel.set('name', Utils.translate('Market Wizard'));
                        self.render();
                    });
                }
            });
        },

        moveMarketWizard: function moveMarketWizard(internalid) {
            var product;
            var self = this;
            var environment = this.application.getComponent('Environment');
            this.checkIsLoggedIn();
            product = this.model.get('lines').get(internalid);
            this.moveMarketWizardItemHelper(product).done(function doneFn() {
                self.application.getLayout().showConfirmationMessage(environment.getConfig('marketWizardConfirmationMessage'));
                self.updateMarketList();
            });
        },

        moveMarketWizardItemHelper: function moveMarketWizardItemHelper(product) {
            return jQuery.when(this.model.removeLine(product), this.addCartItemToQuote(product));
        },

        addCartItemToQuote: function addCartItemToQuote(product) {
            var itemOptions;
            var itemListOptions;
            var itemPresentInList;
            var idProductSelected = product.get('item').get('matrix_parent') ?
                product.get('item').get('matrix_parent').internalid :
                product.get('item').get('internalid');
            var promise = jQuery.Deferred();
            var productListLine;

            var idMatch;
            var optionsMatch;

            if (CartToQuoteUtils.validateGiftCertificate(product)) {
                productListLine = ProductListItemModel.createFromProduct(product);
                itemOptions = productListLine.toJSON().options;
                itemPresentInList = _.find(this.plModel.get('items').models, function findInProductListJsonItems(itemList) {
                    itemListOptions = itemList.toJSON().options;
                    idMatch = parseInt(itemList.get('item').id, 10) ===
                        parseInt(idProductSelected, 10);
                    optionsMatch = _.isEqual(itemOptions, itemListOptions);
                    return idMatch && optionsMatch;
                });
                if (itemPresentInList) {
                    return this.updateItemInQuote(itemPresentInList);
                }
                return this.addItemToQuote(product);
            }
            return promise.resolve();
        },

        addItemToQuote: function addItemToQuote(product) {
            var quantityToAdd;
            var productListLine = ProductListItemModel.createFromProduct(product);

            if (product.get('item').get('matrix_parent') &&
                product.get('item').get('matrix_parent').internalid) {
                productListLine.set('item', product.get('item').get('_matrixParent'), {
                    silent: true
                });
            }

            if (product.get('quantity') < product.get('_minimumQuantity')) {
                quantityToAdd = product.get('_minimumQuantity');
            } else {
                quantityToAdd = product.get('quantity');
            }
            productListLine.set('quantity', quantityToAdd);
            productListLine.set('productList', {
                id: this.plModel.get('internalid')
            });

            return productListLine.save(null, {
                validate: false
            });
        },

        updateItemInQuote: function updateItemInQuote(itemInList) {
            var quantityToAdd = this.model.get('quantity');
            var newQuantity = parseInt(itemInList.quantity, 10) + parseInt(quantityToAdd, 10);
            var productListItemModel = new ProductListItemModel({
                'internalid': itemInList.internalid
            });
            productListItemModel.set('quantity', newQuantity);
            return productListItemModel.save();
        }
    });
});


define('CartToQuote.ProductList.Item.Model', [
    'ProductList.Item.Model',
    'Item.Model',
    'Product.Model',
    'underscore'
], function CartToQuoteProductListItemModel(
    ProductListItemModel,
    Item,
    ProductModel,
    _
) {
    'use strict';

    _.extend(ProductListItemModel.prototype, {
        initialize: function initialize(attributes) {
            var itemAux;
            var itemOptions;
            // This workaround is made to maintain the compatility with product lists saving the child item in the record
            if (attributes && attributes.item && attributes.item.matrix_parent) {
                attributes.item.originalid = attributes.item.internalid;
                attributes.item = _.extend(attributes.item, attributes.item.matrix_parent);
                delete attributes.item.matrix_parent;
            }

            itemAux = new Item(attributes.item);
            itemOptions = itemAux.get('options');

            itemOptions.each(function itemOptionsEach(itemOption) {
                var option;
                var optionLine;
                _.any(attributes.options, function anyOption(opt, l) {
                    if (opt.cartOptionId === itemOption.get('cartOptionId')) {
                        option = opt;
                        optionLine = l;
                        return true;
                    }
                    return false;
                });
                if (!option) {
                    attributes.options.push(itemOption.toJSON());
                } else if (optionLine && _.isObject(option.value) && _.isEmpty(option.value)) {
                    attributes.options[optionLine] = itemOption.toJSON();
                }
            });

            ProductModel.prototype.initialize.apply(this, arguments);
        }
    });
});


define('CartToQuote.RequestQuoteWizard.View', [
    'RequestQuoteWizard.View',
    'underscore',
    'Utils'
], function CartToQuoteRequestQuoteWizardView(
    RequestQuoteWizardView,
    _,
    Utils
) {
    'use strict';

    _.extend(RequestQuoteWizardView.prototype, {
        getTitle: function getTitle() {
            return Utils.translate('Market Wizard');
        },
        getBreadcrumbPages: function getBreadcrumbPages() {
            return { href: '/request-a-quote', text: Utils.translate('Market Wizard') };
        }
    });
});


define('CartToQuote.ProductDetailToQuote.View', [
    'ProductDetailToQuote.View',
    'Utils',
    'ProductList.Item.Model',
    'ProductList.Model',
    'underscore'
], function CartToQuoteProductDetailToQuoteView(
    ProductDetailToQuoteView,
    Utils,
    ProductListItemModel,
    ProductListModel,
    _
) {
    'use strict';

    _.extend(ProductDetailToQuoteView.prototype, {
        areOptionsEqual: function areOptionsEqual(options1, options2) {
            var optionsA = _.map(options1, function mapOptions1(option) {
                option.values = option.values || [];
                option.value = option.value || {};
                return option;
            });

            var optionsB = _.map(options2, function mapOptions2(option) {
                option.values = option.values || [];
                option.value = option.value || {};
                return option;
            });
            return _.isEqual(optionsA, optionsB);
        },

        itemToQuote: function itemToQuote(e) {
            var self = this;
            var environment = this.application.getComponent('Environment');
            var phone;
            var email;
            var productListLine;
            var productListModel;
            var productListLineJson;
            var itemPresentInList;

            e.preventDefault();

            this.state.feedbackMessage = '';

            // if user is logged in but isn't allowed to quote, we warn him.
            if (this.profile_model.get('isLoggedIn') === 'T' && !this.state.quote_permissions) {
                phone = environment.getConfig('quote.defaultPhone', '');
                email = environment.getConfig('quote.defaultEmail', '');

                this.state.feedbackMessageType = 'warning';
                this.state.feedbackMessage = Utils.translate(
                    'Sorry, you don\'t have sufficient permissions to request a quote online. <br/> ' +
                    'For immediate assistance <strong>call us at $(0)</strong> or email us to <strong>$(1)</strong>',
                    phone,
                    email
                );
                this.render();
            } else if (this.model.isSelectionComplete() && this.isQuotable() && this.validateLogin()) {
                this.application.ProductListModule.Utils.getRequestAQuoteProductList().done(function getRequestAQuoteProductListDone(
                    productListJson
                ) {
                    productListLine = ProductListItemModel.createFromProduct(self.model);

                    if (!productListJson.internalid) {
                        productListModel = new ProductListModel(productListJson);

                        productListModel.save().done(function productListModelSave(productList) {
                            self.addItemToQuote(productList, productListLine, self.model);
                        });
                    } else {
                        productListLineJson = productListLine.toJSON();
                        itemPresentInList = _.find(productListJson.items, function findProductListJson(
                            productListLineAux
                        ) {
                            return (
                                parseInt(productListLineAux.item.internalid, 10) ===
                                productListLineJson.item.internalid &&
                                self.areOptionsEqual(productListLineJson.options, productListLineAux.options)
                            );
                        });

                        if (itemPresentInList) {
                            self.updateItemInQuote(itemPresentInList);
                        } else {
                            self.addItemToQuote(productListJson, productListLine, self.model);
                        }
                    }
                });
            }
        }
    });
});


define('CartToQuote.Module.Items.Line.Quantity.View', [
    'RequestQuoteWizard.Module.Items.Line.Quantity.View',
    'ProductList.Item.Model',
    'underscore'
], function CartToQuoteModel(
    RequestQuoteWizardModuleItemsLineQuantityView,
    ProductListItemModel,
    _
) {
    'use strict';

    return _.extend(RequestQuoteWizardModuleItemsLineQuantityView.prototype, {
        setQuantity: _.wrap(RequestQuoteWizardModuleItemsLineQuantityView.prototype.setQuantity, function fnWrap(fn) {
            var strQuantity = this.$('[data-type="quantity-input"]').val();
            var quantity = parseInt(strQuantity, 10);
            var productListLine;
            fn.apply(this, _.toArray(arguments).slice(1));

            if (!_.isNaN(quantity) && _.isNumber(quantity)) {
                productListLine = ProductListItemModel.createFromTransactionLine(this.model);
                productListLine.set('quantity', quantity);
                productListLine.set('internalid', this.model.get('pl_item_internalid'));
                productListLine.save();
            }
        })
    });
});


define('AwaLabs.CartToQuote.Shopping', [
    'CartToQuote.View',
    'Profile.Model',
    'CartToQuote.MarketWizard.View',
    'Backbone',
    'jQuery',
    'CartToQuote.ProductList.Item.Model',
    'CartToQuote.ProductDetailToQuote.View'
], function AwaLabsCartToQuoteShopping(
    CartToQuoteView,
    ProfileModel,
    CartToQuoteMarketWizardView,
    Backbone,
    jQuery
) {
    'use strict';

    return {

        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var cart = container.getComponent('Cart');
            var profile = ProfileModel.getInstance();
            var carToQuoteView = new CartToQuoteMarketWizardView({
                application: container
            });
            if (layout) {
                layout.addChildViews('Cart.Summary.View', {
                    'CartToQuoteView': {
                        'CartToQuoteView': {
                            childViewIndex: 1,
                            childViewConstructor: function childViewConstructor() {
                                return new CartToQuoteView({
                                    application: container,
                                    fromCartDetail: false
                                });
                            }
                        }
                    }
                });
                layout.addChildViews('Cart.Detailed.View', {
                    'CartToQuoteView': {
                        'CartToQuoteView': {
                            childViewIndex: 1,
                            childViewConstructor: function childViewConstructor() {
                                return new CartToQuoteView({
                                    application: container,
                                    fromCartDetail: true
                                });
                            }
                        }
                    }
                });
                layout.addToViewContextDefinition('Cart.Detailed.View', 'showProceedToCheckoutButton', 'boolean', function fn() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });
                layout.addToViewContextDefinition('Cart.Summary.View', 'showProcedToCheckoutButton', 'boolean', function fn() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });

                if (cart) {
                    cart.addChildView('CartToQuote.MarketWizard.View', function cartToQuoteMarketWizardViewFn() {
                        return carToQuoteView;
                    });

                    cart.addToViewEventsDefinition(
                        'Cart.Item.Actions.View',
                        'click [data-action="move-market-wizard"]',
                        function fn(event) {
                            var internalid = jQuery(event.target).data('internalid');
                            event.preventDefault();
                            event.stopPropagation();
                            return Backbone.Events.trigger('cartToQuote:moveToMarketWizard', { id: internalid });
                        }
                    );
                }
            }
        }
    };
});


};

extensions['AwaLabs.CategoriesCustomSort.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/CategoriesCustomSort/2.1.0/' + asset;
}

define('CategoriesCustomSort', [
    'Facets.Translator',
    'Configuration',
    'underscore'
],
function CategoriesCustomSort(
    FacetsTranslator,
    Configuration,
    _
) {
    'use strict';

    _.extend(FacetsTranslator.prototype, {
        getApiParams: _.wrap(FacetsTranslator.prototype.getApiParams, function getApiParams(fn) {
            var params = fn.apply(this, _.toArray(arguments).slice(1));
            var categorySort = Configuration.get('categoryResults.sort');

            if (this.isCategoryPage && categorySort && params.sort.indexOf('commercecategory') === 0) {
                params.sort = categorySort;
            }

            return params;
        }),

        setDefaultOrder: function setDefaultOrder() {
            if (this.categoryUrl && this.categoryUrl.length && this.isCategoryPage) {
                this.configuration.defaultOrder = Configuration.get('categoryResults.sort');
            }
        },

        getUrl: _.wrap(FacetsTranslator.prototype.getUrl, function getUrl(fn) {
            this.setDefaultOrder();

            return fn.apply(this, _.toArray(arguments).slice(1));
        }),

        parseUrlOptions: _.wrap(FacetsTranslator.prototype.parseUrlOptions, function parseUrlOptions(fn) {
            this.setDefaultOrder();

            return fn.apply(this, _.toArray(arguments).slice(1));
        })
    });
});


};

extensions['AwaLabs.CategoriesFacetsDisplayFeature.1.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/CategoriesFacetsDisplayFeature/1.1.0/' + asset;
}

define('AwaLabs.CategoriesFacetsDisplayFeature', [
    'underscore'
], function AwaLabsCategoriesLeftNavigation(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var activeExtraCategories;
            var activeCategories;
            if (layout) {
                layout.addToViewContextDefinition('Facets.FacetedNavigationItem.View', 'isCollapsed', 'boolean', function isCollapsedFn(context) {
                    if (context.rangeValues.length) {
                        if (context.rangeMin !== context.rangeFrom) {
                            context.isCollapsed = false;
                        }
                    } else {
                        activeCategories = _.findWhere(context.values, { 'isActive': true });
                        if (activeCategories) {
                            context.isCollapsed = false;
                        }
                    }
                    return context.isCollapsed;
                });
                layout.addToViewContextDefinition('Facets.FacetedNavigationItem.View', 'extraValueActive', 'boolean', function extraValueActiveFn(context) {
                    activeExtraCategories = _.findWhere(context.extraValues, { 'isActive': true });
                    return !!activeExtraCategories;
                });
            }
        }
    };
});


};

extensions['AwaLabs.ContactUsLoggedIn.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/ContactUsLoggedIn/2.1.0/' + asset;
}

define('ContactUsLoggedIn.Page.View', [
    'Backbone',
    'Utils',
    'contact_us_logged_in_page.tpl',
    'jQuery'
], function ContactUsLoggedInPageView(
    Backbone,
    Utils,
    ContactusLoggedInPageTpl,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: ContactusLoggedInPageTpl,

        initialize: function initialize(options) {
            this.container = options.container || options.application;
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            return [{
                href: 'contact-us',
                text: Utils.translate('Contact Us')
            }];
        },

        beforeShowContent: function beforeShowContent() {
            var userProfileComponent = this.container.getComponent('UserProfile');
            var environmentComponent = this.container.getComponent('Environment');
            var self = this;
            var promise = jQuery.Deferred();

            if (userProfileComponent) {
                userProfileComponent
                    .getUserProfile()
                    .then(function afterGetUserProfile(profile) {
                        self.userProfile = profile;

                        if (profile.isloggedin) {
                            window.location.href = environmentComponent.getConfig('siteSettings.touchpoints.customercenter') + '#newcase';
                        }
                    })
                    .always(function alwaysGetUserProfile() {
                        promise.resolve();
                    });
            } else {
                promise.resolve();
            }

            return promise;
        },

        getContext: function getContext() {
            return {
                showCaseForm: this.userProfile && this.userProfile.isloggedin
            };
        }
    });
});


define('AwaLabs.ContactUsLoggedIn.Shopping', [
    'ContactUsLoggedIn.Page.View'
], function ContactUsLoggedIn(
    ContactUsLoggedInPageView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pageType = container.getComponent('PageType');

            if (pageType) {
                pageType.registerPageType({
                    name: 'contact-us',
                    view: ContactUsLoggedInPageView,
                    routes: ['contact-us']
                });
            }
        }
    };
});


};

extensions['AwaLabs.DeliveryInstructions.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/DeliveryInstructions/2.1.0/' + asset;
}

define('AwaLabs.DeliveryInstructions.Shopping.EntryPoint', [
    'underscore'
], function AwaLabsDeliveryInstructionsShoppingEntryPoint(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');

            if (layout) {
                layout.addToViewContextDefinition('Cart.Lines.View', 'whiteGloveServiceMessage', 'string',
                    function overrideContext(context) {
                        var env = application.getComponent('Environment');
                        var isFreightItem = context && context.item && context.item.custitem46;
                        var whiteGloveServiceMessage = env.getConfig(
                            isFreightItem ? 'deliveryinstructions.freightItemMessage' : 'deliveryinstructions.nonFreightItemMessage'
                        );

                        return _(whiteGloveServiceMessage).translate();
                    }
                );
            }
        }
    };
});



};

extensions['AwaLabs.Dialog.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Dialog/2.0.0/' + asset;
}

define('Dialog.View', [
    'Backbone',
    'dialog.tpl',
    'jQuery',
    'Utils'
], function DialogView(
    Backbone,
    dialogTpl,
    jQuery,
    Utils
) {
    'use strict';

    /** @class DialogView @extend Backbone.View */
    return Backbone.View.extend({

        template: dialogTpl,

        attributes: {
            'class': 'DialogView'
        },

        events: {
            'click .dialog-footer-cancel-button': 'onCancelButtonClickedHandler',
            'click .dialog-footer-ok-button': 'onOkButtonClickedHandler',
            'click .global-views-modal-content-header-close': 'onClose'
        },
        resolveBodyHtml: function resolveBodyHtml() {
            return this.options.bodyHtml ||
                jQuery('<p>').html(this.options.bodyText || Utils.translate('Proceeding with your request...')).prop('outerHTML');
        },

        initialize: function initialize(options) {
            var doNothingFunction = function doNothing() {};
            this.hasName = !!options.name;
            this.name = options.name;
            this.headerText = options.headerText;
            this.hasHeaderText = !!this.headerText;
            this.bodyHtml = this.resolveBodyHtml();
            if (options.buttons) {
                this.hasOkButton = !!options.buttons.ok;
                if (this.hasOkButton) {
                    this.okButtonText = options.buttons.ok.text || Utils.translate('OK');
                    this.onOkButtonClicked = options.buttons.ok.onClick || doNothingFunction;
                }
                this.hasCancelButton = !!options.buttons.cancel;
                if (this.hasCancelButton) {
                    this.cancelButtonText = options.buttons.cancel.text || Utils.translate('CANCEL');
                    this.onCancelButtonClicked = options.buttons.cancel.onClick || doNothingFunction;
                }
            } else {
                this.hasOkButton = !options.hideOkButton;
                this.okButtonText = Utils.translate('OK');
                this.onOkButtonClicked = doNothingFunction;
                this.hasCancelButton = false;
            }
            this.onClose = options.onClose || doNothingFunction;
        },

        onCancelButtonClickedHandler: function onCancelButtonClickedHandler() {
            this.onCancelButtonClicked();
            this.onClose();
        },

        onOkButtonClickedHandler: function onOkButtonClickedHandler() {
            this.onOkButtonClicked();
            this.onClose();
        },

        getContext: function getContext() {
            return {
                hasName: this.hasName,
                name: this.name,
                hasHeaderText: this.hasHeaderText,
                headerText: this.headerText,
                bodyHtml: this.bodyHtml,
                hasOkButton: !!this.hasOkButton,
                okButtonText: this.okButtonText,
                hasCancelButton: !!this.hasCancelButton,
                cancelButtonText: this.cancelButtonText
            };
        }

    });
});


define('Dialog.Service', [
    'Dialog.View',
    'underscore'
], function Dialog(
    DialogView,
    _
) {
    'use strict';

    var DialogService = function DialogService(application) {
        this.application = application;
    };

    _.extend(DialogService.prototype, {
        getConfigData: function getConfigData(name) {
            var configuration = this.application.getComponent('Environment');
            var config = _.findWhere(configuration.getConfig('dialogsConfig'), { name: name });
            var buttons = {};
            if (config) {
                if (config.hasOkBtn) {
                    buttons.ok = {
                        text: config.okBtnText
                    };
                }
                if (config.hasCancelBtn) {
                    buttons.cancel = {
                        text: config.cancelBtnText
                    };
                }
                config.buttons = buttons;
                return config;
            }
            return {};
        },
        openModalDialog: function openModalDialog(viewOptions) {
            this.application.getLayout().showInModal(
                new DialogView(viewOptions), {
                    modalOptions: {
                        backdrop: 'static',
                        keyboard: false
                    }
                }
            );
        },
        openDialog: function openDialog(params) {
            var options;
            var dialogConfig;
            if (_.isString(params)) {
                options = {
                    name: params
                };
            } else {
                options = {
                    name: params.name,
                    headerText: params.headerText,
                    bodyHtml: params.bodyHtml || params.bodyText,
                    buttons: params.buttons,
                    onClose: params.onClose,
                    hideOkButton: params.hideOkButton
                };
            }
            if (options.name) {
                dialogConfig = this.getConfigData(options.name);
                _.extend(options, {
                    headerText: dialogConfig.headerText || options.headerText,
                    bodyHtml: dialogConfig.bodyHtml || options.bodyHtml || dialogConfig.body,
                    buttons: dialogConfig.buttons || options.buttons
                });
                if (dialogConfig.buttons && dialogConfig.buttons.ok && options.buttons && options.buttons.ok) {
                    _.extend(options, {
                        buttons: _.extend({}, options.buttons, {
                            ok: {
                                text: dialogConfig.buttons.ok.text || options.buttons.ok.text,
                                onClick: options.buttons.ok.onClick
                            }
                        })
                    });
                }
                if (dialogConfig.buttons && dialogConfig.buttons.cancel && options.buttons && options.buttons.cancel) {
                    _.extend(options, {
                        buttons: _.extend({}, options.buttons, {
                            cancel: {
                                text: dialogConfig.buttons.cancel.text || options.buttons.cancel.text,
                                onClick: options.buttons.cancel.onClick
                            }
                        })
                    });
                }
                this.openModalDialog(options);
            } else {
                this.openModalDialog(options);
            }
        }
    });
    return DialogService;
});


define('AwaLabs.Dialog', [
    'Dialog.Service'
], function AwaLabsDialog() {
    'use strict';
});


};

extensions['SuiteLabs.DynamicHeight.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/DynamicHeight/1.0.0/' + asset;
}

define('SuiteLabs.DynamicHeight.Main', [
    'DynamicHeight.Facets.Browse.View'
], function SuiteLabsDynamicHeightMain() {
    'use strict';
});


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


};

extensions['AwaLabs.DynamicMerchandisingZones.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/DynamicMerchandisingZones/2.0.0/' + asset;
}

define('MerchandisingZoneSliders', [
    'Merchandising.View',
    'ItemRelations.RelatedItem.View',
    'SC.Configuration',
    'Backbone',
    'underscore',
    'Utils',
    'jQuery'
], function MerchandisingZoneSlider(
    MerchandisingView,
    ItemRelationsRelatedItemView,
    Configuration,
    Backbone,
    _,
    Utils,
    jQuery
) {
    'use strict';

    function initBxSlider($element, options) {
        if ($element.bxSlider && !_.oldIE() && !SC.isPageGenerator()) {
            return $element.bxSlider(options);
        }
        return $element;
    }

    _.mixin({
        initBxSlider: initBxSlider
    });

    _.extend(MerchandisingView.prototype, {
        initSlider: function initSlider() {

            var sliders = [
                '.main'
            ];

            var sliderBaseOptions = {
                nextText: '<a class="home-slider-next-icon"><\/a>',
                prevText: '<a class="home-slider-prev-icon"><\/a>',
                minSlides: 2,
                maxSlides: 4,
                slideWidth: 350,
                forceStart: true,
                infiniteLoop: true,
                preloadImages: 'all',
                slideMargin: 10,
                shrinkItems: true
            };

            _.each(sliders, function eachSliders(slider){
                _.initBxSlider(jQuery( slider + ' [data-type="carousel-items"]'), sliderBaseOptions);
            });
        }
    });

});


define('AwaLabs.DynamicMerchandisingZones', [
    'MerchandisingZoneSliders',
    'Item.Collection',
    'Merchandising.View',
    'Backbone',
    'underscore',
    'Utils',
    'awalabs_dynamicmerchandisingzones.tpl'
], function DynamicMerchandisingZone(
    MerchandisingZoneSliders,
    ItemCollection,
    MerchandisingView,
    Backbone,
    _,
    Utils,
    awalabsDynamicmerchandisingzones
) {
    'use strict';

    var loadTpl = function loadTplIntoView(view, tplName) {
        var tplFn;

        if (tplName) {
            // we try to get the 'template' from the merchandising rule
            try {
                tplFn = Utils.requireModules(tplName + '.tpl');
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn('Template ' + tplName + ' is not compiled into the application, using default');
            }
            if (tplFn) {
                view.template = tplFn;
            } else {
                view.template = awalabsDynamicmerchandisingzones;
            }
        } else {
            view.template = awalabsDynamicmerchandisingzones;
        }
    };

    return {
        mountToApp: function mountToApp(application) {
            var Layout = application.getLayout();
            this.application = application;

            Backbone.Events.on('cms:custom:merchzone-rendered',

                function onMZRender(itemsData, options) {
                    _.defer(function deferredAppend() {
                        var $placeHolder = Layout.$('#' + options.divId);
                        var collection = new ItemCollection(itemsData, { parse: true });

                        var view = new MerchandisingView({
                            items: collection,
                            model: new Backbone.Model({
                                show: Infinity
                            })
                        });

                        var containerTpl = $placeHolder.closest('[data-cms-area]').data('template');

                        loadTpl(view, containerTpl || options.tpl);


                        view.setElement($placeHolder[0]);
                        view.render();
                        view.trigger('afterMerchandAppendToDOM');

                    });
                }
            );
        }
    };
});


};

extensions['SuiteLabs.ExcludeFromSEO.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/ExcludeFromSEO/1.0.0/' + asset;
}

define('SuiteLabs.ExcludeFromSEO.Facets.Browse.View', [
    'Facets.Browse.View',
    'Configuration',
    'jQuery',
    'underscore'
], function SuiteLabsExcludeFromSEOFacetsBrowseView(
    FacetsBrowseView,
    Configuration,
    jQuery,
    _
) {
    'use strict';

    var META_ROBOTS_ID = 'facet-seo-ignore';

    return _(FacetsBrowseView.prototype).extend({
        initialize: _(FacetsBrowseView.prototype.initialize).wrap(function initialize(fn) {
            var init = fn.apply(this, _(arguments).toArray().slice(1));
            var excludeFromSEO = false;
            var facetsToExclude = _(
                _(Configuration.get('facets')).filter(function (facet) {
                    return facet.seoExclude;
                })
            ).pluck('id');

            if (SC.isPageGenerator()) {
                _(this.translator.facets).each(function eachFacet(facet) {
                    excludeFromSEO = excludeFromSEO || _(facetsToExclude).contains(facet.id);
                });
                if (excludeFromSEO) {
                    this.addMetaExclude();
                } else {
                    this.removeMetaExclude();
                }
            }
            return init;
        }),

        addMetaExclude: function addMetaExclude() {
            return !jQuery('#' + META_ROBOTS_ID).length ? jQuery('head').append(
                '<meta id="' + META_ROBOTS_ID + '" name="robots" content="noindex">'
            ) : false;
        },

        removeMetaExclude: function removeMetaExclude() {
            return jQuery('#' + META_ROBOTS_ID).remove();
        }
    });
});


define('SuiteLabs.ExcludeFromSEO.Main', [
    'SuiteLabs.ExcludeFromSEO.Facets.Browse.View'
], function (

) {
    'use strict';

    return {};
});


};

extensions['AwaLabs.FacetsSettings.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/FacetsSettings/2.1.0/' + asset;
}

define('FacetsSettings.Facets', [
    'Facets',
    'underscore'
], function FacetsSettingsFacets(
    Facets,
    _
) {
    'use strict';

    _.extend(Facets, {
        facetConfigParsers: _.extend(Facets.facetConfigParsers, {
            'float': function float(value) {
                return parseFloat(value).toFixed(2);
            }
        })
    });
});


define('AwaLabs.FacetsSettings', [
    'Profile.Model',
    'Configuration',
    'underscore',
    'FacetsSettings.Facets'
], function FacetsSettings(
    ProfileModel,
    Configuration,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            if (layout) {
                layout.addToViewContextDefinition('Facets.Empty.View', 'displayNotLoggedInCatagoryMessage', 'boolean',
                    function displayNotLoggedInCatagoryMessage(context) {
                        return ProfileModel.getInstance().get('isLoggedIn') === 'F' && !context.keywords;
                    });
            }
            Configuration.searchApiMasterOptions = this.addFacetsAndExcludes(Configuration.searchApiMasterOptions);
        },
        addFacetsAndExcludes: function addFacetsAndExcludes(apiOptions) {
            var facetExclude = Configuration.get('excludeFacets.facets') || [];
            var masterFacets = Configuration.get('masterFacets.facets') || [];
            _.each(apiOptions, function eachApiOptions(value) {
                value['facet.exclude'] = facetExclude.join(',');
                _.each(masterFacets, function eachMasterFacet(masterFacet) {
                    if (!value[masterFacet.id]) {
                        value[masterFacet.id] = masterFacet.value;
                    }
                });
            });
            return apiOptions;
        }
    };
});



};

extensions['AwaLabs.Favicon.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Favicon/2.0.0/' + asset;
}

define('AwaLabs.Favicon', [
], function Favicon(
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            var faviconHtml = '<link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png">' +
            '<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">' +
            '<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">' +
            '<link rel="manifest" href="/favicon/site.webmanifest">' +
            '<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000">' +
            '<link rel="shortcut icon" href="/favicon/favicon.ico">' +
            '<meta name="msapplication-TileColor" content="#ffffff">' +
            '<meta name="msapplication-config" content="/favicon/browserconfig.xml">' +
            '<meta name="theme-color" content="#ffffff">';
            jQuery('[rel="shortcut icon"]').replaceWith(faviconHtml);
        }
    };
});


};

extensions['AwaLabs.FavoritesList.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/FavoritesList/2.1.0/' + asset;
}

define('FavoritesList.ProductList.Utils', [
    'ProductList.Utils',
    'underscore',
    'ProductList.Item.Model',
    'FavoritesList.ControlSingle.View',
    'ProductList.Control.View',
    'ProductList.Model',
    'MyAccountMenu',
    'ProductList.Collection',
    'jQuery',
    'Utils',
    'MenuTree.View'
], function FavoritesListProductListUtils(
    ProductListUtils,
    _,
    ProductListItemModel,
    FavoritesListControlSingleView,
    ProductListControlView,
    ProductListModel,
    MyAccountMenu,
    ProductListCollection,
    jQuery,
    Utils,
    MenuTreeView
) {
    'use strict';

    var productListsInstance;

    _.extend(ProductListUtils.ProductListUtils.prototype, {
        profileModelPromiseDone: function profileModelPromiseDone() {
            var utils = this.application.ProductListModule.Utils;
            var layout = this.application.getLayout();
            if (!utils.isProductListEnabled()) {
                return;
            }
            utils.renderProductLists();
            layout.on('afterAppendView', function afterAppendViewFn(view) {
                utils.renderProductLists(view);
            });
            layout.on('afterAppendToDom', function afterAppendToDomFn() {
                utils.renderProductLists();
            });
            // Put this code block outside afterAppendView to avoid infinite loop!
            utils.getProductListsPromise().done(function doneFn() {
                utils.productListsPromiseDone();
                utils.favoritesListPromiseDone();
            });
            ProductListItemModel.prototype.keyMapping = this.application.getConfig(
                'itemKeyMapping',
                {}
            );
            ProductListItemModel.prototype.itemOptionsConfig = this.application.getConfig(
                'itemOptions',
                []
            );
        },
        getProjetsLists: function getProjetsLists() {
            var application = this.application;
            var defaultTemplate = application.getConfig('productList.listTemplates')[0];
            var result;
            if (productListsInstance) {
                result = _.filter(productListsInstance.models, function filterProductListsInstances(list) {
                    var listName = list.get('name') ? list.get('name').toLocaleLowerCase() : '';
                    var defaultName = (defaultTemplate && defaultTemplate.name && defaultTemplate.name.toLocaleLowerCase()) || 'my favorites';
                    var defaultLegacyName = 'my list';
                    return listName !== defaultName && listName !== defaultLegacyName;
                });
                return new ProductListCollection(result);
            }
            return null;
        },
        favoritesListPromiseDone: function favoritesListPromiseDone() {
            var menu = MyAccountMenu.getInstance();
            var layout = this.application.getLayout();
            var utils = this.application.ProductListModule.Utils;
            var favoriteLists = utils.getFavoriteList();
            var singleList = favoriteLists && favoriteLists.length && favoriteLists[0];
            var productListMenuItem = layout.$('.header-profile-single-productlist');
            var productListHashtag = '#favorite/' + (singleList.get('internalid') ?
                singleList.get('internalid') :
                ('tmpl_' + singleList.get('templateid')));

            menu.addEntry({
                id: 'productlist_' +
                        (singleList.get('internalid') ?
                            singleList.get('internalid') :
                            ('tmpl_' + singleList.get('templateid'))),
                name: 'Favorites (' + singleList.get('items').length + ')',
                url: 'favoriteslist/' + (singleList.get('internalid') ?
                        singleList.get('internalid') :
                        ('tmpl_' + singleList.get('templateId'))),
                index: 2.5
            });

            if (utils.isSingleList()) {
                if (singleList && productListMenuItem) {
                    productListMenuItem.text(singleList.get('name'));
                    productListMenuItem.attr('data-hashtag', productListHashtag);
                }
            }
        },
        getFavoriteList: function getFavoriteList() {
            productListsInstance = this.application.ProductListModule.Utils.getProductLists();
            if (productListsInstance) {
                return _.filter(productListsInstance.models, function filterProductListsInstances(list) {
                    var listName = list.get('name') ? list.get('name').toLocaleLowerCase() : '';
                    var defaultName = 'my favorites';
                    var defaultLegacyName = 'my list';
                    return listName === defaultName || listName === defaultLegacyName;
                });
            }

            return null;
        },
        renderControl: function renderControl(view_) {
            var utils = this.application.ProductListModule.Utils;
            var self = this;
            var $favoritesContainer;
            var $projectsContainer;
            var projectsControl = null;
            var productListsPromise = utils.getProductListsPromise();
            var view = view_ || this.application.getLayout().currentView;
            var isSingleListMode = utils.isSingleList();
            this.placeholder = {
                projectsControl: '[data-type="productlists-control"]',
                favoritesControl: '[data-type="favorites-control"]'
            };
            jQuery(this.placeholder.favoritesControl).each(function eachFavoritControl() {
                var favoritesControl = null;
                $favoritesContainer = jQuery(this);

                productListsPromise.done(function productListsPromiseDone() {
                    // this control needs a reference to the StoreItem model !
                    if (view && view.model) {
                        favoritesControl = new FavoritesListControlSingleView({
                            collection: utils.getProductLists(),
                            product: view.model,
                            application: self.application
                        });
                        $favoritesContainer.empty().append(favoritesControl.$el);
                        favoritesControl.render();
                    }
                });
            });
            if ($favoritesContainer && productListsPromise.state() === 'pending') {
                $favoritesContainer.empty().append('<button class="product-list-control-button-wishlist">' +
                    _('Loading Favorites...').translate() + '</button>');
            }
            jQuery(this.placeholder.projectsControl).each(function projectControlsDone() {
                $projectsContainer = jQuery(this);
                productListsPromise.done(function productListsPromiseDone() {
                    // this control needs a reference to the StoreItem model !
                    if (view && view.model) {
                        view.countedClicks = {};

                        projectsControl = new ProductListControlView({
                            collection: utils.getProductLists(),
                            product: view.model,
                            application: this.application,
                            isDisabledWishlistButton: !!jQuery(utils.placeholder.control).data(
                                'disabledbutton'
                            ),
                            countedClicks: view.countedClicks
                        });
                    }

                    $projectsContainer.empty().append(projectsControl.$el);
                    projectsControl.render();
                });
            });

            if ($projectsContainer && productListsPromise.state() === 'pending') {
                $projectsContainer
                    .empty()
                    .append(
                        '<button class="product-list-control-button-wishlist">' +
                        (isSingleListMode
                            ? Utils.translate('Loading List...')
                            : Utils.translate('Loading Lists...')) +
                        '</button>'
                    );
            }
        },
        getSavedForLaterProductList: function getSavedForLaterProductList() {
            var productList = new ProductListModel();
            var favoritesList = this.getFavoriteList();
            if (favoritesList.length) {
                favoritesList = favoritesList[0];
            }
            productList.set('internalid', favoritesList.id);
            return productList.fetch();
        },
        buildSubMenuEntry: function buildSubMenuEntry(productlist, entryId) {
            return {
                entryId: entryId,
                id:
                    'productlist_' +
                    (productlist.get('internalid') || 'tmpl_' + productlist.get('templateId')),
                url:
                    'project/' +
                    (productlist.get('internalid') || 'tmpl_' + productlist.get('templateId')),
                name:
                    (productlist.get('name') === 'My list'
                        ? Utils.translate('My list')
                        : productlist.get('name')) +
                    ' (' +
                    productlist.get('items').length +
                    ')',
                index: 2
            };
        },
        updateProductListMenu: function updateProductListMenu() {
            var utils = this;
            var productLists = utils.getProjetsLists();
            var menu = MyAccountMenu.getInstance();
            var newMenuEntry;
            var self = this;
            function buildNewEntry() {
                return {
                    id: 'productlists',
                    name: Utils.translate('Projects'),
                    url: '',
                    // Index of the menu item for menu order
                    index: 2
                };
            }
            function buildSingleListNewEntry() {
                var theSingleList = productLists.at(0);
                return {
                    id:
                        'productlist_' +
                        (theSingleList.get('internalid')
                            ? theSingleList.get('internalid')
                            : 'tmpl_' + theSingleList.get('templateId')),
                    name: theSingleList.get('name'),
                    url:
                        'project/' +
                        (theSingleList.get('internalid')
                            ? theSingleList.get('internalid')
                            : 'tmpl_' + theSingleList.get('templateId')),
                    // Index of the menu item for menu order
                    index: 2
                };
            }
            if (!utils.isProductListEnabled()) {
                menu.removeEntry('product_list_dummy');
            } else {
                newMenuEntry = utils.isSingleList() ? buildSingleListNewEntry() : buildNewEntry();
                this.entryId = newMenuEntry.id;
                if (productLists && productLists.models) {
                    menu.replaceEntry('product_list_dummy', {
                        id: newMenuEntry.id,
                        name: newMenuEntry.name +
                        ' (' +
                        productLists.models.length +
                        ')',
                        index: newMenuEntry.index,
                        url: newMenuEntry.url
                    });
                }

                if (!utils.isSingleList()) {
                    productLists.each(function eachProductLists(productlist) {
                        menu.addSubEntry(
                            utils.buildSubMenuEntry(productlist, newMenuEntry.id)
                        );
                    });
                }
            }
            _.each(productLists.models, function eachProductListModel(list) {
                list.get('items').on('add remove', function addRemoveItems() {
                    var subMenuEntry = utils.buildSubMenuEntry(list, self.entryId);
                    MyAccountMenu.getInstance().replaceSubEntry(subMenuEntry.id, subMenuEntry);
                    MenuTreeView.getInstance().updateMenuItemsUI();
                });
            });
            MenuTreeView.getInstance().updateMenuItemsUI();

            productLists.on('add', function addProductLists(model) {
                MyAccountMenu.getInstance().addSubEntry(
                    utils.buildSubMenuEntry(model, self.entryId)
                );

                menu.replaceEntry(newMenuEntry.id, {
                    id: newMenuEntry.id,
                    name: newMenuEntry.name +
                    ' (' +
                    productLists.models.length +
                    ')',
                    index: newMenuEntry.index,
                    url: newMenuEntry.url
                });
                MenuTreeView.getInstance().updateMenuItemsUI();
            });
            productLists.on('remove', function removeProductLists(model) {
                MyAccountMenu.getInstance().removeSubEntry(
                    utils.buildSubMenuEntry(model, self.entryId).id
                );

                menu.replaceEntry(newMenuEntry.id, {
                    id: newMenuEntry.id,
                    name: newMenuEntry.name +
                    ' (' +
                    productLists.models.length +
                    ')',
                    index: newMenuEntry.index,
                    url: newMenuEntry.url
                });

                MenuTreeView.getInstance().updateMenuItemsUI();
            });
        }

    });
});


define('FavoritesList.ProductList.Details.View', [
    'ProductList.Details.View',
    'Backbone.CollectionView',
    'ProductList.DisplayFull.View',
    'GlobalViews.Confirmation.View',
    'ProductList.Model',
    'Profile.Model',
    'MenuTree.View',
    'Backbone',
    'Configuration',
    'ListHeader.View',
    'ProductList.BulkActions.View',
    'Handlebars',
    'underscore'
], function FavoritesListProductListDetailsView(
    ProductListDetailsView,
    BackboneCollectionView,
    ProductListDisplayFullView,
    GlobalViewsConfirmationView,
    ProductListModel,
    ProfileModel,
    MenuTreeView,
    Backbone,
    Configuration,
    ListHeaderView,
    ProductListBulkActionsView,
    Handlebars,
    _
) {
    'use strict';

    _.extend(ProductListDetailsView.prototype, {
        events: _.extend(ProductListDetailsView.prototype.events, {
            'click [data-action="delete-project"]': 'askDeleteList',
            'click [data-action="add-items-to-quote"]': 'addItemsToQuotetBulkHandler'
        }),
        childViews: _.extend(ProductListDetailsView.prototype.childViews, {
            'ProductList.DynamicDisplay': function ProductListDynamicDisplay() {
                var displayOption = this.getDisplayOption();
                var rows = parseInt(displayOption.columns, 10) || 3;
                return new BackboneCollectionView({
                    childView: ProductListDisplayFullView,
                    collection: this.collection.models,
                    viewsPerRow: rows,
                    childViewOptions: {
                        application: this.application,
                        show_edit_action: true,
                        show_move_action: true,
                        listId: this.model.id,
                        parentView: this,
                        isFavorite: this.options.isFavorite || false
                    }
                });
            }
        }),

        setupListHeader: function setupListHeader(collection) {
            var self = this;
            this.listHeader = new ListHeaderView({
                view: this,
                displays: true,
                application: this.application,
                avoidFirstFetch: true,
                headerMarkup: function headerMarkup() {
                    var view = new ProductListBulkActionsView({ model: self.model });
                    view.render();
                    return new Handlebars.SafeString(view.$el.html());
                },
                hideFilterExpandable: function hideFilterExpandable() {
                    return this.collection.length < 2;
                },
                selectable: true,
                collection: collection,
                sorts: this.sortOptions
            });
        },

        showContent: _.wrap(ProductListDetailsView.prototype.showContent, function showContent(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.collection.on('all', this.collectionEventsHandler, this);
        }),

        askDeleteList: function askDeleteList(e) {
            this.deleteConfirmationView = new GlobalViewsConfirmationView({
                callBackParameters: {
                    target: e.target,
                    context: this
                },
                callBack: this.deleteListHandler,
                title: _('Delete list').translate(),
                autohide: true,
                body: _('Are you sure you want to remove the project?').translate()
            });
            this.application.getLayout().showInModal(this.deleteConfirmationView);
        },

        deleteListHandler: function deleteListHandler(options) {
            var self = options.context;
            var projectsList = self.application.ProductListModule.Utils.getProductLists();
            var projectsListIntances;
            var project = self.getProject(self.model.id, projectsList);

            projectsList.remove(project);
            project.url = ProductListModel.prototype.url;

            project.destroy().done(function projectDestroy() {
                MenuTreeView.getInstance().updateMenuItemsUI();
                self.deleted = true;
                self.render();
                if (self.deleteConfirmationView && self.deleteConfirmationView.$containerModal) {
                    self.deleteConfirmationView.$containerModal.modal('hide');
                }

                Backbone.history.navigate('overview', { trigger: false });
                projectsListIntances = self.application.ProductListModule.Utils.getProductLists();
                projectsListIntances.trigger('change');
            });
        },
        getProject: function getProject(listId, projectsList) {
            return projectsList.where({ internalid: listId })[0];
        },
        showConfirmationMessage: _.wrap(ProductListDetailsView.prototype.showConfirmationMessage, function showConfirmationMessage(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.notifiyChangeToHeaders();
        }),
        collectionEventsHandler: function collectionEventsHandler(eventName) {
            switch (eventName) {
            case 'update':
                if (this.options.isFavorite) {
                    this.notifiyChangeToHeaders();
                }
                break;
            case 'destroy':
                this.notifiyChangeToHeaders();
                break;
            default:
                break;
            }
        },
        notifiyChangeToHeaders: function notifiyChangeToHeaders() {
            var projectsListIntances = this.application.ProductListModule.Utils.getProductLists();
            projectsListIntances.trigger('change');
        },
        showConfirmationHelper: _.wrap(ProductListDetailsView.prototype.showConfirmationHelper, function showConfirmationHelper(fn) {
            // eslint-disable-next-line no-undef
            if (!!SC && !!SC.SESSION && !!SC.SESSION.touchpoints && !!SC.SESSION.touchpoints.viewcart) {
                // eslint-disable-next-line no-undef
                window.location.href = SC.SESSION.touchpoints.viewcart;
            } else {
                fn.apply(this, _.toArray(arguments).slice(1));
            }
        }),
        getContext: _.wrap(ProductListDetailsView.prototype.getContext, function getContext(fn) {
            var user = ProfileModel.getInstance();
            var collection = this.model.get('items').models || [];
            var totalPrice = 0;
            var isPriceEnabled = !user.hidePrices();
            var retailPricelevel = Configuration.get('priceTogglePriceToggle');
            var useRetailPrices = user.get('isEnabledRetailPrices');
            if (isPriceEnabled) {
                try {
                    _.each(collection, function eachCollection(line) {
                        var qty = line.get('quantity');
                        var item = line.getItem();
                        var price = useRetailPrices ? item.get(retailPricelevel) : item.get('onlinecustomerprice_detail').onlinecustomerprice;
                        totalPrice += qty * price;
                    });
                    totalPrice = _.formatCurrency(totalPrice);
                } catch (e) {
                    totalPrice = _.translate('No total price available');
                }
            }
            return _.extend(fn.apply(this, _.toArray(arguments).slice(1)), {
                isPriceEnabled: isPriceEnabled,
                useRetailPrices: useRetailPrices,
                totalPrice: totalPrice,
                deleted: this.deleted
            });
        }),
        setButtonToDisabled: function setButtonToDisabled() {
            var addToCartButton = this.$el.find('.product-list-bulk-actions-button-addtocart');
            var addToCartExpander = this.$el.find('.product-list-bulk-actions-button-expander');
            var removeButton = this.$el.find('.product-list-bulk-actions-button-remove');
            var collectionLength = this.collection.models.length;
            var modelIndex = 0;
            var setDisabled = true;
            while (modelIndex < collectionLength && setDisabled) {
                if (this.collection.models[modelIndex].get('checked') === true) {
                    setDisabled = false;
                }
                modelIndex++;
            }
            addToCartButton.attr('disabled', setDisabled);
            addToCartExpander.attr('disabled', setDisabled);
            removeButton.attr('disabled', setDisabled);
        }
    });
});


define('Project.ProductList.Lists.View', [
    'ProductList.Lists.View',
    'Backbone.CollectionView',
    'ProductList.ListDetails.View',
    'Utils',
    'Backbone',
    'underscore'
], function ProjectProductListListsView(
    ProductListListsView,
    BackboneCollectionView,
    ProductListListDetailsView,
    Utils,
    Backbone,
    _
) {
    'use strict';

    _.extend(ProductListListsView.prototype, {
        childViews: _.extend(ProductListListsView.prototype.childViews, {
            'ProductList.ListDetails': function ProductListListDetails() {
                var noFavoriteCollection = this.collection.clone();
                var defaultTemplate = this.application.getConfig('productList.listTemplates');
                defaultTemplate = defaultTemplate && defaultTemplate.length && defaultTemplate[0];
                if (defaultTemplate && defaultTemplate.name) {
                    noFavoriteCollection.remove(this.collection.findWhere({ name: defaultTemplate.name }));
                }
                return new BackboneCollectionView({
                    childView: ProductListListDetailsView,
                    viewsPerRow: 1,
                    collection: noFavoriteCollection
                });
            }
        }),
        navigateToItems: function navigateToItems(e) {
            var list;
            var internalid;
            var url;
            if (Utils.isTargetActionable(e)) {
                return;
            }
            list = this.getCurrentList(e);
            internalid = list.get('internalid');
            url = '/project/' + (internalid || 'tmpl_' + list.get('templateid'));
            Backbone.history.navigate(url, { trigger: true });
        }
    });
});


define('FavoritesList.AddedToCart.Improved.View', [
    'ProductList.AddedToCart.View',
    'Backbone.CollectionView',
    'ProductList.DisplayFull.View',
    'underscore'
], function FavoritesListAddedToCartImprovedView(
    ProductListAddedToCartView,
    BackboneCollectionView,
    ProductListDisplayFullView,
    _
) {
    'use strict';

    _.extend(ProductListAddedToCartView.prototype, {
        childViews: _.extend(ProductListAddedToCartView.prototype.childViews, {
            'ProductList.ItemsAddedToCart': function ProductListItemsAddedToCart() {
                var list = this.options.list;
                var isItem = !list;
                return new BackboneCollectionView({
                    childView: ProductListDisplayFullView,
                    childViewOptions: {
                        application: this.application,
                        hide_rating: true,
                        hide_added_on: true,
                        hide_checkbox: true,
                        id: 'list',
                        name: 'List',
                        icon: 'icon-th-list',
                        isDefault: true,
                        isItemsAddedToCart: true,
                        hideStock: true
                    },
                    viewsPerRow: 1,
                    collection: isItem
                        ? [this.options.item]
                        : list.get('items').models.filter(this.isPurchasable)
                });
            }
        }),

        getContext: function getContext() {
            var list = this.options.list;
            var isItem = !list;
            var models = isItem ? [this.options.item] : list.get('items').models.filter(this.isPurchasable);

            return {
                isItem: isItem,
                hasMoreThanOneModel: models.length > 1,
                listName: !isItem ? list.get('name') : this.options.item.get('item').displayname,
                modelsLength: models.length,
                isItemsAddedToCart: this.options.isItemsAddedToCart || false
            };
        }
    });
});


define('FavoritesList.BulkActions.Extended.View', [
    'ProductList.BulkActions.View',
    'ShareFavorites.Model',
    'Profile.Model',
    'underscore'
], function FavoritesListBulkActionsExtendedView(
    BulkActionsExtendedView,
    ShareFavoritesModel,
    ProfileModel,
    _
) {
    'use strict';

    _.extend(BulkActionsExtendedView.prototype, {
        getContext: _.wrap(BulkActionsExtendedView.prototype.getContext, function getContext(fn) {
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices') ? 'T' : 'F';
            var share = new ShareFavoritesModel();
            var url = _.translate(share.url() + '?userid=$(0)&listid=$(1)&enableprice=$(2)&useretailprice=$(3)',
                user.get('internalid'), this.model.id, !user.hidePrices() ? 'T' : 'F', useRetailPrices);
            return _.extend(fn.apply(this, _.toArray(arguments).slice(1)), {
                isFavorite: this.model.get('templateId') === '1',
                isPriceEnabled: !user.hidePrices(),
                pdfUrl: url
            });
        })
    });
});


define('FavoritesList.ControlSingle.View', [
    'ProductList.ControlSingle.View',
    'favorites_list_control_single.tpl',
    'ProductList.Control.View',
    'underscore',
    'jQuery'
], function FavoritesListControlSingleView(
    ProductListControlSingleView,
    favoritesListControlSingleTpl,
    ProductListControlView,
    _,
    jQuery
) {
    'use strict';

    return ProductListControlSingleView.extend({
        template: favoritesListControlSingleTpl,
        events: {
            'click [data-type="add-product-to-single-list"]': 'addRemoveProduct'
        },
        triggerChange: ProductListControlView.prototype.triggerChange,
        initialize: _.wrap(ProductListControlSingleView.prototype.initialize, function initialize(fn) {
            var favoriteslist;
            fn.apply(this, _.toArray(arguments).slice(1));
            this.utils = this.options.application.ProductListModule.Utils;
            favoriteslist = this.utils.getFavoriteList();
            this.single_list = this.utils.getProductLists().length === 1 ? this.collection.at(0) : _.find(this.collection.models, function findModel(list) {
                return list.get('name') === favoriteslist[0].get('name');
            });
            this.on('afterViewRender', function fnAfterViewRender() {
                _.defer(function fnDefer() {
                    if (jQuery('.stock-notifications-accordion').length) {
                        jQuery('.favorites-wrap').addClass('no-stock');
                    }
                });
            });
        }),
        isProductAlreadyAdded: function isProductAlreadyAdded() {
            return !!this.single_list && this.single_list.checked(this.product);
        },
        addRemoveProduct: function addRemoveProduct(e) {
            if (!this.isProductAlreadyAdded()) {
                this.addItemToSingleList(e);
            } else {
                this.removeItemFromList(this.product, e);
            }
        },
        removeItemFromList: function removeItemFromList(product, e) {
            var self = this;
            var productId = this.getProductId(product);
            var productItem = this.single_list.get('items').find(function findSingleList(item) {
                return (
                    parseInt(item.get('item').get('internalid'), 10) === parseInt(productId, 10)
                    || parseInt(item.get('item').get('originalid'), 10) === parseInt(productId, 10));
            });
            e.preventDefault();

            if (productItem) {
                productItem.set('productList', {
                    id: self.single_list.get('internalid') || self.single_list.get('originalid'),
                    owner: self.single_list.get('owner').id
                });
                this.single_list.get('items').remove(productItem);

                productItem.destroy().done(function destroyItemDone() {
                    self.single_list.collection.trigger('changed');
                    self.render();
                    self.triggerChange();
                });
            } else {
                self.render();
            }
        },
        getContext: function getContext() {
            var model = this.single_list;
            return {
                isProductAlreadyAdded: this.isProductAlreadyAdded(),
                name: model && model.get('name'),
                id: model && model.get('internalid')
            };
        }
    });
});


define('ShareFavorites.Model', [
    'Backbone',
    'underscore'
], function ShareFavoritesModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/ShareFavorites.Service.ss'))
    });
});


define('FavoritesList.CartSaveForLater.View', [
    'Cart.Detailed.View',
    'underscore'
], function FavoritesListCartSaveForLaterView(
    CartDetailedView,
    _
) {
    'use strict';

    _.extend(CartDetailedView.prototype, {
        disableElementsOnPromise: _.wrap(CartDetailedView.prototype.disableElementsOnPromise, function disableElementsOnPromise(fn, wholePromise) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            wholePromise.done(function wholePromiseDone() {
                var projectsListIntances = self.application.ProductListModule.Utils.getProductLists();
                projectsListIntances.trigger('change');
            });
        })
    });
});


define('FavoritesList.ProductList.DetailsLater.View', [
    'ProductList.DetailsLater.View',
    'Profile.Model',
    'underscore'
], function FavoritesListProductListDetailsLaterView(
    ProductListDetailsLaterView,
    ProfileModel,
    _
) {
    'use strict';

    var favoritesPromise;
    _.extend(ProductListDetailsLaterView.prototype, {
        loadProductList: _.wrap(ProductListDetailsLaterView.prototype.loadProductList, function loadProductList(fn) {
            var self = this;
            if (this.model.get('typeName') !== 'default' && this.model.get('name') !== 'Favorites') {
                return fn.apply(this, _.toArray(arguments).slice(1));
            }
            if (!favoritesPromise) {
                ProfileModel.getPromise().done(function profileGetPromiseDone() {
                    if (ProfileModel.getInstance().get('isLoggedIn') === 'T') {
                        self.favoritesUtils = self.options.application.ProductListModule.Utils;

                        self.favoritesUtils.getProductListsPromise().done(function getProductListsPromiseDone() {
                            var favoritesList = self.favoritesUtils.getFavoriteList();
                            if (favoritesList.length) {
                                favoritesList = favoritesList[0];
                                favoritesPromise = self.favoritesUtils.getProductList(favoritesList.id).done(function getProductListDone(favoriteList) {
                                    favoriteList.name = _.translate('Favorites');
                                    self.favoriteList = favoriteList;
                                    self.isLoading = false;
                                    self.model.set(favoriteList);
                                    self.render();
                                });
                            }
                        });
                    }
                });
            }

            return favoritesPromise;
        }),
        disableElementsOnPromise: _.wrap(ProductListDetailsLaterView.prototype.disableElementsOnPromise, function disableElementsOnPromise(fn, wholePromise) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            wholePromise.done(function wholePromiseDone() {
                self.notifiyChangeToHeaders();
            });
        }),
        showConfirmationMessage: _.wrap(ProductListDetailsLaterView.prototype.showConfirmationMessage, function showConfirmationMessage(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.notifiyChangeToHeaders();
        }),
        notifiyChangeToHeaders: function notifiyChangeToHeaders() {
            var projectsListIntances = this.application.ProductListModule.Utils.getProductLists();
            projectsListIntances.trigger('change');
        },
        getContext: _.wrap(ProductListDetailsLaterView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            originalRet.name = this.model.get('name');
            return originalRet;
        })
    });
});


define('FavoritesList.ProductList.Control.View', [
    'ProductList.Control.View',
    'ProductList.ControlSingle.View',
    'FavoritesList.ControlSingle.View',
    'ProductList.Collection',
    'Tracker',
    'underscore',
    'Utils'
], function FavoritesListProductListControlView(
    ProductListControlView,
    ProductListControlSingleView,
    FavoritesListControlSingleView,
    ProductListCollection,
    Tracker,
    _,
    Utils
) {
    'use strict';

    var ControlViewFunctions = {
        addNewProductToList: function addNewProductToList(newList) {
            this.addItemToList(this.product, newList, true);
            this.saveAndShowConfirmationMessage(
                this.$('.ul-product-lists [type="checkbox"]:checked').length > 1
                    ? Utils.translate('Success! You added this item to your Projects')
                    : Utils.translate('Success! You added this item to your Project')
            );
        },
        doAddItemToList: function doAddItemToList(product, productList, dontShowMessage) {
            var self = this;
            var alreadyAdded = false;
            var productListLineToSave = this.getNewItemData(product, productList);
            var productLists = this.utils.getProductLists();
            if (!productLists.get(productList.get('internalid'))) {
                productLists.add(productList);
                alreadyAdded = true;
            }
            return productListLineToSave.save(null, {
                // Note this is lack of validation is require to not validate the JSON returned from the
                // services as it will lack the Model/Collection structure required to run the
                // validation. for example the list of options will be an array and not a collection
                // as the event handle that parse them didn't run yet
                validate: false,
                success: function productListSave(productListLine) {
                    if (!alreadyAdded) {
                        productList.get('items').add(productListLine);
                    } else {
                        productList.set('items', [productListLine]);
                    }

                    Tracker.getInstance().trackAddToWishlist(self.product);

                    self.collection.trigger('changed');
                    self.render();
                    self.triggerChange();
                    if (!dontShowMessage) {
                        self.saveAndShowConfirmationMessage(
                            self.$('.ul-product-lists [type="checkbox"]:checked').length > 1
                                ? Utils.translate('Success! You added this item to your product lists')
                                : Utils.translate('Success! You added this item to your product list')
                        );
                    }
                }
            });
        },
        showFlyout: _.wrap(ProductListControlView.prototype.showFlyout, function showFlyout(fn) {
            if (this.isDisabledWishlistButton) {
                return;
            }
            fn.apply(this, _.toArray(arguments).slice(1));
        }),
        triggerChange: function triggerChange() {
            var productListsInstance = this.utils.getProductLists();
            productListsInstance.trigger('change');
        }
    };

    _.extend(ProductListControlView.prototype, {
        initialize: _.wrap(ProductListControlView.prototype.initialize, function initialize(fn) {
            var favorites;
            fn.apply(this, _.toArray(arguments).slice(1));
            this.utils = this.utils ? this.utils : this.options.application.ProductListModule.Utils;
            favorites = this.utils.getFavoriteList();
            favorites = favorites && favorites.length ? favorites[0] : null;
            if (favorites) {
                this.collection = this.collection.filter(function filterFavorites(model) {
                    return (!!favorites && favorites.id !== model.id);
                });

                if (!(this.collection instanceof ProductListCollection)) {
                    this.collection = new ProductListCollection(this.collection);
                }
            }
        }),
        events: _.extend(ProductListControlView.prototype.events, {
            'click [data-action="close-message"]': function hideMessage() {
                this.hideConfirmationMessage();
            }
        })
    });

    _.extend(ProductListControlView.prototype, ControlViewFunctions);
    _.extend(ProductListControlSingleView.prototype, ControlViewFunctions);
    _.extend(FavoritesListControlSingleView.prototype, ControlViewFunctions);
});


define('FavoritesList.ProductList.DisplayFull.View', [
    'ProductList.DisplayFull.View',
    'LiveOrder.Model',
    'MenuTree.View',
    'ProductList.AddedToCart.View',
    'ProductList.Item.Model',
    'jQuery',
    'underscore',
    'Profile.Model'
], function FavoritesListProductListDisplayFullView(
    ProductListDisplayFullView,
    LiveOrderModel,
    MenuTreeView,
    ProductListAddedToCartView,
    ProductListItemModel,
    jQuery,
    _,
    ProfileModel
) {
    'use strict';

    _.extend(ProductListDisplayFullView.prototype, {
        events: {
            'click [data-action="add-this-to-cart"]': 'addItemToCartHandler',
            'click [data-action="delete-item"]': 'deleteItemsHandler',
            'change [name="quantity"]': 'updateQuantity',
            'keypress [name="quantity"]': 'ignoreEnter'
        },
        initialize: _.wrap(ProductListDisplayFullView.prototype.initialize, function initialize(fn) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            this.cart = LiveOrderModel.getInstance();
            this.application = self.options.application;
        }),
        getOptionsArray: function getOptionsArray() {
            // Iterate on the stored Product List Item options and create an id/value object compatible with the existing options renderer...
            var optionValues = [];
            var selectedOptions = this.model.get('options');
            selectedOptions.each(function eachSelectedOptions(value) {
                optionValues.push({
                    id: value.get('cartOptionId'),
                    value: value.get('value') && value.get('value').id,
                    displayvalue: value.get('value') && value.get('value').label
                });
            });
            return optionValues;
        },
        addItemToCartHandler: function addItemToCartHandler(e) {
            var self = this;
            var selectedProductListItem = this.model;
            var selectedItem = selectedProductListItem.get('item');
            var selectedItemInternalid = selectedItem.get('internalid');
            var addToCartPromise = this.cart.addProduct(selectedProductListItem);
            var wholePromise = jQuery.when(addToCartPromise).then(jQuery.proxy(self, 'showConfirmationHelper', selectedProductListItem));

            e.stopPropagation();
            e.preventDefault();

            if (wholePromise) {
                this.disableElementsOnPromise(wholePromise, 'tr[data-item-id="' + selectedItemInternalid + '"] button');
            }
        },
        deleteItemsHandler: function deleteItemsHandler(e) {
            var self = this;
            var selectedModel = self.model;
            var deletePromise;
            var item;
            var appItemList;
            e.stopPropagation();
            e.preventDefault();
            if (!selectedModel) {
                return;
            }

            // there are two collections with the same information this.model and the one on application
            // should remove the item on both
            appItemList = _.findWhere(self.application.ProductListModule.Utils.getProductLists().models, { id: self.options.listId });
            item = selectedModel;
            // fix already used in "deleteListItem"
            item.url = ProductListItemModel.prototype.url;

            if (appItemList) {
                appItemList.get('items').remove(item);
            }
            deletePromise = item.destroy().promise();

            jQuery.when.apply(jQuery, deletePromise).then(function deletePromiseThen() {
                self.options.parentView.render();
                MenuTreeView.getInstance().updateMenuItemsUI();
                self.showConfirmationMessage(_('The selected items were removed from your product list').translate());
            });
        },
        showConfirmationHelper: function showConfirmationHelper(selectedItem) {
            this.showConfirmationMessage(_('Success! The item were successfully added to your cart.' +
                ' You can continue to <a href="#" data-touchpoint="viewcart">view cart and checkout</a>').translate());
            // selected item may be undefined
            if (_.isUndefined(selectedItem) === true) {
                return;
            }

            this.addedToCartView = new ProductListAddedToCartView({
                application: this.application,
                parentView: this,
                item: selectedItem
            });

            this.application.getLayout().showInModal(this.addedToCartView);
        },
        updateQuantity: function updateQuantity(e) {
            var newQuantity = parseInt(jQuery(e.target).val(), 10);
            var currentQuantity = this.model.get('quantity');
            e.preventDefault();
            e.stopPropagation();

            jQuery(e.target).val(newQuantity);

            if (newQuantity !== currentQuantity) {
                this.model.set('quantity', newQuantity);
            }
        },
        showAddToCart: function showAddToCart() {
            var profile = ProfileModel.getInstance();
            if (profile.get('isTrade')) {
                return true;
            }
            return this.model.get('item') && this.model.get('item').get('isinstock');
        },
        getContext: _.wrap(ProductListDisplayFullView.prototype.getContext, function getContext(fn) {
            var self = this;
            var profile = ProfileModel.getInstance();
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var itemDetails = self.model.get('item');
            var stockInfo = itemDetails.getStockInfo();
            context.stockAvailability = !!stockInfo && typeof (stockInfo.stock) !== 'undefined' ? stockInfo.stock : 'loading ...';
            context.isItemsAddedToCart = this.options.isItemsAddedToCart || false;
            context.hideStock = this.options.hideStock || false;
            context.isFavorite = this.options.isFavorite || false;
            context.sku = itemDetails ? itemDetails.get('itemid') : '';
            context.showAddToCart = this.showAddToCart();
            context.isTradeAndNotIsBackOrderable = profile.get('isTrade') &&
                self.model.get('item') &&
                !self.model.get('item').get('isbackorderable') &&
                self.model.get('item').get('quantityavailable') === 0;
            return context;
        })
    });
});


define('Header.MiniFavorites.View', [
    'Header.MiniFavoritesItemCell.View',
    'Profile.Model',
    'Configuration',
    'header_mini_favorites.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'underscore',
    'Utils'
],
function HeaderMiniFavoritesView(
    HeaderMiniFavoritesItemCellView,
    ProfileModel,
    Configuration,
    headerMiniFavoritesTpl,
    _,
    Backbone,
    BackboneCompositeView,
    BackboneCollectionView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniFavoritesTpl,
        favoriteList: null,
        initialize: function initialize() {
            var self = this;
            this.FavoritesUtils = this.options.application.ProductListModule.Utils;
            // for loading status
            this.isLoading = true;
            this.ItemsCount = 0;
            // Favorites Favorites promise
            this.FavoritesUtils.getProductListsPromise().done(function getProductListsPromiseDone() {
                var FavoritesList = self.FavoritesUtils.getFavoriteList();
                var productListsInstance = self.FavoritesUtils.getProductLists();
                if (FavoritesList.length) {
                    FavoritesList = FavoritesList[0];
                    self.FavoritesUtils.getProductList(FavoritesList.id).done(function getProductListDone(favoriteList) {
                        self.favoriteList = favoriteList;
                        self.isLoading = false;
                        self.render();
                    });
                }

                productListsInstance.on('change', function productListsInstanceChange() {
                    FavoritesList = self.FavoritesUtils.getFavoriteList();
                    if (FavoritesList.length) {
                        FavoritesList = FavoritesList[0];
                        self.FavoritesUtils.getProductList(FavoritesList.id).done(function getProductListDone2(favoriteList) {
                            self.favoriteList = favoriteList;
                            self.isLoading = false;
                            self.render();
                        });
                    }
                });
            });

            BackboneCompositeView.add(this);
        },

        render: function render() {
            Backbone.View.prototype.render.apply(this, arguments);
            // on tablet or desktop make the minicart dropdown
            if (_.isTabletDevice() || _.isDesktopDevice()) {
                this.$('[data-type="mini-favorites"]').attr('data-toggle', 'dropdown');
            }
        },
        getItemsSummary: function getItemsSummary() {
            var count = 0;
            var cost = 0;
            var retailPricelevel = Configuration.get('priceTogglePriceToggle');
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');
            var totalCost = 0;
            if (!this.isLoading) {
                _.each(this.favoriteList.items, function eachFavoriteItem(line) {
                    count += line.quantity;
                    cost = useRetailPrices ? line.item[retailPricelevel] : line.item.onlinecustomerprice_detail.onlinecustomerprice;
                    totalCost += line.quantity * cost;
                });
            }
            return {
                count: count,
                totalCost: totalCost
            };
        },
        childViews: {
            'Header.MiniFavoritesItemCell': function HeaderMiniFavoritesItemCell() {
                var favoriteList = this.favoriteList;
                var lines = favoriteList.items;
                return new BackboneCollectionView({
                    collection: !this.isLoading ? new Backbone.Collection(lines) : new Backbone.Collection(),
                    childView: HeaderMiniFavoritesItemCellView,
                    viewsPerRow: 1
                });
            }
        },
        getContext: function getContext() {
            var summary = this.getItemsSummary();
            return {
                url: this.favoriteList ? 'favoriteslist/' + (this.favoriteList.internalid || 'tmpl_' + this.favoriteList.templateid) : '',
                ItemsCount: summary.count,
                totalCost: _.formatCurrency(summary.totalCost),
                isLoading: this.isLoading,
                showLines: summary.count > 0,
                id: !!this.favoriteList && this.favoriteList.internalid,
                showCost: !ProfileModel.getInstance().hidePrices()
            };
        }
    });
});


define('Header.MiniFavoritesItemCell.View', [
    'Configuration',
    'Transaction.Line.Views.Option.View',
    'Profile.Model',
    'Item.Model',
    'header_mini_favorites_item_cell.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'underscore',
    'Utils'
],
function HeaderMiniFavoritesItemCellView(
    Configuration,
    ItemViewsSelectedOptionView,
    ProfileModel,
    ItemDetailsModel,
    headerMiniFavoritesItemCellTpl,
    _,
    Backbone,
    BackboneCompositeView,
    BackboneCollectionView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniFavoritesItemCellTpl,
        initialize: function initialize() {
            var item = this.model.get('item');
            var itemDetails = new ItemDetailsModel(item);
            this.model.set('itemDetails', itemDetails);
            BackboneCompositeView.add(this);
        },
        childViews: {
            'Item.SelectedOptions': function ItemSelectedOptions() {
                return new BackboneCollectionView({
                    collection: this.model.get('itemDetails').getPosibleOptions(),
                    childView: ItemViewsSelectedOptionView,
                    viewsPerRow: 1,
                    childViewOptions: {
                        cartLine: this.model,
                        templateName: 'selected'
                    }
                });
            }
        },
        getContext: function getContext() {
            var line = this.model;
            var item = line.get('item');
            var itemDetails = line.get('itemDetails');
            var retailPricelevel = Configuration.get('priceTogglePriceToggle');
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');
            return {
                loading: false,
                formattedPrice: useRetailPrices ? item[retailPricelevel + '_formatted'] : item.onlinecustomerprice_detail.onlinecustomerprice_formatted,
                name: item.displayname,
                itemType: item.itemtype,
                url: itemDetails.get('_thumbnail').url,
                altimagetext: itemDetails.get('_thumbnail').altimagetext,
                itemId: itemDetails.id,
                linkAttributes: itemDetails.getFullLink({
                    quantity: null,
                    location: null,
                    fulfillmentChoice: null
                }),
                quantity: line.get('quantity'),
                isPriceEnabled: !ProfileModel.getInstance().hidePrices()
            };
        }
    });
});


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


define('Header.MiniProjectsItemCell.View', [
    'header_mini_projects_item_cell.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView'
], function HeaderMiniProjectsItemCellView(
    headerMiniProjectsItemCellTpl,
    _,
    Backbone,
    BackboneCompositeView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniProjectsItemCellTpl,
        initialize: function initialize() {
            BackboneCompositeView.add(this);
        },
        getContext: function getContext() {
            var name = this.model.get('name');
            var id = this.model.get('id');
            var itemsCount = this.model.get('itemsCount');
            return {
                id: id,
                text: _('$(0) ($(1))').translate(name, itemsCount)
            };
        }
    });
});


define('Favorites.ProductList.Details.View', [
    'ProductList.Details.View',
    'Backbone.CollectionView',
    'ProductList.DisplayFull.View',
    'ProductList.Model',
    'Backbone',
    'underscore',
    'FavoritesList.ProductList.Details.View'
], function FavoritesProductListDetailsView(
    ProductListDetailsView,
    BackboneCollectionView,
    ProductListDisplayFullView,
    ProductListModel,
    Backbone,
    _
) {
    'use strict';


    return ProductListDetailsView.extend({
        childViews: _.extend(ProductListDetailsView.prototype.childViews, {
            'ProductList.DynamicDisplay': function ProductListDynamicDisplay() {
                var displayOption = this.getDisplayOption();
                var rows = parseInt(displayOption.columns, 10) || 3;
                return new BackboneCollectionView({
                    childView: ProductListDisplayFullView,
                    collection: this.collection.models,
                    viewsPerRow: rows,
                    childViewOptions: {
                        application: this.application,
                        show_edit_action: true,
                        show_move_action: true,
                        listId: this.model.id,
                        parentView: this,
                        isFavorite: true
                    }
                });
            }
        }),

        getContext: _.wrap(ProductListDetailsView.prototype.getContext, function getContext(fn) {
            return _.extend(fn.apply(this, _.toArray(arguments).slice(1)), {
                isFavorite: true
            });
        })
    });
});


define('FavoritesList.ProductList.Model', [
    'ProductList.Model',
    'underscore'
], function FavoritesListProductListModel(
    ProductListModel,
    _
) {
    'use strict';

    _.extend(ProductListModel.prototype, {
        getProductId: function getProductId(line) {
            if (line.getItemId) {
                return line.getItemId();
            }
            if (this.application.ProductListModule) {
                return this.application.ProductListModule.Utils.internalGetProductId(line);
            }
            return line.get('_id') + '';
        },
        getItemOptions: function getItemOptions(line) {
            var selectedOptions = line.get('options').filter(function filterOptions(option) {
                return !!option.get('value') && !!option.get('value').internalid;
            });

            return _.reduce(
                selectedOptions,
                function reduceOptions(acc, option) {
                    var value = option.get('value') || {};

                    acc[option.get('cartOptionId')] = {
                        value: value.internalid,
                        displayvalue: value.label
                    };

                    return acc;
                },
                {}
            );
        },
        checked: function checked(line) {
            var itemToAddId = this.getProductId(line);
            var itemToAddOptions = this.getItemOptions(line);
            var self = this;
            var pliOptions;
            return this.get('items').some(function someItem(pli) {
                if (
                    pli.get('item').get('internalid') === itemToAddId
                    || pli.get('item').get('originalid') === itemToAddId
                ) {
                    pliOptions = self.getItemOptions(pli);
                    if (_.isEmpty(pliOptions) && _.isEmpty(itemToAddOptions)) {
                        return true;
                    }
                    return _.isEqual(pliOptions, itemToAddOptions);
                }

                return false;
            });
        }
    });
});


define('FavoritesList.ProductList.ControlItem.View', [
    'ProductList.ControlItem.View',
    'jQuery',
    'underscore'
], function FavoritesListProductListControlItemView(
    ProductListControlItemView,
    jQuery,
    _
) {
    'use strict';

    _.extend(ProductListControlItemView.prototype, {
        pListItemHandler: function pListItemHandler(e) {
            e.preventDefault();
            e.stopPropagation();
            this.pListItemHandlerAddRemove(e);
        },
        pListItemHandlerAddRemove: _.debounce(function pListItemHandlerAddRemove(e) {
            var self = this;
            var checkbox = jQuery(e.target);
            if (self.parentView.mode === 'move') {
                self.moveProduct();
            } else {
                self.addRemoveProduct(checkbox);
            }
        }, 600),
        removeItemFromList: function removeItemFromList(product) {
            var self = this;
            var productId = this.parentView.getProductId(product);
            var productItem = self.model.get('items').find(function findItem(item) {
                return parseInt(item.get('item').get('internalid'), 10) === parseInt(productId, 10);
            });
            var productListsInstance = this.parentView.utils.getProductLists();

            if (productItem) {
                productItem.set('productList', {
                    id: self.model.get('internalid'),
                    owner: self.model.get('owner').id
                });
                this.model.get('items').remove(productItem);

                productItem.destroy().done(function productItemDestroy() {
                    self.model.collection.trigger('changed');
                    productListsInstance.trigger('change');
                    self.parentView.render();
                    self.parentView.hideConfirmationMessage();
                });
            } else {
                self.parentView.render();
            }
        }
    });
});


define('FavoritesList.RequestQuoteWizard.Module.Items', [
    'underscore',
    'ShareFavorites.Model',
    'RequestQuoteWizard.Module.Items',
    'Profile.Model'
], function FavoritesListRequestQuoteWizardModuleItems(
    _,
    ShareFavoritesModel,
    RequestQuoteWizardModuleItems,
    ProfileModel
) {
    'use strict';

    _.extend(RequestQuoteWizardModuleItems.prototype, {
        generatePdfUrl: function generatePdfUrl(user, useRetailPrices) {
            var pdfModel = new ShareFavoritesModel();
            var url = pdfModel.url();

            var urlParams = {
                userid: user.get('internalid'),
                listid: this.model.get('plInternalId'),
                enableprice: !user.hidePrices() ? 'T' : 'F',
                useretailprice: useRetailPrices
            };
            var urlSearchParams = new URLSearchParams(urlParams);
            url += '?' + urlSearchParams.toString();
            return url;
        },

        getContext: _.wrap(RequestQuoteWizardModuleItems.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');

            context.pdfUrl = this.generatePdfUrl(user, useRetailPrices);
            return context;
        })
    });
});


define('AwaLabs.FavoritesList', [
    'Profile.Model',
    'Utils',
    'ProductList.Details.View',
    'Favorites.ProductList.Details.View',
    'ProductList.Lists.View',
    'Header.MiniProjects.View',
    'Header.MiniFavorites.View',
    'ErrorManagement.PageNotFound.View',
    'underscore',
    'ProductList.Utils',
    'FavoritesList.ProductList.Utils',
    'FavoritesList.ProductList.Details.View',
    'Project.ProductList.Lists.View',
    'FavoritesList.AddedToCart.Improved.View',
    'FavoritesList.BulkActions.Extended.View',
    'FavoritesList.ProductList.DetailsLater.View',
    'FavoritesList.CartSaveForLater.View',
    'FavoritesList.ProductList.Control.View',
    'FavoritesList.ProductList.DisplayFull.View',
    'FavoritesList.ProductList.Model',
    'FavoritesList.ProductList.ControlItem.View'
], function AwaLabsFavoritesList(
    ProfileModel,
    Utils,
    ProductListDetailsView,
    FavoritesListProductListDetailsView,
    ProductListListsView,
    HeaderMiniProjectsView,
    HeaderMiniFavoritesView,
    PageNotFoundView,
    _
) {
    'use strict';

    return {
        MenuItems: {
            name: _('My Favorites').translate(),
            id: 'favoriteslist',
            index: 3,
            url: 'balance'
        },

        mountToApp: function mountToApp(application) {
            var pageType = application.getComponent('PageType');
            var layout = application.getComponent('Layout');

            pageType.registerPageType({
                name: 'Favorites',
                routes: ['favoriteslist/:id'],
                view: FavoritesListProductListDetailsView,
                options: {
                    isFavorite: true
                }
            });

            pageType.registerPageType({
                name: 'Favorites',
                routes: ['project/:id', 'project/:id/?*options'],
                view: ProductListDetailsView,
                options: {
                    isFavorite: false
                }
            });

            pageType.registerPageType({
                name: 'Projects',
                routes: ['project', 'project/?*options'],
                view: ProductListListsView,
                defaultTemplate: {
                    name: 'product_list_lists.tpl',
                    displayName: 'Projects List',
                    thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                        'img/default-layout-wishlist.png'
                    )
                }
            });

            pageType.registerPageType({
                name: 'ProjectDetails',
                routes: ['project/:id', 'project/:id/?*options'],
                view: ProductListDetailsView,
                defaultTemplate: {
                    name: 'product_list_details_tpl',
                    displayName: 'Project Details',
                    thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                        'img/default-layout-wishlist-detail.png'
                    )
                }
            });

            pageType.registerPageType({
                'name': 'Wishlist',
                'routes': ['wishlist', 'wishlist/?*options', 'wishlist/:id', 'wishlist/:id/?*options'],
                'view': PageNotFoundView,
                'defaultTemplate': {
                    'name': 'error_management_page_not_found.tpl',
                    'displayName': 'Page not found'
                }
            });

            if (layout) {
                layout.addChildViews(
                    layout.ALL_VIEWS, {
                        'Header.MiniProjects': {
                            'Header.MiniProjects': {
                                childViewIndex: 1,
                                childViewConstructor: function headerMiniProject() {
                                    return new HeaderMiniProjectsView({
                                        application: application
                                    });
                                }
                            }
                        },
                        'Header.MiniFavorites': {
                            'Header.MiniFavorites': {
                                childViewIndex: 1,
                                childViewConstructor: function cmsHomeSlider() {
                                    return new HeaderMiniFavoritesView({
                                        application: application
                                    });
                                }
                            }
                        }
                    }
                );

                layout.addToViewContextDefinition('Header.View', 'showMiniCart', 'boolean', function showMiniCart() {
                    var profile = ProfileModel.getInstance();
                    return profile.get('isLoggedIn') === 'T';
                });
            }
        }
    };
});


};

extensions['AwaLabs.FooterCopyright.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/FooterCopyright/2.1.0/' + asset;
}

define('FooterCopyright.View', [
    'SCView',
    'footer_copyright.tpl'
], function FooterCopyrightViewModule(
    SCViewComponent,
    FooterCopyrightTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function FooterCopyrightView(options) {
        SCView.call(this);
        this.options = options;
        this.template = FooterCopyrightTpl;
    }

    FooterCopyrightView.prototype = Object.create(SCView.prototype);

    FooterCopyrightView.prototype.constructor = FooterCopyrightView;

    FooterCopyrightView.prototype.getContext = function getContext() {
        var environmentComponent = this.options.application.getComponent('Environment');
        return {
            copyrightText: (environmentComponent.getConfig('footer.copyrightText') || '').replace('[YEAR]', new Date().getFullYear())
        };
    };

    return FooterCopyrightView;
});


define('AwaLabs.FooterCopyright', [
    'FooterCopyright.View'
], function FooterCopyright(
    FooterCopyrightView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'FooterCopyright': {
                        'FooterCopyright': {
                            childViewIndex: 1,
                            childViewConstructor: function footerCopyright() {
                                return new FooterCopyrightView({
                                    application: container
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});


};

extensions['SuiteLabs.Foursixty.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/Foursixty/1.0.0/' + asset;
}

define('SuiteLabs.Foursixty', [
    'jQuery'
], function SuiteLabsFoursixty(
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var foursixtyLoaded;

            if (!SC.isPageGenerator() && environment && layout) {
                window.addEventListener('foursixty.content.rendered', function foursixtyContentRendered() {
                    var scriptUrl = environment.getConfig('foursixty.scriptUrl');

                    if (!foursixtyLoaded) {
                        jQuery.getScript(scriptUrl);
                        foursixtyLoaded = true;
                    }
                });

                layout.on('afterShowContent', function toggleFoursixty() {
                    foursixtyLoaded = false;
                });
            }
        }
    };
});


};

extensions['AwaLabs.GeoIPLocation.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/GeoIPLocation/2.1.0/' + asset;
}

define('AwaLabs.GeoIpLocation', [
    'jQuery',
    'underscore',
    'Utils'
], function AwaLabsGeoIpLocation(
    jQuery,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            jQuery.getScript(_.getAbsoluteUrl(getExtensionAssetsPath('services/restrictedIp.ssp')));
        }
    };
});


};

extensions['AwaLabs.HeadContentByApplication.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/HeadContentByApplication/2.1.0/' + asset;
}

define('AwaLabs.HeadContentByApplication', [
    'jQuery',
    'Utils'
], function AwaLabsHeadContentByApplication(
    jQuery
) {
    'use strict';

    function isOnCMS() {
        return (parent && parent.location && parent.location.href.match(/\/cms\/[0-9]\/admin\/cms/ig))
            || location.href.match(/\/cms\/[0-9]\/admin\/cms/ig);
    }

    return {
        mountToApp: function mountToApp(container) {
            var $head = jQuery('head');
            var environmentComponent = container.getComponent('Environment');
            var headHtml = environmentComponent.getConfig('HeadContentByApplication.' + SC.ENVIRONMENT.SCTouchpoint);
            var $headHtmlAdd;
            if (SC.ENVIRONMENT.jsEnvironment === 'browser' && !isOnCMS() && headHtml) {
                $headHtmlAdd = jQuery(headHtml);
                $head.append($headHtmlAdd);
            }
        }
    };
});


};

extensions['AwaLabs.HeaderCustomizations.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/HeaderCustomizations/2.0.0/' + asset;
}

define('HeaderCustomizations.Header.View', [
    'Header.View',
    'underscore',
    'jQuery'
], function HeaderCustomizationsHeaderView(
    HeaderView,
    _,
    jQuery
) {
    'use strict';

    _.extend(HeaderView.prototype, {
        initialize: _.wrap(HeaderView.prototype.initialize, function initialize(fn) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            jQuery(window).on('price_change', function priceChange() {
                self.render();
            });
        })
    });
});


define('HeaderCustomizations.MyAccount.Menu', [
    'underscore'
], function HeaderCustomizationsMyAccountMenu(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var layout = container.getComponent('Layout');
            var userComponent = container.getComponent('UserProfile');
            var customerTypeFieldId = environment.getConfig('headerCustomization.customerTypeFieldId');
            var accountBalanceName = environment.getConfig('headerCustomization.accountBalanceName');
            var printStatementName = environment.getConfig('headerCustomization.printStatementName');

            userComponent.getUserProfile().then(function thenFn(user) {
                var userType = _.findWhere(user.customfields, { id: customerTypeFieldId });
                var userIsCustomer = userType && userType.value === '1';
                if (userIsCustomer) {
                    layout.addToViewContextDefinition('Header.Menu.MyAccount.View', 'entries', 'array', function fn(context) {
                        return _.map(context.entries, function mapEntries(entry) {
                            if (entry.name === 'Billing') {
                                entry.children = _.reject(entry.children, { name: accountBalanceName });
                                entry.children = _.reject(entry.children, { name: printStatementName });
                            }

                            return entry;
                        });
                    });

                    layout.addToViewContextDefinition('MenuTree.Node.View', 'node', 'array', function fn(context) {
                        var node = context.node;
                        return node.name === accountBalanceName || node.name === printStatementName ? {} : node;
                    });
                }
            });
        }
    };
});


define('AwaLabs.HeaderCustomizations', [
    'underscore',
    'Profile.Model',
    'Header.Menu.View',
    'SC.Configuration',
    'Categories',
    'HeaderCustomizations.MyAccount.Menu',
    'HeaderCustomizations.Header.View'
], function HeaderCustomizations(
    _,
    ProfileModel,
    HeaderMenuView,
    Configuration,
    Categories,
    HeaderCustomizationsMyAccountMenu
) {
    'use strict';

    return {
        addImageToRootCategories: function addImageToRootCategories() {
            var arrayImagesObject = SC.ENVIRONMENT.published.SCCategoryConfiguration;
            var imageObject;
            _.each(Configuration.navigationData, function eachNav(nav) {
                imageObject = _.find(arrayImagesObject, function findImageObject(imageObj) {
                    return imageObj.siteCategory && imageObj.siteCategory.toUpperCase() === nav.text.toUpperCase();
                });
                if (imageObject) {
                    nav.image = imageObject;
                }
            });
        },
        mountToApp: function mountToApp(container) {
            var self = this;
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();
            var showMyAccount = !profile.get('contactId') || (!!profile.get('contactId')() && profile.allowPriceControl());
            Categories.getCategoriesPromise().done(function dnFn() {
                self.addImageToRootCategories();
            });
            if (!showMyAccount) {
                HeaderMenuView.removeChildView('Header.Menu.MyAccount', 'Header.Menu.MyAccount');
            }
            if (layout) {
                layout.addToViewContextDefinition('Header.Menu.View', 'showMyAccount', 'boolean', function fn() {
                    return showMyAccount;
                });

                layout.addToViewContextDefinition('RequestQuoteAccessPoints.HeaderLink.View', 'DisplayLink', 'boolean', function fn() {
                    return profile.get('isLoggedIn') === 'T';
                });
            }

            HeaderCustomizationsMyAccountMenu.mountToApp(container);
        }
    };
});


};

extensions['SuiteLabs.HideSections.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/HideSections/1.0.0/' + asset;
}

define('AwaLabs.HideSections.Shopping', [
    'jQuery',
    'underscore'
], function AwaLabsHideSectionsShopping(
    jQuery,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var userProfile = container.getComponent('UserProfile');
            var webCustomerType = 'custentity_rad_web_customer_type';

            if (cart && environment) {
                cart.addToViewContextDefinition('Cart.Summary.View', 'showEstimate', 'boolean', function showEstimate() {
                    return !environment.getConfig('hideSections.shippingEstimate');
                });
            }

            if (layout) {
                if (environment.getConfig('hideSections.reviewRates')) {
                    layout.addToViewContextDefinition('GlobalViews.RatingByStar.View', 'rates', 'array', function overrideRates(context) {
                        var rates = context.rates;
                        _.each(rates, function fnEach(rate) {
                            rate.showCount = parseInt(rate.count || 0, 10) > 0;
                        });
                        return rates;
                    });
                }

                if (pdp && userProfile && environment.getConfig('hideSections.quantity')) {
                    layout.on('afterShowContent', function afterShowContent() {
                        var $quantity = jQuery('[data-view="Quantity"]');
                        var itemInfo = pdp.getItemInfo();
                        if (itemInfo) {
                            userProfile.getUserProfile().then(function afterGetUserProfile(user) {
                                var customerType = _.findWhere(user.customfields, { id: webCustomerType });
                                var customerIsTrade = customerType
                                    && customerType.value === '2'
                                    && user.isloggedin;
                                if (!itemInfo.item.isinstock && !customerIsTrade) {
                                    $quantity.remove();
                                }
                            });
                        }
                    });
                }
            }
        }
    };
});


};

extensions['SuiteLabs.HorizontalFacets.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/HorizontalFacets/1.0.0/' + asset;
}


define('HorizontalFacets.Facets.Browse.View', [
    'HorizontalFacets.Facets.Horizontal.View',
    'Facets.Browse.View',
    'Utils',
    'underscore'
], function HorizontalFacetsFacetsBrowseView(
    FacetsHorizontalView,
    FacetsBrowseView,
    Utils,
    _
) {
    'use strict';

    _.extend(FacetsBrowseView.prototype, {
        initialize: _.wrap(FacetsBrowseView.prototype.initialize, function initialize(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var self = this;

            function renderHorizontalFacet() {
                self._render();
                self.$el.find('[data-action="pushable"]').scPush({ target: 'tablet' });
            }

            window.removeEventListener('renderHorizontalFacet', renderHorizontalFacet);
            window.addEventListener('renderHorizontalFacet', renderHorizontalFacet);

            return ret;
        }),

        childViews: _.extend({}, FacetsBrowseView.prototype.childViews, {
            'Facets.Horizontal.View': function FacetsHorizontalChildView() {
                if (Utils.isDesktopDevice()) {
                    return new FacetsHorizontalView({
                        application: this.application,
                        translator: this.translator,
                        facets: this.model.get('facets')
                    });
                }
            }
        }),

        getContext: _.wrap(FacetsBrowseView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context.isDesktopDevice = Utils.isDesktopDevice();
            return context;
        })
    });
});



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




define('HorizontalFacets.Facets.FacetedNavigation.View', [
    'Facets.FacetedNavigation.View',
    'underscore'
], function HorizontalFacetsFacetsFacetedNavigationView(
    FacetsFacetedNavigationView,
    _
) {
    'use strict';

    _.extend(FacetsFacetedNavigationView.prototype, {
        initialize: _.wrap(FacetsFacetedNavigationView.prototype.initialize, function initialize(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var self = this;

            this.originalFacets = this.options.facets;
            this.selectedFacet = 'all';

            function displayHorizontalFacetHandler(e) {
                var selectedFacets;

                if (e.detail.id && e.detail.id !== 'all') {
                    selectedFacets = _.find(self.originalFacets, function findFacet(facet) {
                        return facet.id === e.detail.id;
                    });

                    if (selectedFacets) {
                        self.options.facets = [selectedFacets];
                    }
                } else if (e.detail.id === 'all') {
                    self.options.facets = _.reject(self.originalFacets, function rejectStandalone(facet) {
                        return self.isStandaloneFacet(facet);
                    });
                }

                self.render();
            }

            window.removeEventListener('displayHorizontalFacet', displayHorizontalFacetHandler);
            window.addEventListener('displayHorizontalFacet', displayHorizontalFacetHandler);

            return ret;
        }),

        getFacetConfig: function getFacetConfig(facet) {
            return _.find(this.options.translator.configuration.facets, function findFacetConfig(config) {
                return config.id === facet.id || config.id === facet.url;
            });
        },

        isStandaloneFacet: function isStandaloneFacet(facet) {
            var facetConfig = this.getFacetConfig(facet);

            return facetConfig && facetConfig.standaloneFacet;
        }
    });
});



define('HorizontalFacets.Facets.FacetedNavigationItem.View', [
    'Facets.FacetedNavigationItem.View',
    'Utils',
    'underscore'
], function HorizontalFacetsFacetsFacetedNavigationItemView(
    FacetsFacetedNavigationItemView,
    Utils,
    _
) {
    'use strict';

    _.extend(FacetsFacetedNavigationItemView.prototype, {
        getContext: _.wrap(FacetsFacetedNavigationItemView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var isStandaloneFacet = this.facet_config.standaloneFacet;

            context.showHeading = context.showHeading && !(isStandaloneFacet && Utils.isDesktopDevice());
            context.isCollapsed = context.isCollapsed && !(isStandaloneFacet && Utils.isDesktopDevice());

            return context;
        })
    });
});


define('SuiteLabs.HorizontalFacets.Main', [
    'HorizontalFacets.Facets.Browse.View',
    'HorizontalFacets.Facets.FacetedNavigation.View',
    'HorizontalFacets.Facets.FacetedNavigationItem.View'
], function SuiteLabsHorizontalFacetsMain() {
    'use strict';
});


};

extensions['SuiteLabs.ImageSwitcher.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/ImageSwitcher/1.0.0/' + asset;
}

define('ImageSwitcher.Facets.ItemCell.View', [
    'Facets.ItemCell.View',
    'underscore'
], function ImageSwitcherFacetsItemCellView(
    FacetsItemCellView,
    _
) {
    'use strict';

    _.extend(FacetsItemCellView.prototype, {
        getContext: _.wrap(FacetsItemCellView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));

            context.hoverImage = this.model.get('custitem_hover_img') || '';
            context.hoverImageAltTxt = this.model.get('custitem_hover_img_alt_txt') || '';

            return context;
        })
    });
});


define('SuiteLabs.ImageSwitcher.Main', [
    'ImageSwitcher.Facets.ItemCell.View'
], function SuiteLabsImageSwitcherMain() {
    'use strict';
});


};

extensions['AwaLabs.InactivityMessage.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/InactivityMessage/2.1.0/' + asset;
}

define('Session.Message', [
    'session_message.tpl',
    'InactivityMessage.ProfileModel',
    'Dialog.Service',
    'InactivityMessage.Model',
    'underscore',
    'Backbone',
    'jQuery',
    'Utils'
], function SessionMessage(
    sessionMessageTpl,
    ProfileModel,
    DialogService,
    InactivityMessageModel,
    _,
    Backbone,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: sessionMessageTpl,
        title: _('Session Timeout').translate(),
        attributes: {
            'class': 'SessionMessageView'
        },
        modalClass: 'session-timeout',
        initialize: function initialize(application) {
            var self = this;
            this.application = application;
            this.sessionExpired = false;
            this.sessionMantained = false;
            this.inactivityMessageModel = new InactivityMessageModel();
            this.waitConfirmationLogout();
            this.on('afterViewRender', function afterViewRender() {
                _.defer(function deferEvent() {
                    jQuery('#modal').on('hidden.bs.modal', function hideModal() {
                        if (!self.sessionMantained) {
                            self.logOut();
                        }
                    });
                });
            });
        },

        events: {
            'click [data-action="maintain-session"]': 'keepSessionAlive'
        },

        keepSessionAlive: function keepSessionAlive() {
            var profileModel = new ProfileModel();
            var self = this;
            profileModel.fetch().done(function onDone() {
                if (profileModel.get('isLoggedIn') !== 'T') {
                    self.sessionExpired = true;
                    self.render();
                    return;
                }
                self.inactivityMessageModel.fetch().done(function onFetchDone() {
                    self.sessionMantained = true;
                    jQuery('#modal').modal('toggle');
                    if (profileModel.get('isPendingTradeApproval')) {
                        new DialogService(self.application)
                            .openDialog('Pending Trade Approval - Session Timeout');
                    }
                });
            });
        },

        waitConfirmationLogout: function waitConfirmationLogout() {
            var self = this;
            window.clearTimeout(window.timeoutHandle);
            window.timeoutHandle = window.setTimeout(function fnTimeOut() {
                self.logOut();
            }, 30000);
        },

        logOut: function logOut() {
            var environmentComponent = this.application.getComponent('Environment');
            var logoutURL = environmentComponent.getSiteSetting('touchpoints.logout');

            window.location.href = logoutURL;
        },

        getContext: function getContext() {
            return {
                sessionExpired: this.sessionExpired,
                sessionMantained: this.sessionMantained
            };
        }
    });
});


define('InactivityMessage.Model', [
    'Backbone',
    'underscore'
], function InactivityMessageModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/InactivityMessage.Service.ss'))
    });
});


define('InactivityMessage.ProfileModel', [
    'Backbone',
    'underscore'
], function InactivityMessageProfileModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl('services/Profile.Service.ss')
    });
});


define('AwaLabs.Inactivity.Message', [
    'Session.Message',
    'underscore',
    'jQuery'
], function AwaLabsInactivityMessage(
    SessionMessage,
    _,
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            this.application = application;
            this.checkSession();
        },

        checkSession: function checkSession() {
            var userProfile = this.application.getComponent('UserProfile');
            var self = this;
            userProfile.getUserProfile().then(function afterGetUserProfile(user) {
                if (!user || !user.isloggedin) {
                    return;
                }
                self.setNewSessionTimeoutHandler();
                jQuery(document).ajaxSuccess(function onSuccess() {
                    self.setNewSessionTimeoutHandler();
                });
            });
        },

        addDefinitionsToModalView: function addDefinitionsToModalView() {
            var self = this;
            var layout = this.application.getComponent('Layout');

            layout.addToViewContextDefinition('GlobalViews.Modal.View', 'closeAction', 'string', function addCloseAction(context) {
                return context.modalDialogClass === 'session-timeout' ? 'log-out' : '';
            });

            layout.addToViewEventsDefinition('GlobalViews.Modal.View', 'click [data-action="log-out"]', function logOut() {
                var environmentComponent = self.application.getComponent('Environment');
                window.location.href = environmentComponent.getSiteSetting('touchpoints.logout');
            });
        },

        setNewSessionTimeoutHandler: function setNewSessionTimeoutHandler() {
            var self = this;
            window.clearTimeout(window.timeoutHandle);
            window.timeoutHandle = window.setTimeout(function fnTimeOut() {
                self.showModalDialog();
                self.addDefinitionsToModalView(); // add context properties to global view to trigger logout on dismiss modal button.
            }, 600000);
        },

        showModalDialog: function showModalDialog() {
            var view = new SessionMessage(this.application);
            var options = {
                modalOptions: {
                    backdrop: 'static',
                    keyboard: false
                }
            };

            this.application.getLayout().showInModal(view, options);
        }
    };
});


};

extensions['AwaLabs.InventoryDisplayFix.2.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/InventoryDisplayFix/2.0.1/' + asset;
}

define('AwaLabs.InventoryDisplayFix', [
    'SC.Configuration',
    'jQuery',
    'underscore'
], function AwaLabsInventoryDisplayFix(
    Configuration,
    jQuery,
    _
) {
    'use strict';

    /* eslint-disable global-require */
    var inventoryDisplayWebsiteModelModule;

    try {
        inventoryDisplayWebsiteModelModule = require('SuiteCommerce.InventoryDisplay.Website.Model');
        inventoryDisplayWebsiteModelModule.WebsiteModel.prototype.fetch = function fetch() {
            return jQuery.Deferred().resolve({
                dropShipSpecialOrderItemsAlwaysInStock: Configuration.get('inventoryDisplay.dropShipSpecialOrderItemsAlwaysInStock')
            });
        };
    } catch (error) {
        console.log('Error overriding the InventoryDisplay.Website.Model', error);
    }

    return {
        mountToApp: function mountToApp(container) {
            var promise;
            var websiteModel;
            var inventoryDisplayMessageView;
            var inventoryDisplayWebsiteModel;
            var inventoryDisplayMessageSpecialOrderItemView;
            var inventoryDisplayMessageDropShipItemView;
            var inventoryDisplayMessageRegularItemView;
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');
            var websiteId = environment.getSiteSetting('id');

            try {
                inventoryDisplayMessageView = require('SuiteCommerce.InventoryDisplay.Message.View');
                if (inventoryDisplayMessageView && inventoryDisplayMessageView.InventoryDisplayMessageView) {
                    _.extend(inventoryDisplayMessageView.InventoryDisplayMessageView.prototype, {
                        isEnabledMessagingForItem: function isEnabledMessagingForItem() {
                            return !this.item.custitem_ns_sc_ext_id_hide_invt_msg;
                        }
                    });
                }
            } catch (e) {
                console.log('Error in item AwaLabs.ItemOptions', e);
            }

            if (pdp) {
                try {
                    inventoryDisplayWebsiteModel = require('SuiteCommerce.InventoryDisplay.Website.Model');
                    inventoryDisplayMessageSpecialOrderItemView = require('SuiteCommerce.InventoryDisplay.Message.SpecialOrderItem.View');
                    inventoryDisplayMessageDropShipItemView = require('SuiteCommerce.InventoryDisplay.Message.DropShipItem.View');
                    inventoryDisplayMessageRegularItemView = require('SuiteCommerce.InventoryDisplay.Message.RegularItem.View');
                    websiteModel = new inventoryDisplayWebsiteModel.WebsiteModel();
                    promise = websiteModel.fetch({
                        data: {
                            websiteId: websiteId
                        }
                    });
                    pdp.addChildView('Product.Stock.Info', function ProductStockInfoChildView() {
                        var item = pdp.getItemInfo().item;
                        var view;
                        if (item.itemtype !== 'Kit') {
                            return;
                        }
                        if (item.isspecialorderitem) {
                            view = new inventoryDisplayMessageSpecialOrderItemView.SpecialOrderItemMessageView({
                                pdp: pdp,
                                model: websiteModel
                            });
                        } else if (item.isdropshipitem) {
                            view = new inventoryDisplayMessageDropShipItemView.DropShipItemMessageView({
                                pdp: pdp,
                                model: websiteModel
                            });
                        } else {
                            view = new inventoryDisplayMessageRegularItemView.ItemMessageView({
                                pdp: pdp,
                                model: websiteModel
                            });
                        }
                        promise.done(function promiseDone() {
                            view.loaded();
                        });
                        return view; // eslint-disable-line consistent-return
                    });
                } catch (e) {
                    console.log('ERROR in InventoryDisplayFix', e);
                }
            }
        }
    };
});


};

extensions['AwaLabs.ItemOptions.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/ItemOptions/2.0.0/' + asset;
}

define('ItemOptions.Utils', [
    'underscore'
], function ItemOptionsUtils(
    _
) {
    'use stritct';

    return {
        getAvailableOptions: function getAvailableOptions(options) {
            var availableOptions = [];
            _.each(options, function eachOptions(opt) {
                if (opt && opt.values && opt.values.length > 0) {
                    availableOptions.push(opt);
                }
            });
            return availableOptions;
        },
        getSelectedOptions: function getSelectedOptions(options) {
            var selectedOptions = [];
            _.each(options, function eachOptions(option) {
                if (option && option.value) {
                    selectedOptions.push(option.value);
                }
            });
            return selectedOptions;
        },
        getPreferedOptions: function getPreferedOptions(item) {
            var preferedOptions = [];
            if (item && item.custitem_sc_prefered_options) {
                preferedOptions = item.custitem_sc_prefered_options.split('_');
            }
            return preferedOptions;
        }
    };
});


define('AwaLabs.ItemOptions', [
    'ItemOptions.Utils',
    'Utils',
    'underscore',
    'Profile.Model'
], function AwaLabsItemOptions(
    ItemOptionsUtils,
    Utils,
    _,
    ProfileModel
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var pdp = application.getComponent('PDP');
            var profile = ProfileModel.getInstance();
            var environmentComponent = application.getComponent('Environment');
            if (pdp) {
                pdp.addToViewContextDefinition('ProductLine.Stock.View', 'isNotTrade', 'boolean', function fn() {
                    return !profile.get('isTrade');
                });
                pdp.on('beforeShowContent', function beforeShowContent() {
                    var iteminfo = pdp.getItemInfo();
                    var availableOptions;
                    var valueCount;
                    var firstValue;
                    var selectedOptions;
                    var preferedOptions;
                    var itemOptionsMobileTemplates = environmentComponent.getConfig('ItemOptions.mobileTemplates') || [];
                    var optionsConfig = environmentComponent.getConfig('ItemOptions.optionsConfiguration', []);
                    var mobileTemplate;

                    if (iteminfo && iteminfo.options) {
                        selectedOptions = ItemOptionsUtils.getSelectedOptions(iteminfo.options);
                        if (selectedOptions.length === 0) {
                            availableOptions = ItemOptionsUtils.getAvailableOptions(iteminfo.options);
                            preferedOptions = ItemOptionsUtils.getPreferedOptions(iteminfo.item);
                            if (preferedOptions && preferedOptions.length > 0) {
                                _.each(preferedOptions, function eachPreferedOptions(prefOpt) {
                                    _.each(availableOptions, function eachAvailableOptions(opt) {
                                        var options = _.findWhere(opt.values, { label: prefOpt });
                                        if (options && options.internalid) {
                                            pdp.setOption(opt.cartOptionId, options.internalid);
                                        }
                                    });
                                });
                            } else if (availableOptions && availableOptions.length > 0) {
                                _.each(availableOptions, function eachAvailableOptions(opt) {
                                    valueCount = opt.values[0].internalid ? 1 : 2;
                                    if (opt.values.length === valueCount) {
                                        firstValue = opt.values[valueCount - 1];
                                        pdp.setOption(opt.cartOptionId, firstValue.internalid);
                                    }
                                });
                            }
                        }
                    }
                    if (iteminfo && iteminfo.options) {
                        if (optionsConfig && optionsConfig.length > 0 && itemOptionsMobileTemplates &&
                            itemOptionsMobileTemplates.length > 0 && Utils.isPhoneDevice()) {
                            _.each(itemOptionsMobileTemplates, function each(optConfig) {
                                var option = _.findWhere(optionsConfig, { cartOptionId: optConfig.cartOptionId });
                                if (option && option.cartOptionId && optConfig.template) {
                                    mobileTemplate = require(optConfig.template); // eslint-disable-line global-require
                                    option.templates = {
                                        selector: mobileTemplate,
                                        selected: mobileTemplate
                                    };
                                }
                            });
                        }
                    }
                });
            }
        }
    };
});


};

extensions['AwaLabs.ItemSearchAutoAdd.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/ItemSearchAutoAdd/2.1.0/' + asset;
}

define('ItemSearchAutoAdd.ItemSearcher.View', [
    'ItemsSearcher.View',
    'ItemsSearcher.Utils',
    'Tracker',
    'jQuery',
    'underscore'
], function ItemSearchAutoAddItemSearcherView(
    ItemsSearcherView,
    ItemsSearcherUtils,
    Tracker,
    jQuery,
    _
) {
    'use strict';

    _.extend(ItemsSearcherView.prototype, {
        loadSuggestionItemsSource: function loadSuggestionItemsSource(query, callback, callbackAsync) {
            var self = this;

            Tracker.getInstance().trackSearch(query);

            self.options.ajaxDone = false;
            self.options.results = {};
            self.options.query = ItemsSearcherUtils.formatKeywords(query);
            this.collection = new this.options.collection([], this.options.collectionOptions);
            if (self.options.query.length >= self.options.minLength) {
                self.options.labels = ['see-all-' + self.options.query];
                callback(self.options.labels);
            }
            self.collection.fetch(
                {
                    data: {
                        q: jQuery.trim(self.options.query),
                        sort: self.options.sort,
                        limit: self.options.limit,
                        offset: 0
                    },
                    killerId: _.uniqueId('ajax_killer_')
                }, {
                    silent: true
                }).done(function onDone() {
                    var triggerSingle = 0;
                    var itemid = '';
                    var name = '';

                    self.collection =
                        self.postItemsSuggestionObtained.executeAll(self.collection, self.options) ||
                        self.collection;

                    self.options.ajaxDone = true;
                    self.options.labels = self.options.showSeeAll
                        ? ['see-all-' + self.options.query].concat(self.getItemIds(self.collection))
                        : self.getItemIds(self.collection);

                    if (self.options.labels.length) {
                        triggerSingle = self.options.labels.length;
                    } else {
                        self.options.labels = ['see-all-' + self.options.query];
                    }

                    callbackAsync(self.options.labels);
                    self.selectFirstIfRequire();

                    if (triggerSingle === 1) {
                        _.each(self.collection.models, function fnEach(model) {
                            var childItem = model.getSelectedMatrixChilds();
                            var selectedItem = childItem && childItem.length === 1 ? childItem[0] : model.get('item');

                            itemid = selectedItem ? selectedItem.get('itemid') : '';
                            name = selectedItem ? selectedItem.get('storedisplayname2') : '';
                        });
                        if (String(itemid) === String(self.options.query)
                            || name.toLocaleLowerCase() === self.options.query.toLocaleLowerCase()) {
                            self.onItemSelectedAutoAdd(self.options.labels[0]);
                        }
                    }
                }
            );
        },

        onItemSelectedAutoAdd: function onItemSelectedAutoAdd(itemId) {
            this.options.selectedItem = this.collection.get(itemId);
            this.trigger('itemSelectedAutoAdd', {
                selectedItem: this.collection.get(itemId),
                collection: this.collection.models,
                currentQuery: this.options.query
            });
        },

        setFocus: function setFocus() {
            var self = this;

            if (!SC.isPageGenerator()) {
                setTimeout(function setFocusOnTimeout() {
                    self.$('[data-type="search-input"]').focus();
                });
            }
        }
    });
});


define('ItemSearchAutoAdd.QuickAdd.View', [
    'QuickAdd.View',
    'underscore'
], function ItemSearchAutoAddQuickAddView(
    QuickAddView,
    _
) {
    'use strict';

    _.extend(QuickAddView.prototype, {
        initialize: _.wrap(QuickAddView.prototype.initialize, function fnInitialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.itemsSearcherComponent.on('itemSelectedAutoAdd', this.onItemSelectedAutoAdd, this);
        }),

        onItemSelectedAutoAdd: function onItemSelectedAutoAdd(result) {
            var item = result.selectedItem;
            var selectedValue;
            var possibleOptions;
            var options;
            var minimumQuantity;
            var selectedItem = item && item.getSelectedMatrixChilds();

            if (selectedItem && selectedItem.length === 1) {
                possibleOptions = item.getVisibleOptions();
                options = item.get('options');
                item.set('item', selectedItem[0]);
                item.set('options', options);
                _.each(possibleOptions, function eachOption(option) {
                    if (option.get('isMatrixDimension') && option.get('itemOptionId')) {
                        selectedValue = option.get('values') && _.findWhere(option.get('values'), {
                            label: selectedItem[0].get(option.get('itemOptionId'))
                        });
                        if (selectedValue && selectedValue.internalid) {
                            item.setOption(option.get('cartOptionId'), selectedValue.internalid);
                        }
                    }
                });
            }

            if (item && item.get('item')) {
                this.model.set('quickaddSearch', item.get('item').get('_name'));
                this.model.set('selectedProduct', item);
                this.setDefaultQuantity(
                    item.get('item').get('_minimumQuantity', true),
                    item.get('item').get('internalid')
                );
                this.$('[name="quantity"]').focus();
                this.selectAll();

                minimumQuantity = this.model.get('selectedProduct').get('_minimumQuantity', true);
                if (minimumQuantity > 1) {
                    this.$('.quick-add-box-minimum').html(
                        _('Minimum of $(0) required').translate(minimumQuantity)
                    );
                }

                this.$('[data-validation-error="block"]').remove();
                this.$('[data-type="search-input"]').val(item.get('item').get('_sku'));
                this.$el.find('form').submit();
            } else {
                this.model.unset('selectedProduct');
                this.$('.quick-add-box-minimum').empty();
            }
        }
    });
});


define('ItemSearchAutoAdd.Product.Model', [
    'Product.Model',
    'Product.Option.Collection',
    'underscore'
], function ItemSearchAutoAddProductModel(
    ProductModel,
    ProductOptionCollection,
    _
) {
    'use strict';

    _.extend(ProductModel.prototype, {
        setOptionsValidation: function setOptionsValidation() {
            var self = this;

            self.get('options').each(function fnEach(option) {
                self.validation[option.get('cartOptionId')] = {
                    fn: function optionValidationFunction(_value, cartOptionId, computedState) {
                        var validation;
                        var selectedOption;
                        var options = computedState && computedState.options && computedState.options.models
                             ? computedState.options
                             : new ProductOptionCollection(computedState.options || []);

                        selectedOption = options.findWhere({
                            cartOptionId: cartOptionId
                        });
                        validation = options && options.models && selectedOption.validate();

                        return validation && validation['value.internalid'];
                    }
                };
            });
        }
    });
});


define('AwaLabs.ItemSearchAutoAdd', [
    'ItemSearchAutoAdd.ItemSearcher.View',
    'ItemSearchAutoAdd.QuickAdd.View',
    'ItemSearchAutoAdd.Product.Model'
], function ItemSearchAutoAddQuickAddView() {});


};

extensions['AwaLabs.Jewelry.2.1.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Jewelry/2.1.1/' + asset;
}

define('Jewelry.Utils', [

], function JewelryItemKeyMapping(

) {
    'use strict';

    return {
        isJewelry: function isJewelry(item, environmentComponent) {
            var jewelryConfig = environmentComponent.getConfig('jewelry');
            var productCategory = item[jewelryConfig.productTypeFieldId];

            return productCategory && productCategory === jewelryConfig.productTypeFieldValue;
        },

        getJewelrySummary: function getJewelrySummary(summary) {
            var summaryJewelry = summary && summary.jewelry;

            if (summaryJewelry) {
                summaryJewelry.singleItem = summaryJewelry.jewelry_count && summaryJewelry.jewelry_count <= 1;
            }
            return summaryJewelry;
        },

        getNewItemCount: function getNewItemCount(itemCount, summary) {
            var summaryJewelry = summary && summary.jewelry;

            return itemCount - (summaryJewelry && summaryJewelry.jewelry_count ? summaryJewelry.jewelry_count : 0);
        },

        cartContextDefinitions: function cartContextDefinitions(cart) {
            var self = this;
            
            cart.addToViewContextDefinition('Cart.Summary.View', 'jewelry', 'object', function jewelry(context) {
                return self.getJewelrySummary(context.summary);
            });

            cart.addToViewContextDefinition('Cart.Summary.View', 'itemCount', 'number', function itemCount(context) {
                return self.getNewItemCount(context.itemCount, context.summary);
            });
        },

        layoutContextDefinitions: function layoutContextDefinitions(layout, environment) {
            var self = this;

            layout.addToViewContextDefinition('Header.MiniCart.View', 'jewelry', 'object', function jewelry(context) {
                return self.getJewelrySummary(context.model.summary);
            });

            layout.addToViewContextDefinition('Header.MiniCart.View', 'radItems', 'number', function itemsInCart(context) {
                return self.getNewItemCount(context.itemsInCart, context.model.summary);
            });

            layout.addToViewContextDefinition('Header.MiniCart.View', 'showPluraLabel', 'number', function showPluraLabel(context) {
                var radItems = self.getNewItemCount(context.itemsInCart, context.model.summary);
                return radItems === 0 || radItems > 1;
            });

            layout.addToViewContextDefinition('ProductLine.Stock.View', 'isJewelry', 'boolean', function isJewelry(context) {
                return self.isJewelry(context.model.item || context.model, environment);
            });

            layout.addToViewContextDefinition('ProductLine.Stock.View', 'shippingWarning', 'string', function shippingWarning() {
                return environment.getConfig('jewelry.shippingWarning');
            });
        }
    };
});


define('OrderWizard.Module.Confirmation.Jewelry', [
    'OrderWizard.Module.Confirmation',
    'Backbone',
    'Tracker',
    'underscore'
], function OrderWizardModuleConfirmationJewelry(
    OrderWizardModuleConfirmation,
    Backbone,
    Tracker,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleConfirmation.prototype, {
        trackTransaction: function trackTransaction(confirmation) {
            var summary = confirmation.get('summary');
            var lines = confirmation.get('lines').filter(function eachLine(line) {
                return line.get('rate') > 0;
            });
            var transaction = {
                confirmationNumber: confirmation.get('tranid'),
                subTotal: summary && (summary.totalSubtotal || summary.subtotal),
                total: summary && summary.total,
                taxTotal: summary && summary.taxtotal,
                shippingCost: summary && summary.shippingcost,
                handlingCost: summary && summary.handlingcost,
                products: new Backbone.Collection(),
                promocodes: confirmation.get('promocodes')
            };
            var transactionModel = new Backbone.Model(transaction);

            _(lines).each(function eachLine(line) {
                var options = [];

                line.get('options').each(function eachOption(option) {
                    if (option.get('value').label) {
                        options.push(option.get('value').label);
                    }
                });

                transactionModel.get('products').add(
                    new Backbone.Model({
                        name: line.get('item').get('_name'),
                        id: line.get('item').get('itemid'),
                        rate: line.get('rate'),
                        category: '/' + line.get('item').get('urlcomponent'),
                        options: options.sort().join(', '),
                        quantity: line.get('quantity')
                    })
                );
            });

            Tracker.getInstance().trackTransaction(transactionModel);
        }
    });
});


define('AwaLabs.Jewelry', [
    'Header.MiniCart.View',
    'Backbone.View',
    'Jewelry.Utils'
], function AwaLabsJewelry(
    HeaderMiniCartView,
    BackboneView,
    JewelryUtils
) {
    'use strict';

    HeaderMiniCartView.addExtraContextProperty = BackboneView.addExtraContextProperty;

    return {
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');

            if (cart) {
                JewelryUtils.cartContextDefinitions(cart);
            }

            if (layout) {
                JewelryUtils.layoutContextDefinitions(layout, environment);
            }

            if (pdp) {
                ['ProductDetails.Full.View', 'ProductDetails.QuickView.View'].forEach(function eachView(viewId) {
                    pdp.addToViewContextDefinition(viewId, 'isJewelry', 'boolean', function isJewelry(context) {
                        return JewelryUtils.isJewelry(context.model.item, environment);
                    });

                    pdp.addToViewContextDefinition(viewId, 'shippingWarning', 'string', function shippingWarning() {
                        return environment.getConfig('jewelry.shippingWarning');
                    });
                });
            }
        }
    };
});


};

extensions['Tavano.Klaviyo.3.0.7'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/Tavano/Klaviyo/3.0.7/' + asset;
}


define('Tavano.Klaviyo.Cart.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

    var isCartUpdateInProgress = false;

	var KlaviyoCartSync = {

		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},

		addCustomFields : function(line,parentItem,environment_component,klaviyoObject,isMatrixChild){

			
			try{
				var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];
				

				_.each(customFields,function(customField){
					
					if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){
	
						klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]
	
					}else{

						if (customField && customField.nsid == "displayname"){
							klaviyoObject[customField.klaviyokey] = line.item.displayname
						}else{
							klaviyoObject[customField.klaviyokey] = line.item.extras[customField.nsid]
						}
						
					}
					
				})
			}catch(e){
				console.log("Impossible to add custom fields");
				console.log(JSON.stringify(e))
			}
        },


        sendAddLineEvent:  function(cart,environment_component){

			var self = this;



			setTimeout(function(){
				
				isCartUpdateInProgress = false
			 }, 3000);

			 
			 if (!isCartUpdateInProgress){
				isCartUpdateInProgress = true;

				cart.getLines().then(function(lines) {


					var klaviyoObject = {};


					var session = environment_component.getSession()

					// ---------------------------
					// SiteID and Domain
					// ---------------------------
					var siteId = environment_component.getConfig("siteSettings.siteid");
					var domain = location.protocol + "//" + location.host;
					
					klaviyoObject["site_id"] = siteId;
					klaviyoObject["domain"] = domain;
                
					// ---------------------------
					// Currency
					// ---------------------------
					var currency_code = session.currency.code;
					var currency_name = session.currency.currencyname
					var currency_symbol = session.currency.symbol
					

					klaviyoObject["currency_code"] = currency_code;
					klaviyoObject["currency_name"] = currency_name;
					klaviyoObject["currency_symbol"] = currency_symbol;
					
					// ---------------------------
					// Language
					// ---------------------------
					var language_name = session.language.name;
					klaviyoObject["language_name"] = language_name;

					

					var Items = [];
				
					_.each(lines,function(line,lineIndex){

						var dataLine = {
							"ProductID" : line.item.internalid,
							"SKU": line.item.extras.keyMapping_sku,
							"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
							"Quantity":line.quantity,
							"ItemPrice":line.rate,
							"RowTotal":line.amount,
							"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
							"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
						}
						
						
						var matrixParent = line.item.extras.matrix_parent;

						self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)
						Items.push(dataLine)


						// Handle Images
						
						if (matrixParent){

							var allImages = self.getParentImages(matrixParent.itemimages_detail);

							var matrixOptionValues = [];
							_.each(line.options,function(option){
								if (option && option.isMatrixDimension && option.value)
									matrixOptionValues.push(option.value.label)
							})

							
							
							var mainImage
							// Now we only have to pick the Image from the entire list of images
							for (var i=0 ; i< allImages.length; i++){
								var allCheck = true;
								for (var j = 0; j < matrixOptionValues.length; j++){
									if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
										
										
									}else{
										allCheck = false;
									}
								}

								if (allCheck){
									mainImage = allImages[i]
								}


							}
							
		
							if (mainImage){
								Items[lineIndex]["ImageURL"] = mainImage
							}else{
								// If we didn't found the image, we assign the first that we can
								if (allImages && allImages.length > 0)
									Items[lineIndex]["ImageURL"] = allImages[0];
		
							}
						}

						// End Handle Images

					})
	
					

					var ItemNames = _.map(Items,function(item){
						return item["ProductName"]
					})
	
					
					// Add new Line row
					// Not necessary
					// if (lines && lines.length > 0){
					// 	klaviyoObject["AddedItemProductName"] = lines[0].item.extras.keyMapping_name;
					// 	klaviyoObject["AddedItemProductID"] = lines[0].item.itemid;
					// 	klaviyoObject["AddedItemSKU"] = lines[0].item.extras.keyMapping_sku;
					// 	klaviyoObject["AddedItemImageURL"] = lines[0].item.extras.keyMapping_images.length > 0 ?lines[0].item.extras.keyMapping_images[0].url:"";
					// 	klaviyoObject["AddedItemURL"] = lines[0].item.extras.keyMapping_url;
					// 	klaviyoObject["AddedItemPrice"] = lines[0].rate;
					// 	klaviyoObject["AddedItemQuantity"] = lines[0].quantity;
					// }
	
					klaviyoObject["ItemNames"] = ItemNames;
					klaviyoObject["Items"] = Items;
	
	
					cart.getSummary().then(function(summary) {
	
						
	
						klaviyoObject["$value"] = summary.subtotal;
	
	
	
						var addedToCartEventData = {
							'event':'klaviyoAddedToCart',
							'klaviyo_data': klaviyoObject
						};
						window["dataLayer"].push(addedToCartEventData);
	
					});

				});



			 }
			 
			 
		},

        sendUpdateLineEvent:  function(cart,environment_component){

			var self = this;
		

			setTimeout(function(){
				
				isCartUpdateInProgress = false
			 }, 3000);


			 
			 if (!isCartUpdateInProgress){
				isCartUpdateInProgress = true;

				cart.getLines().then(function(lines) {

					var klaviyoObject = {};

					var session = environment_component.getSession()

					// SiteID and Domain
					// ---------------------------
					var siteId = environment_component.getConfig("siteSettings.siteid");
					var domain = location.protocol + "//" + location.host;
					
					klaviyoObject["site_id"] = siteId;
					klaviyoObject["domain"] = domain;
                
					// ---------------------------
					// Currency
					// ---------------------------
					var currency_code = session.currency.code;
					var currency_name = session.currency.currencyname
					var currency_symbol = session.currency.symbol
					

					klaviyoObject["currency_code"] = currency_code;
					klaviyoObject["currency_name"] = currency_name;
					klaviyoObject["currency_symbol"] = currency_symbol;
					
					// ---------------------------
					// Language
					// ---------------------------
					var language_name = session.language.name;
					klaviyoObject["language_name"] = language_name;



					var Items = [];

					
					
					_.each(lines,function(line,lineIndex){

						var dataLine = {
							"ProductID" : line.item.internalid,
							"SKU": line.item.extras.keyMapping_sku,
							"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
							"Quantity":line.quantity,
							"ItemPrice":line.rate,
							"RowTotal":line.amount,
							"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
							"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
						}
						
						var matrixParent = line.item.extras.matrix_parent;


						self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)
						Items.push(dataLine);


						// Handle Images
						
						if (matrixParent){

							var allImages = self.getParentImages(matrixParent.itemimages_detail)

							var matrixOptionValues = [];
							_.each(line.options,function(option){
								if (option && option.isMatrixDimension && option.value)
									matrixOptionValues.push(option.value.label)
							})

							
							
							var mainImage
							// Now we only have to pick the Image from the entire list of images
							for (var i=0 ; i< allImages.length; i++){
								var allCheck = true;
								for (var j = 0; j < matrixOptionValues.length; j++){
									if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
										
										
									}else{
										allCheck = false;
									}
								}

								if (allCheck){
									mainImage = allImages[i]
								}


							}
							
		
							if (mainImage){
								Items[lineIndex]["ImageURL"] = mainImage
							}else{
								// If we didn't found the image, we assign the first that we can
								if (allImages && allImages.length > 0)
									Items[lineIndex]["ImageURL"] = allImages[0];
		
							}
						}

						// End Handle Images

					})
				
					var ItemNames = _.map(Items,function(item){
						return item["ProductName"]
					})
	
					klaviyoObject["ItemNames"] = ItemNames;
					klaviyoObject["Items"] = Items;



					
					
	
	
					cart.getSummary().then(function(summary) {
	
						klaviyoObject["$value"] = summary.subtotal;
	

						var addedToCartEventData = {
							'event':'klaviyoAddedToCart',
							'klaviyo_data': klaviyoObject
						};
						window["dataLayer"].push(addedToCartEventData);
	
					});

				});



			 }
			 
			 
		},



    }

	return KlaviyoCartSync;
});



define('Tavano.Klaviyo.ProductView.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProductViewSync = {


        addPossiblePriceLevels: function(line,session,klaviyoObject){

            for (var i=1; i < 50; i++ ){

                var priceLevel = line.item["pricelevel" + i];
                var priceLevelFormatted = line.item["pricelevel" + i + "_formatted"];

                if (priceLevel && priceLevelFormatted){
                    klaviyoObject["pricelevel" + i] = priceLevel;
                    klaviyoObject["pricelevel" + i + "_formatted"] = priceLevelFormatted;

                    // Adding the price level assigned to the customer in a new variable
                    // if ( i.toString() == session.priceLevel ){
                    //     klaviyoObject["PriceForCustomer"] = priceLevel;
                    //     klaviyoObject["PriceForCustomer_formatted"] = priceLevelFormatted;
                    // }
                }
                
            }
        },


        addCustomFields : function(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixChild){
            
            var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];

            _.each(customFields,function(customField){
                if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){

                    klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]

                }else{
                    klaviyoObject[customField.klaviyokey] = itemToSend[customField.nsid]
                }
                
            })

        },
        
        sendProductDetailsInfo : function(pdp,environment_component,klaviyoObject){
            
            var line = pdp.getItemInfo();

            if (!line)
                return
            var isMatrixItem = pdp.getAllMatrixChilds().length > 0;
            var isSelectionComplete = pdp.getSelectedMatrixChilds().length == 1;

            
            
            if (line){

                var categories ;
                var allImages = [];
                var itemToSend = line.item;
                var parentItem = line.item;
                var multiImageOptionValues = [];

                if (line.item.commercecategory && line.item.commercecategory.categories && line.item.commercecategory.categories.length > 0){
                    categories = _.map(line.item.commercecategory.categories,function(category){
                        return category.name
                    })
                }

                var allImages = _.map(line.item.keyMapping_images,function(image){
                    return image.url
                })

                // If the item is matrix, we use that info instead of the parent info
                if (isMatrixItem && isSelectionComplete){
                    itemToSend = pdp.getSelectedMatrixChilds()[0];
                }
                
                

                // storedisplayname || storedisplayname2 || displayname
                var klaviyoObject = {
                    "ProductName": itemToSend.displayname || itemToSend.storedisplayname || itemToSend.storedisplayname2 ,
                    "ProductID" : itemToSend.internalid,
                    "SKU": itemToSend.keyMapping_sku,
                    "ImageURL":itemToSend.keyMapping_images.length > 0 ?itemToSend.keyMapping_images[0].url:"",
                    "URL":location.href,
                    "Price":itemToSend.keyMapping_price,
                    // "CompareAtPrice": line.item.keyMapping_comparePriceAgainst
                    
                };

                this.addCustomFields(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixItem);

                // Sending always all the images available in custom attributes
                // IMG_1 to IMG_N
                _.each(allImages,function(image,i){
                    klaviyoObject["IMG_" + (i + 1).toString()] = image;
                    
                })

                // If it's a child Item, we have to modify the primary Image
                if (isMatrixItem && isSelectionComplete){
                    var multiImageOptions = environment_component.getConfig("tavanoKlaviyo").itemOptions;
                    
                    _.each(multiImageOptions,function(multiImageOption){
                        multiImageOptionValues.push(itemToSend[multiImageOption])
                    })
                    // Remove empty parameters
                    multiImageOptionValues = _.filter(multiImageOptionValues,function(value){return value});
                    var mainImage
                    // Now we only have to pick the Image from the entire list of images
                    
                    for (var i=0 ; i< allImages.length; i++){
                        var allCheck = true;
                        for (var j = 0; j < multiImageOptionValues.length; j++){
                            if (allImages[i] && allImages[i].toLowerCase().indexOf(multiImageOptionValues[j].toLowerCase())!= -1){
                                // mainImage = allImages[i];
                                
                            }else{
                                allCheck = false;
                            }
                        }

                        if (allCheck){
                            mainImage = allImages[i]
                        }
                    }

                    if (mainImage){
                        klaviyoObject["ImageURL"] = mainImage;
                    }else{
                        // If we didn't found the image, we assign the first that we can
                        if (allImages && allImages.length > 0)
                            klaviyoObject["ImageURL"] = allImages[0];

                    }
                }
                


                if (categories && categories.length > 0){
                    klaviyoObject["Categories"] = categories
                }
                

                var session = environment_component.getSession()

                // ---------------------------
                // SiteID and Domain
                // ---------------------------
                var siteId = environment_component.getConfig("siteSettings.siteid");
                var domain = location.protocol + "//" + location.host;

                klaviyoObject["site_id"] = siteId;
                klaviyoObject["domain"] = domain;
                
                // ---------------------------
                // Currency
                // ---------------------------
                var currency_code = session.currency.code;
                var currency_name = session.currency.currencyname
                var currency_symbol = session.currency.symbol
                

                klaviyoObject["currency_code"] = currency_code;
                klaviyoObject["currency_name"] = currency_name;
                klaviyoObject["currency_symbol"] = currency_symbol;
                
                // ---------------------------
                // Language
                // ---------------------------
                var language_name = session.language.name;
                klaviyoObject["language_name"] = language_name;

                // ---------------------------
                // Assigned Price Level ID
                // ---------------------------
                var price_levelInternalId = session.priceLevel;

                klaviyoObject["pricelevelID"] = price_levelInternalId;

                // ---------------------------
                // Add possible price level
                // ---------------------------
                this.addPossiblePriceLevels(line,session,klaviyoObject);
                


                var eventData = {
                    'event':'klaviyoProductViewed',
                    'klaviyo_data': klaviyoObject
                };

                window["dataLayer"].push(eventData);
            }
        },
        sendViewedItem : function(pdp,environment_component){
            var line = pdp.getItemInfo();
            var parentItem = line;
            
            if (!line)
                return

            var isMatrixItem = pdp.getAllMatrixChilds().length > 0;
            var isSelectionComplete = pdp.getSelectedMatrixChilds().length == 1;
            

            
            
            if (line){


                var categories ;
                var allImages = [];
                var itemToSend = line.item;
                var multiImageOptionValues = [];

                if (line.item.commercecategory && line.item.commercecategory.categories && line.item.commercecategory.categories.length > 0){
                    categories = _.map(line.item.commercecategory.categories,function(category){
                        return category.name
                    })
                }

                var allImages = _.map(line.item.keyMapping_images,function(image){
                    return image.url
                })


                // If the item is matrix, we use that info instead of the parent info
                if (isMatrixItem && isSelectionComplete){
                    itemToSend = pdp.getSelectedMatrixChilds()[0];
                }
                var klaviyoObject = {
                    "Title": itemToSend.itemid,
                    "ItemId": itemToSend.internalid,
                    "ImageURL":itemToSend.keyMapping_images.length > 0 ?itemToSend.keyMapping_images[0].url:"",
                    "Metadata": {
                        "Price": itemToSend.keyMapping_price,
                        // "CompareAtPrice": itemToSend.keyMapping_comparePriceAgainst
                    }
                };

                this.addCustomFields(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixItem);


                // Sending always all the images available in custome attributes
                // IMG_1 to IMG_N
                _.each(allImages,function(image,i){
                    klaviyoObject["IMG_" + (i + 1).toString()] = image;
                    
                })

                // If it's a child Item, we have to modify the primary Image
                if (isMatrixItem && isSelectionComplete){
                    var multiImageOptions = environment_component.getConfig("tavanoKlaviyo").itemOptions;
                    
                    
                    _.each(multiImageOptions,function(multiImageOption){
                        multiImageOptionValues.push(itemToSend[multiImageOption])
                    })
                    // Remove empty parameters
                    multiImageOptionValues = _.filter(multiImageOptionValues,function(value){return value});
                    var mainImage
                    // Now we only have to pick the Image from the entire list of images
                    for (var i=0 ; i< allImages.length; i++){
                        var allCheck = true;
                        for (var j = 0; j < multiImageOptionValues.length; j++){
                            if (allImages[i] && allImages[i].toLowerCase().indexOf(multiImageOptionValues[j].toLowerCase())!= -1){
                                // mainImage = allImages[i];
                                
                            }else{
                                allCheck = false;
                            }
                        }

                        if (allCheck){
                            mainImage = allImages[i]
                        }
                    }

                    if (mainImage){
                        klaviyoObject["ImageURL"] = mainImage;
                    }else{
                        // If we didn't found the image, we assign the first that we can
                        if (allImages && allImages.length > 0)
                            klaviyoObject["ImageURL"] = allImages[0];

                    }
                }

                if (categories && categories.length > 0){
                    klaviyoObject["Categories"] = categories
                }

                var session = environment_component.getSession()
                
                // ---------------------------
                // Currency
                // ---------------------------
                var currency_code = session.currency.code;
                var currency_name = session.currency.currencyname
                var currency_symbol = session.currency.symbol
                

                klaviyoObject["currency_code"] = currency_code;
                klaviyoObject["currency_name"] = currency_name;
                klaviyoObject["currency_symbol"] = currency_symbol;
                
                // ---------------------------
                // Language
                // ---------------------------
                var language_name = session.language.name;
                klaviyoObject["language_name"] = language_name;

                // ---------------------------
                // Assigned Price Level ID
                // ---------------------------

                var price_levelInternalId = session.priceLevel;
                klaviyoObject["pricelevelID"] = price_levelInternalId;
                

                // ---------------------------
                // Add possible price level
                // ---------------------------
                this.addPossiblePriceLevels(line,session,klaviyoObject);

                var eventData = {
                    'event':'klaviyoViewedItem',
                    'klaviyo_data': klaviyoObject
                };

                window["dataLayer"].push(eventData);
            }
        }
    }

	return TavanoKlaviyoProductViewSync;
});



define('Tavano.Klaviyo.LoaderSync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoLoaderSync = {
        
        addLoader : function(){
            
            
            var loadScriptEventData = {
                'event':'klaviyoLoadScript',
                'klaviyo_data': {}
            };
            !window.loaderCompleted && window["dataLayer"].push(loadScriptEventData);
            window.loaderCompleted = true;

            Backbone.trigger("KlaviyoLoaderCompleted")
            
        }
    }

	return TavanoKlaviyoLoaderSync;
});



define('Tavano.Klaviyo.Checkout.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoCheckoutSync = {




		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},
        
        sendCheckoutInfo: function(cart,environment_component){

			var self = this;

			var session = environment_component.getSession()
			

			var klaviyoObject = {};
			
			// ---------------------------
			// Currency
			// ---------------------------
			var currency_code = session.currency.code;
			var currency_name = session.currency.currencyname
			var currency_symbol = session.currency.symbol
			

			klaviyoObject["currency_code"] = currency_code;
			klaviyoObject["currency_name"] = currency_name;
			klaviyoObject["currency_symbol"] = currency_symbol;


			// ---------------------------
			// SiteID and Domain
			// ---------------------------
			var siteId = environment_component.getConfig("siteSettings.siteid");
			var domain = location.protocol + "//" + location.host;
			
			klaviyoObject["site_id"] = siteId;
			klaviyoObject["domain"] = domain;
			
			// ---------------------------
			// Language
			// ---------------------------
			var language_name = session.language.name;

			klaviyoObject["language_name"] = language_name;

			cart.getSummary().then(function(summary) {

				klaviyoObject["$event_id"] = Date.now().toString();
				klaviyoObject["$value"] = summary.total;
				klaviyoObject["items_subtotal"] = summary.subtotal;
				klaviyoObject["$CheckoutURL"] = location.href;
				
			});

			

			cart.getLines().then(function(lines) {


				var Items = [];
				
				_.each(lines,function(line,lineIndex){

					Items.push({
						"ProductID" : line.item.itemid,
						"SKU": line.item.extras.keyMapping_sku,
						"ProductName": line.item.itemid,
						"Quantity":line.quantity,
						"ItemPrice":line.rate,
						"RowTotal":line.amount,
						"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
						"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
					})


					// Handle Images

					var matrixParent = line.item.extras.matrix_parent;
					
					if (matrixParent){

						// In this case the all images are related to the child
						// var allImages = _.map(line.item.extras.keyMapping_images,function(image){
						// 	return image.url
						// })
						

						var allImages = self.getParentImages(matrixParent.itemimages_detail)

						var matrixOptionValues = [];
						_.each(line.options,function(option){
							if (option && option.isMatrixDimension && option.value)
								matrixOptionValues.push(option.value.label)
						})

						
						
						var mainImage
						// Now we only have to pick the Image from the entire list of images
						for (var i=0 ; i< allImages.length; i++){
							var allCheck = true;
							for (var j = 0; j < matrixOptionValues.length; j++){
								if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
									
									
								}else{
									allCheck = false;
								}
							}

							if (allCheck){
								mainImage = allImages[i]
							}


						}
						
	
						if (mainImage){
							Items[lineIndex]["ImageURL"] = mainImage
						}else{
							// If we didn't found the image, we assign the first that we can
							if (allImages && allImages.length > 0)
								Items[lineIndex]["ImageURL"] = allImages[0];
	
						}
					}

					// End Handle Images

				})

				var ItemNames = _.map(lines,function(line){
					return line.item.itemid
				})

				klaviyoObject["ItemNames"] = ItemNames;
				klaviyoObject["Items"] = Items;

				var eventData = {
					'event':'klaviyoStartedCheckout',
					'klaviyo_data': klaviyoObject
				};


				
				!window.checkoutStarted && window["dataLayer"].push(eventData);
				window.checkoutStarted = true;
				


			});

        }
       
    }

	return TavanoKlaviyoCheckoutSync;
});



define('Tavano.Klaviyo.Order.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoOrderSync = {
        
        sendOrderDetailsInfo : function(cart,userprofilecomponent){

            self.cart = cart;

            if (cart){

                cart.on("beforeSubmit",function(data){

                    // Pre-save the following information
                    // Shipping Address
                    // Billing Address
                    // Customer Information

                    userprofilecomponent.getUserProfile().then(function(profile) {
                        
                        var profile = {
                            "$email": profile.email,
                            "$first_name": profile.firstname,
                            "$last_name": profile.lastname,
                            "$phone_number": profile.phoneinfo ? profile.phoneinfo.phone : "",
                            "$address1": profile.addresses.length > 0 ? profile.addresses[0].addr1 : "",
                            "$address2": profile.addresses.length > 0 ? profile.addresses[0].addr2 : "",
                            "$city": profile.addresses.length > 0 ? profile.addresses[0].city : "",
                            "$zip": profile.addresses.length > 0 ? profile.addresses[0].zip : "",
                            "$region":profile.addresses.length > 0 ? profile.addresses[0].state : "",
                            "$country": profile.addresses.length > 0 ? profile.addresses[0].country : "",
                        }

                        sessionStorage.setItem('customer_properties', JSON.stringify(profile));    
                        
                    });


                    self.cart.getShipAddress().then(function(shippingAddress) {
                        sessionStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));    
                    })

                    self.cart.getBillAddress().then(function(billingAddress) {
                        sessionStorage.setItem('billingAddress', JSON.stringify(billingAddress));    
                    })



                    cart.getLines().then(function(lines) {

                        

                        var Items = _.map(lines,function(line){
                            return {
                                "ProductID" : line.item.itemid,
                                "SKU": line.item.extras.keyMapping_sku,
                                "ProductName": line.item.extras.keyMapping_name,
                                "Quantity":line.quantity,
                                "ItemPrice":line.rate,
                                "RowTotal":line.amount,
                                "ProductURL":line.item.extras.keyMapping_url,
                                "ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
                            }
                        })
        
                        var ItemNames = _.map(lines,function(line){
                            return line.item.extras.keyMapping_name
                        })

                        sessionStorage.setItem('ItemNames', JSON.stringify(ItemNames));    

                        sessionStorage.setItem('Items', JSON.stringify(Items));    



                        
                    })

                })
    
                cart.on("afterSubmit",function(data){

                    
                    
                    var klaviyoObject = {};


                    klaviyoObject["$value"] = data.confirmation.summary.total;
                    klaviyoObject["OrderId"] = data.confirmation.tranid;

                    if (data.promocodes && data.promocodes.length > 0){

                        klaviyoObject["DiscountCode"] = "";
                        klaviyoObject["DiscountValue"] = data.confirmation.summary.extras.discounttotal_formatted;
                    }

                    
        
                    // Adding Shipping and Billing Addresses

                    var billingAddress = JSON.parse(sessionStorage.getItem('billingAddress'));
                    var shippingAddress = JSON.parse(sessionStorage.getItem('shippingAddress'));
                    var customer_properties = JSON.parse(sessionStorage.getItem('customer_properties'));
                    var Items = JSON.parse(sessionStorage.getItem('Items'));
                    var ItemNames = JSON.parse(sessionStorage.getItem('ItemNames'));


                    klaviyoObject["ItemNames"] = ItemNames;
                    klaviyoObject["Items"] = Items;
                    

                    klaviyoObject["BillingAddress"] = {

                        "FirstName": billingAddress.fullname,
                        "LastName": billingAddress.fullname,
                        "Company": billingAddress.company,
                        "Address1": billingAddress.addr1,
                        "Address2": billingAddress.addr2,
                        "City": billingAddress.city,
                        "Region": billingAddress.state,
                        "RegionCode":billingAddress.state,
                        "Country": billingAddress.country,
                        "CountryCode": billingAddress.country,
                        "Zip": billingAddress.zip,
                        "Phone": billingAddress.phone,
                    };

                    klaviyoObject["ShippingAddress"] = {
                        
                        "FirstName": shippingAddress.fullname,
                        "LastName": shippingAddress.fullname,
                        "Company": shippingAddress.company,
                        "Address1": shippingAddress.addr1,
                        "Address2": shippingAddress.addr2,
                        "City": shippingAddress.city,
                        "Region": shippingAddress.state,
                        "RegionCode":shippingAddress.state,
                        "Country": shippingAddress.country,
                        "CountryCode": shippingAddress.country,
                        "Zip": shippingAddress.zip,
                        "Phone": shippingAddress.phone,
                    };



                    // Not necessary
                    // klaviyoObject["customer_properties"] = customer_properties;

                    var addedToCartEventData = {
                        'event':'klaviyoPlacedOrder',
                        'klaviyo_data': klaviyoObject
                    };
                    // window["dataLayer"].push(addedToCartEventData);


                })

            }
        }
    }

	return TavanoKlaviyoOrderSync;
});



define('Tavano.Klaviyo.Profile.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProfileSync = {
        
        addProfile : function(profile,environment_component){
            
            if ( profile && profile.isloggedin){


                var session = environment_component.getSession()

                var price_levelInternalId = session.priceLevel;

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname,
                        "pricelevelID" : price_levelInternalId
    
                    }
                };
                
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
        },
        addProfileFromService : function(profile){

            // If it's logged in
            if (profile && profile.email){

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname
                    }
                };
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
            
        }
    }

	return TavanoKlaviyoProfileSync;
});


define('Tavano.Klaviyo.AddOrderSource.Checkout'
, [
    'Tavano.Klaviyo.OrderSource.View'
  ]
,   function
  (
    TavanoKlaviyoOrderSourceView
  )
{
  'use strict';


  var TavanoKlaviyoAddOrderSource = {

    addOrderSourceModule : function(checkout,environment_component){

        // // ----------------------------------------
        // // Add source origin to environment
        // // We allow up to 5 sites
        // // ----------------------------------------


        // var siteSource = environment_component.getConfig('Klaviyo.websource');
        
        
        

        // if (siteSource && siteSource.length > 0) 
        //     siteSource = siteSource[0]

        // var siteSourceValue;

        // switch(siteSource) {
        //     case "Site A":
        //         siteSourceValue = "1";
        //       break;
        //       case "Site B":
        //         siteSourceValue = "2";
        //       break;
        //       case "Site C":
        //         siteSourceValue = "3";
        //       break;
        //       case "Site D":
        //         siteSourceValue = "4";
        //       break;
        //       case "Site E":
        //         siteSourceValue = "5";
        //       break;
        //     default:
        //         siteSourceValue = "1";
        //   }

        // window.siteSource = siteSourceValue;


        // try{

        //     checkout.addModuleToStep(
        //         {
        //             step_url: 'opc'
        //             , module: {
        //                 id: 'TavanoKlaviyoOrderSourceView'
        //                 , index: 6
        //                 , classname: 'Tavano.Klaviyo.OrderSource.View'
        //             }
        //         });
        
        //         checkout.addModuleToStep(
        //         {
        //             step_url: 'review'
        //             , module: {
        //                 id: 'Tavano.KlaviyoOrderSourceView'
        //                 , index: 99
        //                 , classname: 'Tavano.Klaviyo.OrderSource.View'
        //             }
        //         });

        // }catch(e){

        // }
    }
 }


  return TavanoKlaviyoAddOrderSource

});





define('Tavano.Klaviyo.Checkout.Sync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoCheckoutSync = {




		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},

		addCustomFields : function(line,parentItem,environment_component,klaviyoObject,isMatrixChild){

			
			try{
				var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];

				_.each(customFields,function(customField){
					if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){
	
						klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]
	
					}else{
						
						if (customField && customField.nsid == "displayname"){
							klaviyoObject[customField.klaviyokey] = line.item.displayname
						}else{
							klaviyoObject[customField.klaviyokey] = line.item.extras[customField.nsid]
						}

					}
					
				})
			}catch(e){
				console.log("Impossible to add custom fields");
				console.log(JSON.stringify(e))
			}
        },
        
        sendCheckoutInfo: function(cart,environment_component){

			var self = this;

			var session = environment_component.getSession()
			

			var klaviyoObject = {};
			
			// ---------------------------
			// Currency
			// ---------------------------
			var currency_code = session.currency.code;
			var currency_name = session.currency.currencyname
			var currency_symbol = session.currency.symbol
			

			klaviyoObject["currency_code"] = currency_code;
			klaviyoObject["currency_name"] = currency_name;
			klaviyoObject["currency_symbol"] = currency_symbol;


			// ---------------------------
			// SiteID and Domain
			// ---------------------------
			var siteId = environment_component.getConfig("siteSettings.siteid");
			var domain = location.protocol + "//" + location.host;
			
			klaviyoObject["site_id"] = siteId;
			klaviyoObject["domain"] = domain;
			
			// ---------------------------
			// Language
			// ---------------------------
			var language_name = session.language.name;

			klaviyoObject["language_name"] = language_name;

			cart.getSummary().then(function(summary) {

				klaviyoObject["$event_id"] = Date.now().toString();
				klaviyoObject["$value"] = summary.total;
				klaviyoObject["items_subtotal"] = summary.subtotal;
				klaviyoObject["$CheckoutURL"] = location.href;
				
			});

			

			cart.getLines().then(function(lines) {


				var Items = [];
				
				_.each(lines,function(line,lineIndex){

					var dataLine = {
						"ProductID" : line.item.internalid,
						"SKU": line.item.extras.keyMapping_sku,
						"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
						"Quantity":line.quantity,
						"ItemPrice":line.rate,
						"RowTotal":line.amount,
						"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
						"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
					}
					
					// Handle Images

					var matrixParent = line.item.extras.matrix_parent;
					
					self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)

					Items.push(dataLine)
					
					if (matrixParent){

						// In this case the all images are related to the child
						// var allImages = _.map(line.item.extras.keyMapping_images,function(image){
						// 	return image.url
						// })
						

						var allImages = self.getParentImages(matrixParent.itemimages_detail)

						var matrixOptionValues = [];
						_.each(line.options,function(option){
							if (option && option.isMatrixDimension && option.value)
								matrixOptionValues.push(option.value.label)
						})

						
						
						var mainImage
						// Now we only have to pick the Image from the entire list of images
						for (var i=0 ; i< allImages.length; i++){
							var allCheck = true;
							for (var j = 0; j < matrixOptionValues.length; j++){
								if (allImages[i].indexOf(matrixOptionValues[j])!= -1){
									
									
								}else{
									allCheck = false;
								}
							}

							if (allCheck){
								mainImage = allImages[i]
							}


						}
						
	
						if (mainImage){
							Items[lineIndex]["ImageURL"] = mainImage
						}else{
							// If we didn't found the image, we assign the first that we can
							if (allImages && allImages.length > 0)
								Items[lineIndex]["ImageURL"] = allImages[0];
	
						}
					}

					// End Handle Images

				})

				var ItemNames = _.map(Items,function(item){
					return item["ProductName"]
				})

				klaviyoObject["ItemNames"] = ItemNames;
				klaviyoObject["Items"] = Items;

				var eventData = {
					'event':'klaviyoStartedCheckout',
					'klaviyo_data': klaviyoObject
				};


				
				!window.checkoutStarted && window["dataLayer"].push(eventData);
				window.checkoutStarted = true;
				


			});

        }
       
    }

	return TavanoKlaviyoCheckoutSync;
});



define(
	'Tavano.Klaviyo.Klaviyo.Checkout'
,   [
		
		
		'Tavano.Klaviyo.LoaderSync.Checkout',
		'Tavano.Klaviyo.Checkout.Sync.Checkout',
		
		'Tavano.Klaviyo.Profile.Sync.Checkout',
		'Tavano.Klaviyo.AddOrderSource.Checkout',
		'Tavano.Klaviyo.Checkout.Profile.Model'
		
	]
,   function (
		
		TavanoKlaviyoLoaderSync,
		TavanoKlaviyoCheckoutSync,
		
		TavanoKlaviyoProfileSync,
		TavanoKlaviyoAddOrderSourceCheckout,
		TavanoKlaviyoCheckoutProfileModel
		
		
	)
{
	'use strict';



	return  {

		

	mountToApp: function mountToApp (container)
		{
			

			var userprofilecomponent = container.getComponent("UserProfile");
			var checkout = container.getComponent('Checkout');
			var cart = container.getComponent('Cart');
			var environment_component = container.getComponent("Environment");



			// ---------------------
			// Order Source
			// ---------------------
			
			TavanoKlaviyoAddOrderSourceCheckout.addOrderSourceModule(checkout,environment_component)



			// Manage Guest Checkout
			// Manage Login/Register
			checkout && checkout.on("afterShowContent", function() {


				if (userprofilecomponent){

					userprofilecomponent.getUserProfile().then(function(profile) {
					

						if (!window.isProfileLoaded && profile && profile.isloggedin){
							TavanoKlaviyoLoaderSync.addLoader()
						}
					});

				}else{

					// We might be in a version with no support for UserProfile Component
					var klaviyoProfileModel = new TavanoKlaviyoCheckoutProfileModel();
					klaviyoProfileModel.fetch().done(function(result){


						
						if (!window.isProfileLoaded && result && result.email){
							TavanoKlaviyoLoaderSync.addLoader()
						}
					})

				}

			})

			
			Backbone.on("KlaviyoLoaderCompleted",function(){

			

				setTimeout(function(){

					

					
					if (userprofilecomponent){

						// Add Profile
						userprofilecomponent.getUserProfile().then(function(profile) {
							
							TavanoKlaviyoProfileSync.addProfile(profile,environment_component);


							// ---------------------
							// Checkout Started
							// ---------------------
							
							
							if (checkout && profile && profile.isloggedin){

								setTimeout(function(){
									TavanoKlaviyoCheckoutSync.sendCheckoutInfo(cart,environment_component)
								}, 2000);
								
								
							}

						});

					}else{

						// We might be in a version with no support for UserProfile Component
						var klaviyoProfileModel = new TavanoKlaviyoCheckoutProfileModel();
						klaviyoProfileModel.fetch().done(function(result){


							TavanoKlaviyoProfileSync.addProfileFromService(result);


							// ---------------------
							// Checkout Started
							// ---------------------
							
							
							if (checkout && result && result.email){
								
								setTimeout(function(){
									TavanoKlaviyoCheckoutSync.sendCheckoutInfo(cart,environment_component)
								}, 2000);
								
							}


						})
					}

					
				}, 2000);

			})

			// ---------------------
			// Load Script
			// ---------------------
			
			TavanoKlaviyoLoaderSync.addLoader()

		}
	};
});



define('Tavano.Klaviyo.LoaderSync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoLoaderSync = {
        
        addLoader : function(){
            
            
            var loadScriptEventData = {
                'event':'klaviyoLoadScript',
                'klaviyo_data': {}
            };
            !window.loaderCompleted && window["dataLayer"].push(loadScriptEventData);
            window.loaderCompleted = true;

            Backbone.trigger("KlaviyoLoaderCompleted")
            
        }
    }

	return TavanoKlaviyoLoaderSync;
});


define('Tavano.Klaviyo.OrderSource.View'
, [
    'Wizard.Module'

  , 'tavano_klaviyo_klaviyoordersource.tpl'
  ]
, function (
    WizardModule

  , tavano_klaviyo_klaviyoordersource
  )
{
  'use strict';

  return WizardModule.extend({

    template: tavano_klaviyo_klaviyoordersource,

   
    

   getContext: function getContext()
    {
      try{
          
        // if (this && this.model){
        //   var wizardModule = this.model;
        //   var options = wizardModule.get('options');
          

        //   options.custbody_tt_klaviyo_order_source = window.siteSource;

        //   wizardModule.set('options',options);
        // }
          
      }catch(e){
          // console.log("Klaviyo Error trying to set order source: ");
          console.log(e);
      }
        
      return {};
    }
  });
});



define('Tavano.Klaviyo.Profile.Sync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProfileSync = {
        
        addProfile : function(profile,environment_component){
            
            if ( profile && profile.isloggedin){


                var session = environment_component.getSession()

                var price_levelInternalId = session.priceLevel;

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname,
                        "pricelevelID" : price_levelInternalId
    
                    }
                };
                
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
        },
        addProfileFromService : function(profile){

            // If it's logged in
            if (profile && profile.email){

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname
                    }
                };
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
            
        }
    }

	return TavanoKlaviyoProfileSync;
});


// @module Tavano.Klaviyo.Profile.Model
define(
	'Tavano.Klaviyo.Profile.Model'
,	[
		'Backbone'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Backbone
	,	_
	,	Utils
	)
{
  return Backbone.Model.extend({

    url: function url ()
    {
      // var url = _.getAbsoluteUrl(getExtensionAssetsPath('services/QuestionsAndAnswers.Service.ss'));
        var urlRoot = Utils.getAbsoluteUrl(
					getExtensionAssetsPath(
							"services/KlaviyoProfile.Service.ss"
					)
			)

      return urlRoot;
    }
  })


});


// @module Tavano.Klaviyo.Checkout.Profile.Model
define(
	'Tavano.Klaviyo.Checkout.Profile.Model'
,	[
		'Backbone'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Backbone
	,	_
	,	Utils
	)
{
  return Backbone.Model.extend({

    url: function url ()
    {
      // var url = _.getAbsoluteUrl(getExtensionAssetsPath('services/QuestionsAndAnswers.Service.ss'));
        var urlRoot = Utils.getAbsoluteUrl(
					getExtensionAssetsPath(
							"services/KlaviyoProfile.Service.ss"
					)
			)

      return urlRoot;
    }
  })


});


// Model.js
// -----------------------
// @module Case
define("Tavano.Klaviyo.KlaviyoProfile.Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({

        
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/KlaviyoProfile.Service.ss"
            )
        )
        
});
});



define(
	'Tavano.Klaviyo.Klaviyo'
,   [
		'Tavano.Klaviyo.Cart.Sync',
		'Tavano.Klaviyo.ProductView.Sync',
		'Tavano.Klaviyo.LoaderSync',
		'Tavano.Klaviyo.Order.Sync',
		'Tavano.Klaviyo.Profile.Sync',
		'Tavano.Klaviyo.Profile.Model'
	]
,   function (
		TavanoKlaviyoCartSync,
		TavanoKlaviyoProductViewSync,
		TavanoKlaviyoLoaderSync,
		TavanoKlaviyoOrderSync,
		TavanoKlaviyoProfileSync,
		TavanoKlaviyoProfileModel
		
	)
{
	'use strict';



	return  {

		

	mountToApp: function mountToApp (container)
		{

			var registerEvent = true;

			if (SC.isPageGenerator())
				return
			

			var userprofilecomponent = container.getComponent("UserProfile");
			
			var cart = container.getComponent('Cart');
			var pdp = container.getComponent('PDP');
			var layout = container.getComponent('Layout');
			
			
			var environment_component = container.getComponent("Environment");


			// ---------------------
			// Order Submission
			// ---------------------
			TavanoKlaviyoOrderSync.sendOrderDetailsInfo(cart,userprofilecomponent)


			// ---------------------
			// Add To Cart
			// ---------------------
			
			cart.on("afterAddLine",function(){
				TavanoKlaviyoCartSync.sendAddLineEvent(cart,environment_component)
			})


			// ---------------------
			// Update Line
			// ---------------------
			
			cart.on("afterUpdateLine",function(){
				TavanoKlaviyoCartSync.sendUpdateLineEvent(cart,environment_component)
			})

			// ---------------------
			// Remove Line
			// ---------------------
			
			cart.on("afterRemoveLine",function(){
				TavanoKlaviyoCartSync.sendUpdateLineEvent(cart,environment_component)
			})


			Backbone.on("KlaviyoLoaderCompleted",function(){

			

				setTimeout(function(){

					
					

					if (userprofilecomponent){
						// Add Profile
						userprofilecomponent.getUserProfile().then(function(profile) {
							TavanoKlaviyoProfileSync.addProfile(profile,environment_component);
						});
					}else{

						// We might be in a version with no support for UserProfile Component
						var klaviyoProfileModel = new TavanoKlaviyoProfileModel();
						klaviyoProfileModel.fetch().done(function(result){
							TavanoKlaviyoProfileSync.addProfileFromService(result);
						})

					}
					
				}, 2000);

				

				layout.on('afterShowContent', function() {
					if (pdp){
						TavanoKlaviyoProductViewSync.sendProductDetailsInfo(pdp,environment_component);
						TavanoKlaviyoProductViewSync.sendViewedItem(pdp,environment_component);
						if (pdp && registerEvent) {
							registerEvent = false;
							pdp.on('afterOptionSelection', _.debounce(function (event) {
								TavanoKlaviyoProductViewSync.sendProductDetailsInfo(pdp, environment_component);
								TavanoKlaviyoProductViewSync.sendViewedItem(pdp, environment_component);
								return true
							}), 200)
						}
					}
				});

			})

			// ---------------------
			// Load Script
			// ---------------------
			
			TavanoKlaviyoLoaderSync.addLoader()

		}
	};
});


};

extensions['AwaLabs.LayoutClass.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/LayoutClass/2.0.0/' + asset;
}

define("AwaLabs.LayoutClass", [
    'underscore'
], function AwaLabsLayoutClass(
    _
){
    'use strict';

    return {
        addClassToLayout: function addClassToLayout(Layout,view){
            Layout.$('#layout').removeClass().addClass(this.layoutClass).addClass('sec_'+view.template.Name);
        },
        mountToApp: function(application){
            var Layout = application.getLayout();
            var self = this;
            Layout.once('afterAppendView',function(view){
                self.layoutClass = Layout.$('#layout').attr('class');
                self.addClassToLayout(Layout,view);
                Layout.on('afterAppendView',function(view){
                    if(!view.inModal){
                        self.addClassToLayout(Layout,view);
                    }
                });
            });
        }
    }
});


};

extensions['AwaLabs.OrderStatusImprovements.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/OrderStatusImprovements/2.0.0/' + asset;
}

define('AwaLabs.OrderStatusImprovements', [
    'Utils',
    'underscore'
], function AwaLabsOrderStatusImprovements(
    Utils,
    _
) {
    'use strict';

    var orderFinderModel;
    var orderFinderModelOriginalUrl;
    var OrderStatusImprovementsConfig;
    var imageNotAvailableConfig;
    var multiImageOptionConfig;

    try {
        orderFinderModel = require('SuiteCommerce.OrderStatus.OrderFinder.Order.Model'); // eslint-disable-line global-require
    } catch (e) {
        console.log(e); // eslint-disable-line no-console
    }

    if (orderFinderModel && _.isFunction(orderFinderModel)) {
        orderFinderModelOriginalUrl = orderFinderModel.prototype.urlRoot;
        _.extend(orderFinderModel.prototype, {
            urlRoot: function urlRoot() {
                var modelURL = orderFinderModelOriginalUrl;
                if (OrderStatusImprovementsConfig && OrderStatusImprovementsConfig.enable) {
                    modelURL = Utils.getAbsoluteUrl(getExtensionAssetsPath('services/OrderStatusImprovements.Service.ss'));
                }
                return modelURL;
            },
            parse: function parse(response) {
                var self = this;
                var itemDetails = response.details && response.details.itemDetails;

                if (OrderStatusImprovementsConfig && OrderStatusImprovementsConfig.enable) {
                    _.each(itemDetails, function each(details) {
                        details.thumbnail = (details.item) ? self.getThumbnail(details.item) : {
                            url: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/no_image_available.jpeg',
                                imageNotAvailableConfig
                            ),
                            altimagetext: details.name
                        };
                    });
                }

                return response;
            },
            filterImages: function filterImages(itemImagesDetail, imageOptionFilters, itemOptions, selectedOption) {
                var imagesContainer = itemImagesDetail;
                var selectedOptionFilter;
                var labelOption;
                var label;

                _.each(imageOptionFilters, function each(imageFilter) {
                    selectedOptionFilter = _.findWhere(itemOptions.fields, {
                        internalid: imageFilter
                    });

                    if (selectedOptionFilter && selectedOptionFilter.values) {
                        if (selectedOption && selectedOption[selectedOptionFilter.sourcefrom]) {
                            labelOption = _.find(selectedOptionFilter.values, function find(option) {
                                return option.label && option.label.toLowerCase() === selectedOption[selectedOptionFilter.sourcefrom].toLowerCase();
                            });
                            label = labelOption && labelOption.label;

                            _.each(imagesContainer, function eachImageContainer(value, key) {
                                if (key.toLowerCase() === label) {
                                    imagesContainer = value;
                                }
                            });
                        }
                    }
                });

                return imagesContainer;
            },
            getFirstImage: function getFirstImage(flattenedImages) {
                var i;
                var detail;
                var splitted;
                for (i = 0; i < flattenedImages.length; i++) {
                    detail = flattenedImages[i];
                    splitted = detail.url.split('.');
                    if (splitted[splitted.length - 2] === 'default') {
                        return detail;
                    }
                }
                return flattenedImages[0];
            },
            getThumbnail: function getThumbnail(itemData) {
                var item = (itemData.matrix_parent) ? itemData.matrix_parent : itemData;
                var itemImagesDetail = item.itemimages_detail || {};
                var imageFilters = multiImageOptionConfig;
                var images = [];
                var imagesContainer = {};
                var selectedOption = _.find(item.matrixchilditems_detail, function find(option) {
                    return option.internalid === itemData.internalid;
                });

                if (itemImagesDetail.thumbnail) {
                    imagesContainer = this.filterImages(itemImagesDetail.thumbnail, imageFilters, item.itemoptions_detail, selectedOption);
                    images = Utils.imageFlatten(imagesContainer);
                    return this.getFirstImage(images) || itemImagesDetail.thumbnail;
                }

                itemImagesDetail = itemImagesDetail.media || itemImagesDetail;
                imagesContainer = this.filterImages(itemImagesDetail, imageFilters, item.itemoptions_detail, selectedOption);
                images = Utils.imageFlatten(imagesContainer);

                return images.length ? this.getFirstImage(images) : {
                    url: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                        'img/no_image_available.jpeg',
                        imageNotAvailableConfig
                    ),
                    altimagetext: item.displayname
                };
            }
        });
    }

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            OrderStatusImprovementsConfig = environment.getConfig('OrderStatusImprovements');
            imageNotAvailableConfig = environment.getConfig('imageNotAvailable');
            multiImageOptionConfig = environment.getConfig('productline.multiImageOption') || [];
        }
    };
});


};

extensions['AwaLabs.OrderStatusImprovementsHandlebarsExtras.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/OrderStatusImprovementsHandlebarsExtras/2.0.0/' + asset;
}

define('AwaLabs.OrderStatusImprovementsHandlebarsExtras', [
    'Utils',
    'Handlebars'
], function AwaLabsOrderStatusImprovementsHandlebarsExtras(
    Utils,
    Handlebars
) {
    'use strict';

    Handlebars.registerHelper('formatPriceDecimals', function formatPriceDecimals(priceString) {
        var price = (priceString && priceString[0] === '$') ? priceString.substr(1) : priceString;
        price = parseFloat(price.split(',').join('')).toFixed(2); // removed commas
        return new Handlebars.SafeString(Utils.formatCurrency(price));
    });
});


};

extensions['SuiteLabs.OuterCSS.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/OuterCSS/1.0.0/' + asset;
}

define('SuiteLabs.OuterCSS.Checkout', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSCheckout(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.checkout');
        }
    };
});


define('SuiteLabs.OuterCSS.MyAccount', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSMyAccount(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.myaccount');
        }
    };
});


define('SuiteLabs.OuterCSS.Helper', [
    'jQuery'
], function SuiteLabsOuterCSSHelper(
    jQuery
) {
    'use strict';

    return {
        appendOuterFile: function appendOuterFile(container, configKey) {
            var environment = container.getComponent('Environment');
            var element;
            var outerFile = environment ?
                environment.getConfig(configKey) :
                container.getConfig(configKey);

            if (!outerFile || (typeof outerFile !== 'string')) {
                return;
            }

            element = jQuery('link[id=outercss]');

            if (!element.length) {
                jQuery('<link id="outercss" rel="stylesheet">').attr('href', outerFile).appendTo(jQuery('head'));
            } else {
                element.attr('href', outerFile);
            }
        }
    };
});


define('SuiteLabs.OuterCSS.Shopping', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSShopping(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.shopping');
        }
    };
});


};

extensions['SuiteLabs.PDFGenerator.1.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/PDFGenerator/1.0.1/' + asset;
}

define('PDFGenerator.View', [
    'Backbone',
    'pdf_generator.tpl',
    'underscore',
    'Utils'
], function PDFGeneratorView(
    Backbone,
    pdfGeneratorTpl,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: pdfGeneratorTpl,

        initialize: function initialize(options) {
            var self = this;
            this.pdp = options.application.getComponent('PDP');

            this.pdp.on('afterOptionSelection', function afterChangeOption(event) {
                var matrixDimension;

                matrixDimension = self.getMatrixDimension();

                if (event && matrixDimension && matrixDimension.cartOptionId === event.cartOptionId) {
                    self.render();
                }
            });
        },

        getMatrixDimension: function getMatrixDimension() {
            var product = this.pdp.getItemInfo();
            var matrixDimension = _.findWhere(product.options, { isMatrixDimension: true });

            return matrixDimension;
        },

        getItem: function getItem() {
            var isMatrix = this.pdp.getAllMatrixChilds().length > 0;
            var selectedMatrixChildren;
            var product;
            var item;

            if (isMatrix) {
                selectedMatrixChildren = this.pdp.getSelectedMatrixChilds();

                if (selectedMatrixChildren.length === 1) {
                    item = selectedMatrixChildren[0];
                }
            } else {
                product = this.pdp.getItemInfo();
                item = product && product.item;
            }

            return item;
        },

        generateUrl: function generateUrl() {
            var isMatrix = this.pdp.getAllMatrixChilds().length > 0;
            var matrixDimension;
            var item = this.getItem();
            var url;

            if (item) {
                url = 'Modules/Main/SuiteScript2/PDFGenerator.Service.ss?id=' + item.internalid;

                if (isMatrix) {
                    matrixDimension = this.getMatrixDimension();
                    url += '&dimension=' + matrixDimension.itemOptionId;
                }

                url = _.getAbsoluteUrl(getExtensionAssetsPath(url), true);
            }

            return url;
        },

        getContext: function getContext() {
            var url = this.generateUrl();

            return {
                url: url,
                showDownloanBtn: !!url
            };
        }
    });
});


/**
* @NApiVersion 2.x
* PDFGenerator.Model.js
*/

define([
    'N/search',
    'N/file',
    'N/render',
    'N/record',
    'N/commerce/recordView'
], function PDFGeneratorModel(
    Search,
    File,
    Render,
    Record,
    RecordView
) {
    'use strict';

    var config = {
        item: {
            pdfTemplate: 'custitem_new_tear_sheet_type'
        },

        template: {
            record: 'customrecord_sc_ns_spec_sheet_tp',

            fields: {
                xmlTemplate: 'custrecord_spec_sheet_xml_tpl'
            }
        },

        mainImgSuffix: ['-1.jpg', '_1.jpg'],

        bottomImageSuffix: ['-90.jpg', '_90.jpg', '-91.jpg', '_91.jpg']
    };

    var getTemplateByItemId = function getTemplateByItemId(itemId) {
        var itemLookupResult;
        var templateLookupResult;
        var itemTemplate;
        var template;

        try {
            itemLookupResult = Search.lookupFields({
                type: 'item',
                id: itemId,
                columns: [config.item.pdfTemplate]
            });

            itemTemplate = itemLookupResult[config.item.pdfTemplate][0];

            templateLookupResult = Search.lookupFields({
                type: config.template.record,
                id: parseInt(itemTemplate.value, 10),
                columns: [config.template.fields.xmlTemplate]
            });

            template = templateLookupResult[config.template.fields.xmlTemplate][0].value;
        } catch (e) {
            log.error('There was an error in the PDFGenerator model', e.message);
        }

        return template;
    };

    var getItemImages = function getItemImages(item, itemId, dimension) {
        var itemAPIResponse;
        var itemImages;
        var parentItemId;
        var matrixOption;
        var bottomImg;
        var mainImg;
        var img;
        var i = 0;
        var j = 0;

        try {
            if (dimension) {
                parentItemId = item.getValue({ fieldId: 'parent' });
                matrixOption = item.getText({ fieldId: dimension });

                itemAPIResponse = JSON.stringify(RecordView.viewItems({
                    ids: [parseInt(parentItemId, 10)],
                    fields: ['itemimages_detail']
                }));

                itemImages = JSON.parse(itemAPIResponse)[parentItemId].itemimages_detail[matrixOption];
            } else {
                itemAPIResponse = JSON.stringify(RecordView.viewItems({
                    ids: [parseInt(itemId, 10)],
                    fields: ['itemimages_detail']
                }));

                itemImages = JSON.parse(itemAPIResponse)[itemId].itemimages_detail;
            }

            while ((!bottomImg || !mainImg) && i < itemImages.urls.length) {
                img = itemImages.urls[i].url;

                while (!mainImg && j < config.mainImgSuffix.length) {
                    if (img.indexOf(config.mainImgSuffix[j]) >= 0) {
                        mainImg = img;
                    }

                    j++;
                }

                j = 0;

                while (!bottomImg && j < config.bottomImageSuffix.length) {
                    if (img.indexOf(config.bottomImageSuffix[j]) >= 0) {
                        bottomImg = img;
                    }

                    j++;
                }
                i++;
            }
        } catch (e) {
            log.error('There was an error in the PDFGenerator service while fetching images', e.message);
        }

        return {
            mainImg: encodeURI(mainImg),
            bottomImg: encodeURI(bottomImg)
        };
    };

    var generate = function generate(itemId, dimension) {
        var template = getTemplateByItemId(itemId);
        var xmlTemplateFile = File.load(template);
        var renderer = Render.create();
        var itemType = Search.lookupFields({
            type: 'item',
            id: itemId,
            columns: ['recordtype']
        }).recordtype;
        var file;

        var item = Record.load({
            type: itemType,
            id: itemId
        });

        renderer.templateContent = xmlTemplateFile.getContents();
        renderer.addRecord('item', item);
        renderer.addCustomDataSource({
            format: Render.DataSource.OBJECT,
            alias: 'images',
            data: getItemImages(item, itemId, dimension)
        });

        file = renderer.renderAsPdf();
        file.name = 'Item-Information-Regina.pdf';

        return file;
    };

    return {
        generate: generate
    };
});


define('SuiteLabs.PDFGenerator', [
    'PDFGenerator.View',
    'underscore'
], function SuiteLabsPDFGenerator(
    PDFGeneratorView,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var PDP = container.getComponent('PDP');

            PDP.addChildView('PDFGenerator', function PDFGenerator() {
                return new PDFGeneratorView({ application: container });
            });
        }
    };
});


};

extensions['AwaLabs.PDPCustomFields.2.2.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/PDPCustomFields/2.2.0/' + asset;
}

define('PDPCustomField.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field.tpl',
    'underscore'
], function PDPCustomFieldViewModule(
    BaseView,
    CustomFieldQuickViewTpl,
    _
) {
    'use strict';

    function PDPCustomFieldView(options) {
        BaseView.call(this, options);
        this.template = CustomFieldQuickViewTpl;
    }

    PDPCustomFieldView.prototype = Object.create(BaseView.prototype);

    PDPCustomFieldView.prototype.constructor = PDPCustomFieldView;

    PDPCustomFieldView.prototype.getContext = function getContext() {
        var item = this.getItem();
        var pdpCustomFieldsList = this.environment.getConfig('pdpCustomFieldsList', []);
        var pdpCustomFieldListByOrder = [];

        if (
            pdpCustomFieldsList
            && pdpCustomFieldsList.length > 0
        ) {
            _.each(pdpCustomFieldsList, function eachField(field) {
                field.data = item[field.internalId];
                if (field.order) {
                    pdpCustomFieldListByOrder[parseInt(field.order, 10)] = field;
                }
            });
        }
        return {
            quickView: this.options.quickView,
            pdpCustomFieldsList: pdpCustomFieldListByOrder,
            showCustomFields: pdpCustomFieldListByOrder && pdpCustomFieldListByOrder.length > 0
        };
    };

    return PDPCustomFieldView;
});


define('PDPCustomField.FutureAvailability.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field_future_availability.tpl',
    'underscore'
], function PDPCustomFieldFutureAvailabilityViewModule(
    BaseView,
    FutureAvailabilityTpl,
    _
) {
    'use strict';

    function FutureAvailabilityView(options) {
        BaseView.call(this, options);
        this.template = FutureAvailabilityTpl;
    }

    FutureAvailabilityView.prototype = Object.create(BaseView.prototype);

    FutureAvailabilityView.prototype.constructor = FutureAvailabilityView;

    FutureAvailabilityView.prototype.getContext = function getContext() {
        var item = this.getItem();
        var intervalsToShow = [];
        var configuredIntervals = this.environment.getConfig('pdpCustomFieldsIntervals', []);
        var showAvailability;
        var forecastAvailabilityDetail;

        if (
            item.custitem_forecast_availability_detail
            && item.custitem_forecast_availability_detail !== '{}'
            && configuredIntervals
            && configuredIntervals.length > 0
        ) {
            forecastAvailabilityDetail = JSON.parse(item.custitem_forecast_availability_detail);

            _.each(configuredIntervals, function eachInterval(interval) {
                if (
                    forecastAvailabilityDetail[interval.index]
                    && forecastAvailabilityDetail[interval.index].quantity
                ) {
                    showAvailability = true;
                    intervalsToShow.push(forecastAvailabilityDetail[interval.index]);
                }
            });
        }

        return {
            pdpCustomFieldsIntervalsList: intervalsToShow,
            showIntervalsFields: intervalsToShow && intervalsToShow.length > 0,
            showAvailability: showAvailability
        };
    };

    return FutureAvailabilityView;
});


define('PDPCustomField.Vectary3dModel.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field_vectary_3d_model.tpl',
    'underscore'
], function PDPCustomFieldStockMessagingViewModule(
    BaseView,
    Vectary3dModelTpl,
    _
) {
    'use strict';

    function Vectary3dModelView(options) {
        BaseView.call(this, options);
        this.template = Vectary3dModelTpl;
    }

    Vectary3dModelView.prototype = Object.create(BaseView.prototype);

    Vectary3dModelView.prototype.constructor = Vectary3dModelView;

    Vectary3dModelView.prototype.getContext = function getContext() {
        var item = this.getItem();
        var finishArray = [];
        var pdpCustomFieldsFinishes = [];
        var pdpCustomFieldsFinishesTmp = [];

        if (item.custitem_vectary_3d_model_advanced) {
            finishArray = JSON.parse(item.custitem_vectary_3d_model_advanced);

            if (finishArray.Configurations) {
                _.each(finishArray.Configurations, function eachConfiguration(configuration) {
                    pdpCustomFieldsFinishes.push(configuration);
                });
            } else {
                _.each(finishArray.Finishes, function eachFinish(finish) {
                    pdpCustomFieldsFinishesTmp.push(finish);
                });

                pdpCustomFieldsFinishes.push({ name: 'Finish', Finishes: pdpCustomFieldsFinishesTmp });
            }
        }

        return {
            pdpCustomFieldsFinishes: pdpCustomFieldsFinishes,
            showFinishes: pdpCustomFieldsFinishes && pdpCustomFieldsFinishes.length > 0
        };
    };

    return Vectary3dModelView;
});


define('PDPCustomField.RomanceDescription.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field_romance_description.tpl'
], function PDPCustomFieldRomanceDescriptionViewModule(
    BaseView,
    RomanceDescriptionTpl
) {
    'use strict';

    function RomanceDescriptionView(options) {
        BaseView.call(this, options);
        this.template = RomanceDescriptionTpl;
    }

    RomanceDescriptionView.prototype = Object.create(BaseView.prototype);

    RomanceDescriptionView.prototype.constructor = RomanceDescriptionView;

    RomanceDescriptionView.prototype.getContext = function getContext() {
        return {
            romanceDescription: this.getItem().custitem_retail_romance_desc
        };
    };

    return RomanceDescriptionView;
});


define('PDPCustomField.Stock.Messaging.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field_stock_messaging.tpl'
], function PDPCustomFieldStockMessagingViewModule(
    BaseView,
    PDPCustomFieldStockMessagingTpl
) {
    'use strict';

    function StockMessageView(options) {
        BaseView.call(this, options);
        this.template = PDPCustomFieldStockMessagingTpl;
    }

    StockMessageView.prototype = Object.create(BaseView.prototype);

    StockMessageView.prototype.constructor = StockMessageView;

    StockMessageView.prototype.getContext = function getContext() {
        return {
            stockMessage: this.getItem().custitem_pdp_stock_messaging
        };
    };

    return StockMessageView;
});


define('PDPCustomField.Base.View', [
    'SCView',
    'underscore'
], function PDPCustomFieldBaseViewModule(
    SCViewComponent,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function BaseView(options) {
        var self = this;

        SCView.call(this);

        this.options = options;
        this.contextDataRequest = ['item'];
        this.pdp = options.application.getComponent('PDP');
        this.environment = options.application.getComponent('Environment');

        this.pdp.on('afterOptionSelection', function afterOptionSelection(changedOption) {
            var selectedMatrixChildren;
            var matrixDimensions = self.getMatrixDimensions();

            if (
                changedOption
                && changedOption.cartOptionId
                && matrixDimensions.indexOf(changedOption.cartOptionId) >= 0
            ) {
                selectedMatrixChildren = self.pdp.getSelectedMatrixChilds();

                if (selectedMatrixChildren && selectedMatrixChildren.length === 1) {
                    self.render();
                }
            }
        });
    }

    BaseView.prototype = Object.create(SCView.prototype);

    BaseView.prototype.constructor = BaseView;

    BaseView.prototype.getMatrixDimensions = function getMatrixDimensions() {
        var itemInfo = this.pdp.getItemInfo();
        var options = itemInfo ? itemInfo.options : [];

        return _.chain(options)
            .filter({ isMatrixDimension: true })
            .pluck('cartOptionId')
            .value();
    };

    BaseView.prototype.getItem = function getItem() {
        var isMatrix = this.pdp.getAllMatrixChilds().length > 0;
        var selectedMatrixChildren;
        var item;

        if (isMatrix) {
            selectedMatrixChildren = this.pdp.getSelectedMatrixChilds();

            if (selectedMatrixChildren.length === 1) {
                item = selectedMatrixChildren[0];
            }
        } else {
            item = this.contextData.item();
        }

        return item;
    };

    return BaseView;
});


define('AwaLabs.PDPCustomFields', [
    'PDPCustomField.View',
    'PDPCustomField.FutureAvailability.View',
    'PDPCustomField.Vectary3dModel.View',
    'PDPCustomField.RomanceDescription.View',
    'PDPCustomField.Stock.Messaging.View'
], function AwaLabsPDPCustomFields(
    PDPCustomFieldView,
    PDPCustomFieldFutureAvailabilityView,
    PDPCustomFieldVectary3dModelView,
    PDPCustomFieldRomanceDescriptionView,
    PDPCustomFieldStockMessagingView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var pdp = application.getComponent('PDP');
            var layout = application.getComponent('Layout');

            if (pdp && layout) {
                pdp.addToViewContextDefinition('ProductDetails.Full.View', 'showInStockMessage', 'string', function fnField(context) {
                    return context.model.item.isinstock;
                });

                pdp.addToViewContextDefinition('ProductDetails.Full.View', 'showquantityAvailable', 'string', function fnField(context) {
                    return !!context.model.item.quantityavailable || context.model.item.quantityavailable === 0;
                });

                pdp.addChildView('Stock.Messaging', function StockMessaging() {
                    return new PDPCustomFieldStockMessagingView({ application: application, pdp: pdp });
                });

                layout.addChildViews(layout.ALL_VIEWS, {
                    'Product.Stock.Info': {
                        'PDPCustomFieldFutureAvailabilityView': {
                            childViewIndex: 10,
                            childViewConstructor: function pdpCustomFieldFutureAvailabilityView() {
                                return new PDPCustomFieldFutureAvailabilityView({ application: application });
                            }
                        }
                    },
                    'PDPCustomFieldVectary3dModelView': {
                        'PDPCustomFieldVectary3dModelView': {
                            childViewConstructor: function pdpCustomFieldVectary3dModelView() {
                                return new PDPCustomFieldVectary3dModelView({ application: application });
                            }
                        }
                    },
                    'Romance.Description': {
                        'PDPCustomFieldRomanceDescriptionView': {
                            childViewConstructor: function pdpCustomFieldRomanceDescriptionView() {
                                return new PDPCustomFieldRomanceDescriptionView({ application: application });
                            }
                        }
                    },
                    'PDPCustomFields': {
                        'PDPCustomFields': {
                            childViewConstructor: function pdpCustomFields() {
                                return new PDPCustomFieldView({
                                    application: application,
                                    quickView: false
                                });
                            }
                        }
                    },
                    'Product.Details': {
                        'PDPCustomFieldQuickViewView': {
                            childViewConstructor: function pdpCustomFieldQuickViewView() {
                                return new PDPCustomFieldView({
                                    application: application,
                                    quickView: true
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});



};

extensions['SuiteLabs.PLPCellContent.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/PLPCellContent/1.0.0/' + asset;
}

define('PLPCellContent.View', [
    'SCView',
    'plp_cell_content.tpl',
    'underscore'
], function PLPCellContentViewModule(
    SCViewComponent,
    PLPCellContentTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function BulbUpsellView(options) {
        SCView.call(this);

        this.options = options || {};
        this.template = PLPCellContentTpl;
        this.contextDataRequest = ['item'];

        this.environment = options.container.getComponent('Environment');

        this.configuration = this.environment.getConfig('plpCellContent');
    }

    BulbUpsellView.prototype = Object.create(SCView.prototype);

    BulbUpsellView.prototype.constructor = BulbUpsellView;

    BulbUpsellView.prototype.render = function render() {
        SCView.prototype.render.apply(this, arguments);
    };

    BulbUpsellView.prototype.getContext = function getContext() {
        var item = this.contextData.item();

        return {
            content: item[this.configuration.fieldId],
            showContent: !!item[this.configuration.fieldId]
        };
    };

    return BulbUpsellView;
});


define('SuiteLabs.PLPCellContent.Main', [
    'PLPCellContent.View'
], function SuiteLabsPLPCellContentMain(
    PLPCellContentView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var plp = container.getComponent('PLP');

            plp.addChildViews(plp.PLP_VIEW, {
                'ProductViewsPrice.Price': {
                    'PLPCellContent.View': {
                        childViewConstructor: function childViewConstructor() {
                            return new PLPCellContentView({
                                container: container
                            });
                        },
                        childViewIndex: 11
                    }
                }
            });
        }
    };
});


};

extensions['AwaLabs.PLPColorRelations.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/PLPColorRelations/2.0.0/' + asset;
}

define('AwaLabs.PLPColorRelations', [
    'Utils',
    'underscore'
], function AwaLabsPLPColorRelations(
    Utils,
    _
) {
    'use strict';

    return {
        plp: null,
        environment: null,
        getItem: function getItem(itemId) {
            var items = (this.plp) ? this.plp.getItemsInfo() : [];
            return _.findWhere(items, {
                internalid: itemId
            });
        },
        getItemOptionsAndFilters: function getItemOptionsAndFilters(itemId) {
            var currentFilters = (this.plp) ? this.plp.getFilters() : [];
            var multiImageOptionConfig = this.environment.getConfig('productline.multiImageOption') || [];
            var item = this.getItem(itemId);
            var itemOption;
            var itemData = [];

            if (item) {
                if (currentFilters && currentFilters.length) {
                    _.each(currentFilters, function eachFilter(filter) {
                        itemOption = _.findWhere(item.options, {
                            itemOptionId: filter.id
                        });
                        if (itemOption) {
                            itemData.push({
                                itemOption: itemOption,
                                filter: filter,
                                filterImage: (_.contains(multiImageOptionConfig, itemOption.cartOptionId))
                            });
                        }
                    });
                }
            }
            return itemData;
        },
        getThumbnail: function getThumbnail(thumbnail, itemId) {
            var defaultThumbnail = thumbnail;
            var item = this.getItem(itemId);
            var itemOptionData = this.getItemOptionsAndFilters(itemId);
            var itemImages;
            var imagesContainer = {};
            var images = [];

            var filterValue;
            var filterLabel;
            var optionValue;
            var self = this;

            if (item) {
                itemImages = item.itemimages_detail;

                _.each(itemOptionData, function each(optionData) {
                    if (optionData.filterImage) {
                        filterValue = optionData.filter.value;
                        filterLabel = self.plp.current_view.translator.getLabelForValue(optionData.filter.id, filterValue);
                        optionValue = _.find(optionData.itemOption.values, function find(value) {
                            return value.label === filterLabel;
                        });
                        if (itemImages) {
                            imagesContainer = (item.itemimages_detail[optionValue.label]) ?
                                item.itemimages_detail[optionValue.label] :
                                item.itemimages_detail;
                            images.push(Utils.imageFlatten(imagesContainer));
                        }
                    }
                });

                if (images && images.length) {
                    images = _.flatten(images);
                }
            }

            return images.length ? this.getFirstImage(images) : (this.getDefaultImage(item) || defaultThumbnail);
        },
        getFirstImage: function getFirstImage(flattenedImages) {
            var i;
            var detail;
            var splitted;
            for (i = 0; i < flattenedImages.length; i++) {
                detail = flattenedImages[i];
                splitted = detail.url.split('.');
                if (splitted[splitted.length - 2] === 'default') {
                    return detail;
                }
            }
            return flattenedImages[0];
        },
        getDefaultImage: function getDefaultImage(model) {
            var image = model && model.keyMapping_images[0];
            var preferedOptions = [];
            var preferedOption;
            if (model && model.custitem_sc_prefered_options) {
                preferedOptions = model.custitem_sc_prefered_options.split('_');
            }
            if (preferedOptions && preferedOptions.length > 0) {
                preferedOption = _.first(preferedOptions);
                if (model && model.itemimages_detail &&
                    model.itemimages_detail[preferedOption] &&
                    model.itemimages_detail[preferedOption].urls &&
                    model.itemimages_detail[preferedOption].urls.length > 0) {
                    image = model.itemimages_detail[preferedOption].urls[0];
                }
            }
            return image;
        },
        getUrl: function getUrl(currentUrl, itemId) {
            var url = currentUrl;
            var itemOptionData = this.getItemOptionsAndFilters(itemId);
            var filterValue;
            var filterLabel;
            var optionValue;
            var self = this;

            if (itemOptionData && itemOptionData.length) {
                _.each(itemOptionData, function each(optionData) {
                    filterValue = optionData.filter.value;
                    filterLabel = self.plp.current_view.translator.getLabelForValue(optionData.filter.id, filterValue);
                    optionValue = _.find(optionData.itemOption.values, function find(value) {
                        // return value.label.split(' ').join('-') === filterValue;
                        return value.label === filterLabel;
                    });
                    // TODO: Review if applicable more than one facet.
                    if (optionValue && optionValue.url) {
                        url = optionValue.url;
                    }
                });
            }
            return url;
        },
        mountToApp: function mountToApp(container) {
            var self = this;
            var layout = container.getComponent('Layout');

            this.plp = container.getComponent('PLP');
            this.environment = container.getComponent('Environment');

            if (layout) {
                layout.addToViewContextDefinition('Facets.ItemCell.View', 'url', 'string', function colorRelations(context) {
                    var currentUrl = context.url;
                    var itemId = context.itemId;
                    return self.getUrl(currentUrl, itemId);
                });
                layout.addToViewContextDefinition('Facets.ItemCell.View', 'thumbnail', 'string', function colorRelations(context) {
                    var thumbnail = context.thumbnail;
                    var itemId = context.itemId;
                    return self.getThumbnail(thumbnail, itemId);
                });
            }
        }
    };
});


};

extensions['AwaLabs.PriceToggle.2.1.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/PriceToggle/2.1.1/' + asset;
}

define('PriceToggle.Item.Model', [
    'Item.Model',
    'Profile.Model',
    'Configuration',
    'Utils',
    'underscore'
], function PriceToggleItemModel(
    ItemModel,
    ProfileModel,
    Configuration,
    Utils,
    _
) {
    'use strict';

    _.extend(ItemModel.prototype, {
        priceDetailsRetail: function priceDetailsRetail() {
            var priceLevel = Configuration.get('priceTogglePriceToggle', 'pricelevel4');
            var retailPrice = this.get(priceLevel);
            var retailPriceFormatted = this.get(priceLevel + '_formatted') || (
                retailPrice ? Utils.formatCurrency(retailPrice) : ''
            );
            var result;

            if (retailPrice && retailPriceFormatted) {
                result = {
                    onlinecustomerprice: retailPrice,
                    onlinecustomerprice_formatted: retailPriceFormatted
                };
            }

            return result;
        },

        getDefaultPrice: _.wrap(ItemModel.prototype.getDefaultPrice, function getDefaultPrice(fn, detailsObject) {
            var profile = ProfileModel.getInstance();
            var retailDetailsObject;

            if (profile.get('isEnabledRetailPrices')) {
                retailDetailsObject = this.priceDetailsRetail();
            }

            return fn.apply(this, [retailDetailsObject || detailsObject]);
        })
    });
});


define('AwaLabs.PriceToggle', [
    'underscore',
    'Profile.Model',
    'PriceToggle.Item.Model'
], function PriceToggle(
    _,
    ProfileModel
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();

            if (layout) {
                layout.addToViewContextDefinition('Cart.Item.Summary.View', 'useRetailPrices', 'boolean', function useRetailPrices() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Cart.Summary.View', 'useRetailPrices', 'boolean', function useRetailPrices() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Cart.Summary.View', 'showProceedToCheckoutButton', 'boolean', function showProceedToCheckoutButton() {
                    return profile.get('allowContactCheckout');
                });
            }
        }
    };
});


};

extensions['AwaLabs.ProductGalleryAddons.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/ProductGalleryAddons/2.0.0/' + asset;
}

define('fitVids', [
    'jQuery'
], function fitVids(
    jQuery
) {
    (function( $ ) {
        "use strict";
        $.fn.fitVids = function( options ) {
            var settings = {
                customSelector: null
            };
            var div = document.createElement('div'),
                ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
            div.className = 'fit-vids-style';
            div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';
            ref.parentNode.insertBefore(div,ref);
            if ( options ) {
                $.extend( settings, options );
            }
            return this.each(function(){
                var selectors = [
                    "iframe[src*='player.vimeo.com']",
                    "iframe[src*='www.youtube.com']",
                    "iframe[src*='www.kickstarter.com']",
                    "object",
                    "embed"
                ];
                if (settings.customSelector) {
                    selectors.push(settings.customSelector);
                }
                var $allVideos = $(this).find(selectors.join(','));
                $allVideos.each(function(){
                    var $this = $(this);
                    if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
                    var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
                        width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                        aspectRatio = height / width;
                    if(!$this.attr('id')){
                        var videoID = 'fitvid' + Math.floor(Math.random()*999999);
                        $this.attr('id', videoID);
                    }
                    $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
                    $this.removeAttr('height').removeAttr('width');
                });
            });
        };
    })( jQuery );
})


define('AwaLabs.ProductGalleryAddons', [
    'ProductDetails.ImageGallery.View',
    'Utilities.ResizeImage',
    'Configuration',
    'Utils',
    'underscore',
    'fitVids'
], function AwaLabsProductGalleryVertical(
    ProductDetailsImageGalleryView,
    resizeImage,
    Configuration,
    Utils,
    _
) {
    'use strict';

    _.extend(ProductDetailsImageGalleryView.prototype, {
        initialize: _.wrap(ProductDetailsImageGalleryView.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            if (this.images && this.model && this.model.get('item') && this.model.get('item').get('custitem_ef_pdp_video_url')) {
                this.images.push({
                    altimagetext: _('Video').translate(),
                    url: this.model.get('item').get('custitem_ef_pdp_video_url'),
                    isVideo: true,
                    thumb: Utils.getAbsoluteUrl('img/default-video-thumbnail.jpg')
                });
                // If we have a video, we should remove image not available. And leave the video as main
                this.images = _.filter(this.images, function filterImages(image) {
                    return image.url !== Configuration.imageNotAvailable;
                });
                this.hasVideo = true;
            }
        }),
        initSlider: function initSlider() {
            var self = this;
            var $slider;
            var sliderOptions;
            var galleryHeight;
            var slidesNumber;
            var pagerSize;
            if (self.images.length > 1) {
                self.$slider = Utils.initBxSlider(self.$('[data-slider]'), {
                    buildPager: _.bind(self.buildSliderPager, self),
                    startSlide: 0,
                    adaptiveHeight: false,
                    touchEnabled: true,
                    nextText: '<a class="product-details-image-gallery-next-icon" data-action="next-image"></a>',
                    prevText: '<a class="product-details-image-gallery-prev-icon" data-action="prev-image"></a>',
                    controls: true,
                    infiniteLoop: false,
                    video: this.hasVideo,
                    useCSS: !this.hasVideo,
                    onSliderLoad: function onSliderLoad() {
                        if (!self.parentView.inModal) {
                            $slider = self.$('.bx-custom-pager');
                            galleryHeight = $slider.closest('.product-details-image-gallery').height() - 30;
                            pagerSize = $slider.width();
                            slidesNumber = Math.floor(galleryHeight / pagerSize);
                            sliderOptions = {
                                mode: 'vertical',
                                slideMargin: 0,
                                pager: false,
                                controls: true,
                                forceStart: true,
                                infiniteLoop: false,
                                wrapperClass: 'bx-wrapper product-details-image-gallery-thumbs',
                                minSlides: 1,
                                moveSlides: slidesNumber,
                                nextText: '<a class="product-details-image-gallery-thumbs-next-icon" data-action="next-image-vertical"></a>',
                                prevText: '<a class="product-details-image-gallery-thumbs-prev-icon" data-action="prev-image-vertical"></a>',
                                onSliderLoad: function onPagerSliderLoad() {
                                    self.$('[data-action="next-image-vertical"]').off();
                                    self.$('[data-action="prev-image-vertical"]').off();

                                    self.$('[data-action="next-image-vertical"]').click(_.bind(self.nextImageEventHandler, self));
                                    self.$('[data-action="prev-image-vertical"]').click(_.bind(self.previousImageEventHandler, self));

                                    self.$('[data-action="next-image-vertical"],[data-action="prev-image-vertical"]').click(function nextImage() {
                                        _.defer(function defer() {
                                            self.thumbSlider.goToSlide(Math.floor(self.$slider.getCurrentSlide()/slidesNumber) * slidesNumber);
                                        });
                                    });
                                }
                            };
                            self.thumbSlider = $slider.bxSlider(sliderOptions);
                        }
                    }
                });

                if (self.$('.bx-custom-pager').find('img').length) {
                    self.$('.bx-custom-pager').closest('[data-view="Product.ImageGallery"]').parent().addClass('has-vertical-images');
                }

                self.$('[data-action="next-image"]').off();
                self.$('[data-action="prev-image"]').off();


                self.$('[data-action="next-image"]').click(_.bind(self.nextImageEventHandler, self));
                self.$('[data-action="prev-image"]').click(_.bind(self.previousImageEventHandler, self));
            }
        },
        buildSliderPager: function buildSliderPager(slideIndex) {
            var image = this.images[slideIndex];
            if (image) {
                if (image.isVideo) {
                    return (
                        '<img src="' +
                        resizeImage(image.thumb, 'tinythumb') +
                        '" alt="' +
                        image.altimagetext +
                        '">'
                    );
                }
                return (
                    '<img src="' +
                    resizeImage(image.url, 'tinythumb') +
                    '" alt="' +
                    image.altimagetext +
                    '">'
                );
            }
            return '';
        }
    });

    return {};
});


};

extensions['AwaLabs.ProfileUtils.2.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/ProfileUtils/2.0.1/' + asset;
}

define('AwaLabs.ProfileUtils', [
    'Profile.Model',
    'LiveOrder.Model',
    'underscore'
], function ProfileUtils(
    ProfileModel,
    LiveOrderModel,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var profile = ProfileModel.getInstance();
            if (layout) {
                layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'showProcedToCheckoutButton', 'string', function fnAddToContext() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });
                layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'useRetailPrices', 'string', function fnAddToContext() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Header.MiniCart.View', 'showProcedToCheckoutButton', 'string', function fnAddToContext() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });
                layout.addToViewContextDefinition('Header.MiniCart.View', 'useRetailPrices', 'string', function fnAddToContext() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Header.MiniCart.View', 'retailSubTotalFormatted', 'string', function fnAddToContext() {
                    var cart = LiveOrderModel.getInstance();
                    var summary = cart.get('summary');
                    return !!summary && summary.retailSubTotalFormatted;
                });
            }
        }
    }
});


};

extensions['SuiteLabs.RedirectAfterLogin.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/RedirectAfterLogin/1.0.0/' + asset;
}


define('Header.Profile.View.RedirectAfterLogin', [
    'Backbone',
    'underscore'
], function HeaderProfileViewRedirectAfterLogin(
    Backbone,
    _
) {
    'use strict';

    var AdvancedSignUpHeaderView;
    var HeaderViewToExtend;

    try {
        AdvancedSignUpHeaderView = require('SuiteCommerce.AdvancedSignUp.AccessPoints.Header.View');

        if (AdvancedSignUpHeaderView) {
            HeaderViewToExtend = AdvancedSignUpHeaderView.HeaderView || AdvancedSignUpHeaderView;
        }
    } catch (e) {
        console.info('Redirect After Login: AdvancedSignUp is not enabled, leveraging native header module');
    }

    if (!HeaderViewToExtend) {
        try {
            HeaderViewToExtend = require('Header.Profile.View');
        } catch (e) {
            console.info('Redirect After Login: Native header module could not be loaded');
        }
    }

    if (HeaderViewToExtend) {
        _.extend(HeaderViewToExtend.prototype, {
            initialize: _.wrap(HeaderViewToExtend.prototype.initialize, function initialize(fn, options) {
                this.environment = options.application.getComponent('Environment');

                return fn.apply(this, _.toArray(arguments).slice(1));
            }),

            events: _.extend({}, HeaderViewToExtend.prototype.events, {
                'click .header-profile-register-link': 'updateRegisterUrl',
                'click .header-profile-login-link': 'updateLoginUrl',
                'click .header-menu-myaccount-signout-link': 'updateSignOutUrl'
            }),

            updateLoginUrl: function updateLoginUrl(e) {
                var $elem = this.$(e.currentTarget);
                $elem.attr('data-navigation', 'ignore-click');
                $elem.attr('href', this.generateLoginUrl());
            },

            updateRegisterUrl: function updateRegisterUrl(e) {
                var $elem = this.$(e.currentTarget);
                $elem.attr('data-navigation', 'ignore-click');
                $elem.attr('href', this.generateRegisterUrl());
            },

            updateSignOutUrl: function updateLoginUrl(e) {
                var $elem = this.$(e.currentTarget);
                $elem.attr('data-navigation', 'ignore-click');
                $elem.attr('href', this.generateSignOutUrl());
            },

            generateSignOutUrl: function generateSignOutUrl() {
                var touchpoint = this.environment.getSiteSetting('touchpoints.logout');
                var hash = Backbone.history.fragment;
                var signOutUrl = touchpoint.replace('logOut', 'customLogOut') + '&redirecturl=/' + encodeURIComponent(hash);

                return signOutUrl;
            },

            generateRegisterUrl: function generateRegisterUrl() {
                var register = this.environment.getSiteSetting('touchpoints.register');
                var registerUrl = this.generateUrl(register);

                return registerUrl;
            },

            generateLoginUrl: function generateLoginUrl() {
                var login = this.environment.getSiteSetting('touchpoints.login');
                var loginUrl = this.generateUrl(login);

                return loginUrl;
            },

            generateUrl: function generateUrl(touchpoint) {
                var origin = this.environment.getConfig('currentTouchpoint');
                var hash = Backbone.history.fragment;
                var loginUrl = touchpoint + '&origin=' + origin + '&origin_hash=' + encodeURIComponent(hash);

                return loginUrl;
            },

            getContext: _.wrap(HeaderViewToExtend.prototype.getContext, function getContext(fn) {
                var context = fn.apply(this, _.toArray(arguments).slice(1));

                context.loginUrl = this.generateLoginUrl();
                context.registerUrl = this.generateRegisterUrl();
                context.signOutUrl = this.generateSignOutUrl();

                return context;
            })
        });
    }
});



define('SuiteLabs.RedirectAfterLogin.Main', [
    'Header.Profile.View.RedirectAfterLogin'
], function SuiteLabsRedirectAfterLoginMain() {
    'use strict';
});


};

extensions['AwaLabs.SchemaOrg.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/SchemaOrg/2.1.0/' + asset;
}

define('SchemaOrg.Breadcrumb', [
    'SchemaOrg.BaseModule',
    'underscore'
], function SchemaOrgBreadcrumb(
    SchemaOrgBaseModule,
    _
) {
    'use strict';
    
    return _.extend({}, SchemaOrgBaseModule, {
        moduleType: 'breadcrumb',
        createJSONLD: function createJSONLD() {
            if (!this.view.pages.length) {
                return {};
            }
            return {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                'itemListElement': _.map(this.view.pages, function mapPages(page, index) {
                    return {
                        '@type': 'ListItem',
                        'position': index + 1,
                        'name': page.text,
                        'item': location.origin + page.href
                    };
                })
            };
        }
    });
});


define('SchemaOrg.Organization', [
    'SchemaOrg.BaseModule',
    'underscore'
], function SchemaOrgOrganization(
    SchemaOrgBaseModule,
    _
) {
    'use strict';

    return _.extend({}, SchemaOrgBaseModule, {
        moduleType: 'organization',
        moduleMode: 'static',
        createJSONLD: function createJSONLD() {
            var environmentComponent = this.application.getComponent('Environment');
            var logoImage = environmentComponent.getConfig('schemaOrg.siteLogo') || this.view.$('.header-logo-image').attr('src');
            var name = environmentComponent.getConfig('schemaOrg.siteName') || SC.ENVIRONMENT.siteSettings.displayname;
            var description = environmentComponent.getConfig('schemaOrg.siteDescription') || '';
            return {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                'url': location.origin,
                'logo': logoImage,
                'name': name,
                'description': description
            };
        }
    });
});


define('SchemaOrg.Product', [
    'SchemaOrg.BaseModule',
    'Product.Model',
    'Item.Model',
    'Backbone',
    'Utils',
    'jQuery',
    'underscore'
], function SchemaOrgPDP(
    SchemaOrgBaseModule,
    ProductModel,
    ItemModel,
    Backbone,
    Utils,
    jQuery,
    _
) {
    'use strict';

    return _.extend({}, SchemaOrgBaseModule, {
        moduleType: 'product',

        init: function initialize(options) {
            var self = this;
            this.model = options.view.model;
            this.itemModel = options.view.model.get('item');
            this.reviews = [];
            this.application = options.application;
            this.pusher = options.pusher;
            this.addToPusher();

            Backbone.Events.on('SchemaOrg:Reviews', function schemaReviews(reviewCollection) {
                self.reviews = reviewCollection;
                self.addToPusher();
            });
        },

        getChildUrl: function getChildUrl(parentItem, item) {
            var productModel = new ProductModel(Utils.deepCopy(parentItem));
            var matrixOptions = productModel.get('options').where({ isMatrixDimension: true });

            _.each(matrixOptions, function eachOption(option) {
                var optionObject = _.findWhere(option.get('values'), { label: item.get(option.get('itemOptionId')) });
                if (optionObject) {
                    option.set('value', {
                        internalid: optionObject.internalid,
                        label: optionObject.label
                    });
                }
            });

            return productModel.getQuery();
        },

        getDescription: function getDescription(item) {
            var description = item.get('custitem_retail_romance_desc')
            || item.get('storedescription')
            || item.get('storedetaileddescription');

            return jQuery('<div/>').html(description).text();
        },

        getImage: function getImage(item, parentItem) {
            var imageNotAvailable = this.application.getComponent('Environment').getConfig('imageNotAvailable');
            var thumbnail = item.getThumbnail();

            if (
                thumbnail
                && parentItem
                && thumbnail.url
                && thumbnail.url.indexOf(imageNotAvailable) >= 0
            ) {
                thumbnail = parentItem.getThumbnail();
            }

            return Utils.resizeImage(
                SC.ENVIRONMENT.siteSettings.imagesizes || [],
                thumbnail.url,
                'fullscreen'
            );
        },

        getName: function getName(item) {
            // Using a custom getName since natively the Item Model will prioritize storedisplayname2
            // which is not user friendly
            return item.get('displayname') || item.get('storedisplayname2') || item.get('itemid') || '';
        },

        generateProductJson: function generateProductJson(item) {
            var itemBaseUrl = location.origin + item.get('_url');

            return {
                '@context': 'https://schema.org',
                '@type': 'Product',
                'url': itemBaseUrl,
                'name': this.getName(item),
                'description': this.getDescription(item),
                'sku': item.get('_sku'),
                'gtin': item.get('upccode'),
                'brand': {
                    '@type': 'Brand',
                    'name': item.get('custitem_brand')
                },
                'image': this.getImage(item),
                'offers': {
                    '@type': 'Offer',
                    'priceCurrency': 'USD',
                    'price': item.getPrice().price,
                    'itemCondition': 'https://schema.org/NewCondition',
                    'availability': 'https://schema.org/' + (item.getStockInfo().isInStock ? 'InStock' : 'OutOfStock'),
                    'url': location.origin + item.get('_url')
                }
            };
        },

        generateProductGroupJson: function generateProductGroupJson(item) {
            var itemBaseUrl = location.origin + item.get('_url');

            return {
                '@context': 'https://schema.org',
                '@type': 'ProductGroup',
                'name': this.getName(item),
                'brand': {
                    '@type': 'Brand',
                    'name': item.get('custitem_brand')
                },
                'description': this.getDescription(item),
                'hasVariant': this.generateChildrenProductJson(item),
                'productGroupID': item.get('_sku'),
                'url': itemBaseUrl
            };
        },

        generateProductVariantJson: function generateProductVariantJson(parentItem, item) {
            return {
                '@type': 'Product',
                'name': this.getName(item),
                'image': this.getImage(item, parentItem),
                'gtin': item.get('upccode'),
                'sku': item.get('_sku'),
                'offers': {
                    '@type': 'Offer',
                    'priceCurrency': 'USD',
                    'price': item.getPrice().price,
                    'itemCondition': 'https://schema.org/NewCondition',
                    'availability': 'https://schema.org/' + (item.getStockInfo().isInStock ? 'InStock' : 'OutOfStock'),
                    'url': location.origin + parentItem.get('_url') + this.getChildUrl(parentItem, item)
                }
            };
        },

        generateChildrenProductJson: function generateChildrenProductJson(item) {
            var childrenInfo = item.get('matrixchilditems_detail');
            var products = [];
            var i;

            for (i = 0; i < childrenInfo.length; i++) {
                products.push(this.generateProductVariantJson(
                    item,
                    new ItemModel(childrenInfo[i])
                ));
            }

            return products;
        },

        createJSONLD: function createJSONLD() {
            var environmentComponent = this.application.getComponent('Environment');
            var childrenInfo = this.itemModel.get('matrixchilditems_detail');
            var hasChildren = childrenInfo && childrenInfo.length;
            var jsonLDObject = hasChildren ? this.generateProductGroupJson(this.itemModel) : this.generateProductJson(this.itemModel);

            if (this.reviews && this.reviews.review_count) {
                jsonLDObject.aggregateRating = {
                    '@type': 'AggregateRating',
                    'ratingValue': this.reviews.average_rating || 0,
                    'bestRating': environmentComponent.getConfig('productReviews.maxRate') || 5,
                    'worstRating': 0,
                    'ratingCount': this.reviews.review_count
                };

                jsonLDObject.review = [];
            }

            return jsonLDObject;
        }
    });
});


define('SchemaOrg.ProductList', [
    'SchemaOrg.BaseModule',
    'Utils',
    'underscore'
], function SchemaOrgProductList(
    SchemaOrgBaseModule,
    Utils,
    _
) {
    'use strict';

    return _.extend({}, SchemaOrgBaseModule, {
        moduleType: 'productlist',
        createJSONLD: function createJSONLD() {
            return {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                'name': this.view.model.get('category') && this.view.model.get('category').get('name'),
                'url': this.view.model.get('category') && this.view.model.get('category').get('fullurl'),
                'itemListElement': _.map(this.view.model.get('items').models, function mapItems(item, index) {
                    return {
                        '@type': 'ListItem',
                        'position': index + 1,
                        'url': item.get('_url'),
                        'image': Utils.resizeImage(
                            SC.ENVIRONMENT.siteSettings.imagesizes || [],
                            item.get('_images')[0].url,
                            'thumbnail'
                        ),
                        'name': item.get('_name')
                    };
                })
            };
        }
    });
});


define('SchemaOrg.BaseModule', [
    'underscore'
], function SchemaOrgBaseModule(
    _
) {
    'use strict';

    return {
        init: function initialize(options) {
            _.extend(this, options);
            this.addToPusher();
        },

        moduleType: 'jsonLD',

        addToPusher: function addToPusher() {
            try {
                this.pusher.modulesToPush[this.moduleType] = JSON.stringify(this.createJSONLD());
                this.pusher.pushData();
            } catch (e) {
                // eslint-disable-next-line
                console.log('Schema Error:', e);
                return this;
            }
            return this;
        },

        createJSONLD: function createJSONLD() {
            return {};
        }
    };
});


define('SchemaOrg.RelatedItems', [
    'SchemaOrg.ItemRelations',
    'underscore'
], function SchemaOrgProductList(
    SchemaOrgItemRelations,
    _
) {
    'use strict';
    
    return _.extend({}, SchemaOrgItemRelations, {
        moduleType: 'relatedItems',
        relationName: 'Related Items'
    });
});


define('SchemaOrg.CorrelatedItems', [
    'SchemaOrg.ItemRelations',
    'underscore'
], function SchemaOrgProductList(
    SchemaOrgItemRelations,
    _
) {
    'use strict';
    
    return _.extend({}, SchemaOrgItemRelations, {
        moduleType: 'correlatedItems',
        relationName: 'Correlated Items'
    });
});


define('SchemaOrg.ItemRelations', [
    'SchemaOrg.BaseModule',
    'underscore'
], function SchemaOrgProductList(
    SchemaOrgBaseModule,
    _
) {
    'use strict';
    
    return _.extend({}, SchemaOrgBaseModule, {
        createJSONLD: function createJSONLD() {
            return {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                'name': this.relationName,
                'mainEntity': {
                    '@type': 'ItemList',
                    'itemListElement': _.map(this.view.collection.models, function mapItems(item, index) {
                        return {
                            '@type': 'ListItem',
                            'position': index + 1,
                            'url': item.get('_url'),
                            'image': item.get('_images')[0].url,
                            'name': item.get('_name')
                        };
                    })
                }

            };
        }
    });
});


define('AwaLabs.SchemaOrg', [
    'Backbone',
    'Backbone.View',
    'SchemaOrg.Breadcrumb',
    'SchemaOrg.Organization',
    'SchemaOrg.Product',
    'SchemaOrg.ProductList',
    'SchemaOrg.RelatedItems',
    'SchemaOrg.CorrelatedItems',
    'jQuery',
    'underscore'
], function AwaLabsNProgress(
    Backbone,
    BackboneView,
    SchemaOrgBreadcrumb,
    SchemaOrgOrganization,
    SchemaOrgProduct,
    SchemaOrgProductLis,
    SchemaOrgRelatedItems,
    SchemaOrgCorrelatedItems,
    jQuery,
    _
) {
    'use strict';

    var SchemaOrgModule = {
        viewsConfig: {
            facets_facet_browse: {
                schemaModule: SchemaOrgProductLis,
                fn: 'executeSchemaOrgOnViewRender'
            },
            global_views_breadcrumb: {
                schemaModule: SchemaOrgBreadcrumb,
                fn: 'executeSchemaOrgOnViewRender'
            },
            home: {
                schemaModule: SchemaOrgOrganization,
                fn: 'executeSchemaOrgOnViewRender'
            },
            product_details_full: {
                schemaModule: SchemaOrgProduct,
                fn: 'executeSchemaOrgOnViewRender'
            },
            item_relations_related: {
                schemaModule: SchemaOrgRelatedItems,
                fn: 'executeSchemaOrgOnViewRender'
            },
            item_relations_correlated: {
                schemaModule: SchemaOrgCorrelatedItems,
                fn: 'executeSchemaOrgOnViewRender'
            },
            product_reviews_center: {
                fn: 'updateSchemaOrgWithReviews'
            }
        },

        updateSchemaOrgWithReviews: function updateSchemaOrgWithReviews(view) {
            if (view.collection.length) {
                Backbone.Events.trigger('SchemaOrg:Reviews', view.collection);
            }
        },

        executeSchemaOrgOnViewRender: function executeSchemaOrgOnViewRender(view, viewOptions) {
            viewOptions.schemaModule.init({ view: view, pusher: this, application: this.application });
        },

        modulesToPush: {},

        pushData: function pushData() {
            var scriptTag = null;
            jQuery('#json-ld-schema').empty();
            jQuery('[type="application/ld+json"]').remove();
            _.each(this.modulesToPush, function fnEach(jsonLD) {
                if (SC.isPageGenerator()) {
                    scriptTag = document.createElement('script');
                    scriptTag.setAttribute('type', 'application/ld+json');
                    scriptTag.innerHTML = jsonLD;
                    jQuery('#json-ld-schema').append(scriptTag);
                } else {
                    jQuery('#json-ld-schema').append('<script type="application/ld+json">' + jsonLD + '</script>');
                }
            });
        },

        mountToApp: function monuntToApp(application) {
            this.application = application;
            jQuery('body').prepend('<div id="json-ld-schema"></div>');
        }
    };

    // Trigger Schema modules based on view that is render
    // eslint-disable-next-line
    BackboneView.prototype._render = _.wrap(BackboneView.prototype._render, function wrapRender(fn) {
        var originalRender = fn.apply(this, _.toArray(arguments).slice(1));
        var viewRenderOptions = SchemaOrgModule.viewsConfig[this.template.Name];
        if (viewRenderOptions && SchemaOrgModule[viewRenderOptions.fn]) {
            SchemaOrgModule[viewRenderOptions.fn](this, viewRenderOptions);
        }
        this.$('[itemscope]').removeAttr('itemscope');
        this.$('[itemprop]').not('[itemprop="itemListElement"]').removeAttr('itemprop');
        this.$('[itemtype]').removeAttr('itemtype');
        return originalRender;
    });


    return SchemaOrgModule;
});


};

extensions['SuiteLabs.SEOEnhancements.1.0.4'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/SEOEnhancements/1.0.4/' + asset;
}

define('Facets.Browse.View.FixMetaDescription', [
    'Facets.Browse.View',
    'underscore'
], function FacetsBrowseViewFixMetaDescription(
    FacetsBrowseView,
    _
) {
    'use strict';

    _.extend(FacetsBrowseView.prototype, {
        getMetaDescription: function getMetaDescription() {
            var category = this.model.get('category');

            // Prioritize the CMS description instead of the category description
            return this.metaDescription || (category && category.get('metadescription'));
        }
    });
});


define('CMSadapter.Impl.Enhanced.OpenGraph.Fix', [
    'CMSadapter.Impl.Enhanced',
    'jQuery',
    'underscore'
], function CMSadapterImplEnhancedOpenGraphFix(
    CMSadapterImplEnhanced,
    jQuery,
    _
) {
    'use strict';

    var seoTitle = function seoTitle(layout) {
        var title = layout.$('[itemprop="name"]:eq(0)').text();

        if (!title) {
            title = document.title;
        }

        return title && title.length ? String(title).trim() : '';
    };

    var seoDescription = function seoDescription(layout) {
        var socialDescription = layout
            .$('[data-type="social-description"], [itemprop="description"]')
            .first()
            .text();

        socialDescription = String(socialDescription).trim().replace(/\s+/g, ' ');

        if (!socialDescription) {
            socialDescription = layout
            && layout.currentView
            && layout.currentView.getMetaDescription
            && layout.currentView.getMetaDescription();
        }

        return socialDescription && socialDescription.length ? socialDescription : '';
    };

    function clearOpenGraphTagsByConfiguration(openGraphConfiguration) {
        var metaTag;

        _.each(openGraphConfiguration, function eachTag(fn, name) {
            metaTag = jQuery('meta[property="' + name + '"]');

            if (metaTag) {
                metaTag.remove();
            }
        });
    }

    function setMetaTagsByConfiguration(layout, metaTagConfiguration) {
        _.each(metaTagConfiguration, function eachMetaTag(fn, name) {
            var content = fn(layout);

            jQuery('<meta />', {
                property: name,
                content: content || ''
            }).appendTo(jQuery('head'));
        });
    }

    _.extend(CMSadapterImplEnhanced.prototype, {
        'enhancePage': _.wrap(CMSadapterImplEnhanced.prototype.enhancePage, function enhancePage(fn, view, layout) {
            var metaTags = {
                'og:title': seoTitle,
                'og:description': seoDescription
            };

            fn.apply(this, _.toArray(arguments).slice(1));

            clearOpenGraphTagsByConfiguration(metaTags);
            setMetaTagsByConfiguration(layout, metaTags);
        })
    });
});



define('SuiteLabs.SEOEnhancements.Main', [
    'jQuery',
    'underscore',
    'Facets.Browse.View.FixMetaDescription',
    'CMSadapter.Impl.Enhanced.OpenGraph.Fix'
], function SuiteLabsSEOEnhancementsMain(
    jQuery,
    _
) {
    'use strict';

    // If the UA is google and main div is not empty (was pre-rendered) then unwrap the images for googlebot
    if (navigator.userAgent.match(/googlebot/i) && jQuery('#main') && String(jQuery('#main').html()).trim()) {
        jQuery('noscript').each(function eachNoScript() {
            jQuery(this).parent().append(
                jQuery(this).text()
            );
        });
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            // Switch H1 and H5 content on the blog's categories to improve SEO metadata relevance
            layout.addToViewContextDefinition('SuiteCommerce.Blog.BlogHome.View', 'header', 'string', function updateHeader(context) {
                return context.postListTitle && context.postListTitle.label ? context.postListTitle.label : context.header;
            });

            layout.addToViewContextDefinition('SuiteCommerce.Blog.BlogHome.View', 'url', 'string', function updateUrl() {
                return '#';
            });

            layout.addToViewContextDefinition('SuiteCommerce.Blog.BlogHome.View', 'postListTitle', 'string', function updatePostList() {
                return {
                    label: _.translate('Articles')
                };
            });
            // -----------------------------------------------------------------------------------
        }
    };
});


};

extensions['AwaLabs.SEOImprovements.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/SEOImprovements/2.0.0/' + asset;
}

define('SEOImprovements.Home.View', [
    'Home.View',
    'underscore'
], function SEOImprovementsHomeView(
    HomeView,
    _
) {
    'use strict';

    _.extend(HomeView.prototype, {
        getMetaDescription: _.wrap(HomeView.prototype.getMetaDescription, function getMetaDescription(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var environmentComponent = this.options.application.getComponent('Environment');
            return ret || environmentComponent.getConfig('seo.siteDescription');
        }),
        getTitle: _.wrap(HomeView.prototype.getTitle, function getTitle(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var environmentComponent = this.options.application.getComponent('Environment');
            return ret || environmentComponent.getConfig('seo.siteTitle') || environmentComponent.getConfig('siteSettings.displayName');
        })
    });
});


define('SEOImprovements.PLP.View', [
    'Facets.ItemCell.View',
    'underscore'
], function SEOImprovementsPLPView(
    FacetsItemCellView,
    _
) {
    'use strict';

    _.extend(FacetsItemCellView.prototype, {
        getContext: _.wrap(FacetsItemCellView.prototype.getContext, function onGetContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            var thumbnail = originalRet.thumbnail;
            if (thumbnail && !thumbnail.altimagetext) {
                thumbnail.altimagetext = originalRet.name;
            }
            return originalRet;
        })
    });
});


define('SEOImprovements.PDP.View', [
    'ProductDetails.ImageGallery.View',
    'ProductDetails.Full.View',
    'underscore',
    'jQuery',
    'Configuration'
], function fnSEOImprovementsPDPView(
    ProductDetailsImageGalleryView,
    ProductDetailsFullView,
    _,
    jQuery,
    Configuration
) {
    'use strict';

    _.extend(ProductDetailsImageGalleryView.prototype, {
        getContext: _.wrap(ProductDetailsImageGalleryView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            var self = this;
            _.each(originalRet.images, function eachImg(image) {
                if (!image.altimagetext) {
                    image.altimagetext = self.model.getItem().get('keyMapping_name');
                }
            });
            return originalRet;
        })
    });

    _.extend(ProductDetailsFullView.prototype, {
        getMetaDescription: _.wrap(ProductDetailsFullView.prototype.getMetaDescription, function getMetaDescription(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var descriptionFieldId;
            var descriptionField;
            var div;
            var descriptionText;

            if (!ret) {
                descriptionFieldId = Configuration.get('seo.productDescriptionField');
                //eslint-disable-next-line
                descriptionField = descriptionFieldId && this.model.get('item').get(descriptionFieldId) ? this.model.get('item').get(descriptionFieldId) : this.model.get('item').get('storedescription') || this.model.get('item').get('featureddescription');

                // To remove html tags
                div = document.createElement('div');
                div.innerHTML = descriptionField;
                descriptionText = div.innerText;

                return descriptionText;
            }
            return ret;
        }),
        getTitle: _.wrap(ProductDetailsFullView.prototype.getTitle, function getTitle(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            return ret || (this.model && this.model.get('item') && this.model.get('item').get('_pageTitle'));
        })
    });
});


define('SEOImprovements.FacetDisplay.View', [
    'Facets.FacetsDisplay.View',
    'underscore'
], function SEOImprovementsFacetDisplayView(
    FacetsFacetsDisplayView,
    _
) {
    'use strict';

    _.extend(FacetsFacetsDisplayView.prototype, {
        getContext: _.wrap(FacetsFacetsDisplayView.prototype.getContext, function fnFacetsFacetsDisplayViewPrototypeGetContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            var mainHeader = _('Searching');
            var first = false;
            var category = this.parentView && this.parentView.model &&
                this.parentView.model.get('category') &&
                this.parentView.model.get('category').get('name');
            if (category) {
                mainHeader += ((first ? ',' : '') + ' ' + _('in') + ' ' + category);
                first = true;
            }
            if (originalRet.values && originalRet.values.length) {
                mainHeader += ((first ? ',' : '') + ' ' + _('narrowed by') + ' ' +
                    _.map(originalRet.values, function fnValues(facet) { return facet.valueLabel; }).join(', '));
                first = true;
            }
            if (first) {
                originalRet.mainHeader = mainHeader;
            }
            return originalRet;
        })
    });
});


define('AwaLabs.SEOImprovements.Shopping', [
    'SC.Shopping.Configuration',
    'Configuration',
    'Utils',
    'SEOImprovements.Home.View',
    'SEOImprovements.PLP.View',
    'SEOImprovements.PDP.View'
], function SEOImprovements(
    SCShoppingConfiguration,
    Configuration,
    Utils
) {
    SCShoppingConfiguration.metaTagMappingOg['og:site_name'] = function ogSiteName() {
        return Configuration.get('siteTitle');
    };

    function seoImage(layout, number) {
        var $image = layout.$('[data-type="social-image"], [itemprop="image"], .product-details-image-gallery-container:not(.bx-clone) img:not(.zoomImg)');
        var myNumber = typeof number === 'undefined' ? 0 : number;
        // eslint-disable-next-line
        var resizedImage = $image.get(myNumber) ? $image.get(myNumber).src : (!myNumber ? Utils.getThemeAbsoluteUrlOfNonManagedResources('img/no_image_available.jpeg', Configuration.get.apply(Configuration, ['imageNotAvailable'])) : '');
        var patt = new RegExp('https?://');
        var imageUrl = resizedImage;

        if (!patt.exec(imageUrl) && resizedImage) {
            imageUrl = window.location.origin + encodeURI(resizedImage);
        }
        return imageUrl;
    }

    SCShoppingConfiguration.metaTagMappingOg['og:image'] = function ogImage(layout) {
        return seoImage(layout, 0);
    };
    SCShoppingConfiguration.metaTagMappingOg['twitter:image0:src'] = function ogImage(layout) {
        return seoImage(layout, 0);
    };
    SCShoppingConfiguration.metaTagMappingOg['twitter:image1:src'] = function ogImage(layout) {
        return seoImage(layout, 1);
    };
    SCShoppingConfiguration.metaTagMappingOg['twitter:image2:src'] = function ogImage(layout) {
        return seoImage(layout, 2);
    };
    SCShoppingConfiguration.metaTagMappingOg['twitter:image3:src'] = function ogImage(layout) {
        return seoImage(layout, 3);
    };

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var environmentComponent = application.getComponent('Environment');
            if (layout) {
                layout.addToViewContextDefinition('Header.Logo.View', 'logo', 'string', function fn() {
                    return environmentComponent.getConfig('header.logoUrl');
                });
                layout.addToViewContextDefinition('Header.Logo.View', 'name', 'string', function fn(context) {
                    return context.headerLinkTitle || environmentComponent.getConfig('seo.siteTitle');
                });
            }
        }
    };
});


};

extensions['AwaLabs.SocialMedia.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/SocialMedia/2.1.0/' + asset;
}

define('SocialMedia.View', [
    'SCView',
    'social-media.tpl'
], function SocialMediaViewModule(
    SCViewComponent,
    SocialMediaTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function SocialMediaView(options) {
        SCView.call(this);
        this.environment = options.environment;
        this.template = SocialMediaTpl;
    }

    SocialMediaView.prototype = Object.create(SCView.prototype);

    SocialMediaView.prototype.constructor = SocialMediaView;

    SocialMediaView.prototype.getContext = function getContext() {
        return {
            facebookUrl: this.environment.getConfig('socialmedia.facebookUrl'),
            linkedinUrl: this.environment.getConfig('socialmedia.linkedinUrl'),
            youtubeUrl: this.environment.getConfig('socialmedia.youtubeUrl'),
            twitterUrl: this.environment.getConfig('socialmedia.twitterUrl'),
            instagramUrl: this.environment.getConfig('socialmedia.instagramUrl'),
            googleUrl: this.environment.getConfig('socialmedia.googleUrl'),
            pinterestUrl: this.environment.getConfig('socialmedia.pinterestUrl')
        };
    };

    return SocialMediaView;
});


define('AwaLabs.SocialMedia', [
    'SocialMedia.View'
], function SocialMedia(
    SocialMediaView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'SocialMedia': {
                        'SocialMedia': {
                            childViewIndex: 1,
                            childViewConstructor: function socialMedia() {
                                return new SocialMediaView({
                                    environment: container.getComponent('Environment')
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});


};

extensions['SuiteLabs.SocialShareLanguage.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/SocialShareLanguage/1.0.0/' + asset;
}

define('SuiteLabs.SocialShareLanguage', [
    'underscore',
    'SocialSharing',
    'Utils'
], function SocialShareLanguage(
    _,
    SocialSharing,
    Utils
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var PDPView = application.getComponent('PDP');
            var Layout = application.getLayout();

            if (!Utils.isPageGenerator() && PDPView) {
                Layout.once('afterAppendView',function(view){
                    setTimeout(function(){
                        var $socialShare = view.$el.find('.social-sharing-flyout-icons')
                        if ($socialShare.length > 0) {
                            $socialShare.find('.social-sharing-flyout-content-social-pinterest > span').text(_.translate('Share on Pinterest'));
                            $socialShare.find('.social-sharing-flyout-content-social-facebook > span').text(_.translate('Share on Facebook'));
                            $socialShare.find('.social-sharing-flyout-content-social-twitter > span').text(_.translate('Share on X'));
                        }
                    }, 1);
                });
            }

        }

    };

});


};

extensions['AwaLabs.StickyHeader.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/StickyHeader/2.0.0/' + asset;
}

define('AwaLabs.StickyHeader', [
    'Header.View',
    'Profile.Model',
    'Header.Profile.View',
    'Header.Menu.MyAccount.View',
    'Handlebars',
    'jQuery'
], function AwaLabsStickyHeader(
    HeaderView,
    ProfileModel,
    HeaderProfileView,
    HeaderMenuMyAccountView,
    Handlebars,
    jQuery
) {
    'use strict';
    return {
        mountToApp: function mountToApp(container) {
            var Layout;
            /* eslint-disable no-underscore-dangle */
            if (container.layout) {
                Layout = container.getLayout();
                /* eslint-enable no-underscore-dangle */
                Layout.once('afterAppendView', function afterAppendView() {
                    jQuery(document).on('scroll', function stickyScroll() {
                        var $headerMainNavWrapper;
                        var $headerMainWrapper;
                        if (jQuery('html').hasClass('ns_is-edit')) {
                            return;
                        }

                        $headerMainNavWrapper = Layout.$('#site-header');
                        $headerMainWrapper = Layout.$('.header-main-wrapper');

                        $headerMainWrapper.css({
                            'minHeight': $headerMainWrapper.height()
                        });


                        if (jQuery(document).scrollTop() > 0) {
                            $headerMainNavWrapper.addClass('sticky-header');
                            $headerMainNavWrapper.next().addClass('less-padding');
                        } else {
                            $headerMainNavWrapper.removeClass('sticky-header');
                            $headerMainNavWrapper.next().removeClass('less-padding');
                        }
                    });
                });
            }
        }
    };
});


};

extensions['AwaLabs.StoreLocator.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/StoreLocator/2.0.0/' + asset;
}

define('StoreLocator.LocationInfo.View', [
    'Backbone',
    '_store_locator_location_info.tpl'
], function StoreLocatorLocationInfoView(
    Backbone,
    StoreLocatorLocatorDetailsTpl
) {
    'use strict';

    return Backbone.View.extend({

        template: StoreLocatorLocatorDetailsTpl,

        initialize: function initialize(options) {
            this.application = options.application;
            this.model = options.model;
        },

        getContext: function getContext() {
            console.log('model', this.model);
            return {
                model: this.model
            };
        }
    });
});


define('StoreLocator.LocationRoute.Model', [
    'Backbone'
], function StoreLocatorLocationRouteModel(
    Backbone
) {
    'use strict';

    return Backbone.Model.extend({
        toRouteParams: function toRouteParams() {
            var routeParams = {
                origin: {
                    query: this.get('origin')
                },
                destination: {
                    query: this.get('destination')
                },
                travelMode: this.get('mode')
            };
            return routeParams;
        }
    });
});


define('StoreLocator.LocationRoute.View', [
    'Backbone',
    '_store_locator_location_route.tpl',
    'jQuery',
    'underscore',
    'Utils'
], function StoreLocatorLocationRouteViewFn(
    Backbone,
    StoreLocatorLocationRouteTpl,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return Backbone.View.extend({

        template: StoreLocatorLocationRouteTpl,

        events: {
            'click [data-action="changeTravelMode"]': 'changeTravelMode',
            'click [data-action="getRoute"]': 'getRoute',
            'click [data-action="getCurrentLocation"]': 'getCurrentLocation',
            'click [data-action="print"]': 'print'
        },

        initialize: function initialize(options) {
            this.application = options.application;
            this.locationModel = options.locationModel;
            this.reference_map = options.reference_map;
            this.locationRouteModel = options.locationRouteModel;
            this.collection = options.collection;
        },
        print: function print() {
            window.print();
        },

        getOriginFullAddress: function getOriginFullAddress(locationModel) {
            var addr = [];
            addr.push(locationModel.get('address1'));
            if (locationModel.get('city')) {
                addr.push(locationModel.get('city'));
            }
            if (locationModel.get('state')) {
                addr.push(locationModel.get('state'));
            }
            if (locationModel.get('country')) {
                addr.push(locationModel.get('country'));
            }
            if (locationModel.get('zip')) {
                addr.push(locationModel.get('zip'));
            }
            return addr.join(', ');
        },

        showAutoCompleteInput: function showAutoCompleteInput(input) {
            if (input) {
                // eslint-disable-next-line no-undef
                this.autocomplete = new google.maps.places.SearchBox(input);
                // eslint-disable-next-line no-undef
                google.maps.event.addListener(this.autocomplete, 'places_changed', _.bind(this.placesChanged, this));
            }
        },
        placesChanged: function placesChanged() {
            var place = this.autocomplete && this.autocomplete.getPlaces() &&
                this.autocomplete.getPlaces()[0];
            if (!place || _.size(place) === 0) {
                console.warn('Autocomplete returned place contains no geometry');
                return;
            }

            if (!place.geometry) {
                console.warn('Autocomplete returned place contains no geometry');
                return;
            }
            this.setFromRoute(place.formatted_address);
            this.getRoute();
        },

        setFromRoute: function setFromRoute(address, isFromGeoLocation) {
            this.locationRouteModel.set('origin', address);
            if (isFromGeoLocation) {
                this.$('[name="route-from"]').val(address);
            }
        },

        changeTravelMode: function changeTravelMode(e) {
            this.locationRouteModel.set('mode', jQuery(e.target).data('mode'));
            this.render();
        },
        validateRouteModel: function validateRouteModel() {
            return this.locationRouteModel.get('mode') &&
                this.locationRouteModel.get('origin') &&
                this.locationRouteModel.get('destination');
        },
        getRoute: function getRoute(e) {
            // eslint-disable-next-line no-undef
            var directionsService = new google.maps.DirectionsService();
            // eslint-disable-next-line no-undef
            var directionsRenderer = new google.maps.DirectionsRenderer();
            var routeParams;
            var leg;
            var self = this;
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (this.validateRouteModel()) {
                directionsRenderer.setMap(this.reference_map.map);
                routeParams = this.locationRouteModel.toRouteParams();
                directionsService.route(routeParams, function handleResponse(response, status) {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(response);
                        leg = response.routes &&
                            response.routes[0] &&
                            response.routes[0].legs &&
                            response.routes[0].legs[0];
                        if (leg) {
                            self.locationRouteModel.set('leg', leg);
                        }
                    } else {
                        self.showError(Utils.translate('No result for this params'));
                    }
                });
            }
        },

        getCurrentLocation: function getCurrentLocation(e) {
            var promise = this.useCurrentLocation();
            var self = this;
            e.preventDefault();
            promise.done(function doneFn(formattedAddress) {
                self.setFromRoute(formattedAddress, true);
                self.locationRouteModel.set('allowCurrentLocation', true);
                self.getRoute();
            });
        },

        useCurrentLocation: function useCurrentLocation() {
            var self = this;
            var promise = jQuery.Deferred();
            var latLng;
            // eslint-disable-next-line no-undef
            var geoCoder = new google.maps.Geocoder();
            var city;
            var formattedAddress;
            navigator.geolocation.getCurrentPosition(
                function doneCallback(position) {
                    latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
                    geoCoder.geocode({ location: latLng }, function handleLocationResult(results, status) {
                        // eslint-disable-next-line no-undef
                        if (status === google.maps.GeocoderStatus.OK) {
                            city = _(results).find(function findFn(result) {
                                return !_.indexOf(result.types, 'locality');
                            });
                            if (city) {
                                formattedAddress = city.formatted_address;
                            } else {
                                formattedAddress = results[0].formatted_address;
                            }
                            promise.resolveWith(self, [formattedAddress]);
                        }
                    });
                },
                function errorCallBack() {
                    promise.rejectWith(self, arguments);
                    self.locationRouteModel('allowCurrentLocation', false);
                }
            );
            return promise;
        },

        render: function render() {
            var self = this;
            this._render();
            this.$input = this.$('[data-type="autocomplete-input-route"]');
            this.reference_map.load().done(function donFn() {
                self.showAutoCompleteInput(self.$input.get(0));
                self.setDataInForm();
            });
            return this;
        },

        setDataInForm: function setDataInForm() {
            this.$('[name="route-from"]').val(this.locationRouteModel.get('origin'));
            if (!this.locationRouteModel.get('destination')) {
                this.locationRouteModel.set('destination', this.getOriginFullAddress(this.locationModel));
            }
            if (!this.locationRouteModel.get('mode')) {
                this.locationRouteModel.set('mode', 'DRIVING');
            }
        },

        getContext: function getContext() {
            return {
                model: this.locationRouteModel,
                isDRIVING: this.locationRouteModel.get('mode') === 'DRIVING' || !this.locationRouteModel.get('mode'),
                isWALKING: this.locationRouteModel.get('mode') === 'WALKING',
                isBICYCLING: this.locationRouteModel.get('mode') === 'BICYCLING',
                isTRANSIT: this.locationRouteModel.get('mode') === 'TRANSIT'
            };
        }
    });
});


define('StoreLocator.LocationSteps.View', [
    'Backbone',
    '_store_locator_location_steps.tpl',
    'underscore'
], function StoreLocatorLocationStepsView(
    Backbone,
    StoreLocatorLocationStepsTpl,
    _
) {
    'use strict';

    return Backbone.View.extend({

        template: StoreLocatorLocationStepsTpl,

        initialize: function initialize(options) {
            this.application = options.application;
            this.locationRouteModel = options.locationRouteModel;
            this.locationRouteModel.on('change:leg', _.bind(this.render, this));
        },

        getContext: function getContext() {
            return {
                locationRouteModel: this.locationRouteModel,
                hasSteps: this.locationRouteModel.get('leg') &&
                    this.locationRouteModel.get('leg').steps &&
                    this.locationRouteModel.get('leg').steps.length > 0
            };
        }
    });
});


define('StoreLocator.StoreLocator.List.All.Store.View', [
    'underscore',
    'StoreLocator.List.All.Store.View'
], function StoreLocatorListAllStoreViewFn(
    _,
    StoreLocatorListAllStoreView
) {
    'use strict';

    _.extend(StoreLocatorListAllStoreView.prototype, {
        getContext: _.wrap(StoreLocatorListAllStoreView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            originalRet.urlcomponent = this.model.get('urlcomponent');
            return originalRet;
        })
    });
});


define('StoreLocator.StoreLocator.Details.View', [
    'StoreLocator.Details.View',
    'underscore',
    'AjaxRequestsKiller',
    'StoreLocator.LocationRoute.Model',
    'StoreLocator.LocationInfo.View',
    'StoreLocator.LocationRoute.View',
    'StoreLocator.LocationSteps.View',
    'Utils'
], function StoreLocatorStoreLocatorDetailsView(
    StoreLocatorDetailsView,
    _,
    AjaxRequestsKiller,
    StoreLocatorLocationRouteModel,
    StoreLocatorLocationInfoView,
    StoreLocatorLocationRouteView,
    StoreLocatorLocationStepsView,
    Utils
) {
    'use strict';


    _.extend(StoreLocatorDetailsView.prototype, {
        initialize: _.wrap(StoreLocatorDetailsView.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.locationRouteModel = new StoreLocatorLocationRouteModel();
        }),
        getBreadcrumbPages: function getBreadcrumbPages() {
            var breadCrumbs = [];
            breadCrumbs.push({
                text: Utils.translate('Stores'),
                href: '/storelist'
            });
            breadCrumbs.push({
                text: this.model.get('name'),
                href: '/stores/' + this.model.get('urlcomponent')
            });
            return breadCrumbs;
        },
        beforeShowContent: function beforeShowContent() {
            var urlcomponent = this.routerArguments[0];
            return this.model.fetch({
                data: {
                    urlcomponent: urlcomponent
                },
                killerId: AjaxRequestsKiller.getKillerId()
            });
        },
        childViews: _.extend(StoreLocatorDetailsView.prototype.childViews, {
            'StoreLocationInfo': function StoreLocationInfoCustom() {
                return new StoreLocatorLocationInfoView({
                    application: this.application,
                    model: this.model
                });
            },
            'StoreLocationRoute': function StoreLocationInfoCustom() {
                return new StoreLocatorLocationRouteView({
                    application: this.application,
                    locationModel: this.model,
                    locationRouteModel: this.locationRouteModel,
                    reference_map: this.reference_map,
                    collection: this.collection
                });
            },
            'StoreLocationSteps': function StoreLocationStepsCustom() {
                return new StoreLocatorLocationStepsView({
                    application: this.application,
                    locationRouteModel: this.locationRouteModel,
                    reference_map: this.reference_map
                });
            }
        })
    });
});


define('StoreLocator.Search.View.BoundsFix', [
    'StoreLocator.Map.View',
    'underscore'
], function StoreLocatorSearchViewBoundsFix(
    StoreLocatorMapView,
    _
) {
    'use strict';

    _.extend(StoreLocatorMapView.prototype, {
        updateMap: function updateMap() {
            var position = this.reference_map.getPosition();
            var self = this;

            this.reference_map.clearPointList(this.map);

            if (position && _.size(position) && !position.refineSearch) {
                this.reference_map.showMyPosition(position, this.map);
            } else {
                this.reference_map.centerMapToDefault(this.map);
            }

            if (this.collection.length) {
                this.reference_map.showPointList(this.collection, this.map);
                _.delay(function deferBounds() {
                    self.reference_map.fitBounds(self.map);
                }, 500);
            }
        }
    });
});


define('AwaLabs.StoreLocator', [
    'Utils',
    'ReferenceMap.Configuration',
    'StoreLocator.Upgrade.View',
    'ReferenceMap',
    'StoreLocator.List.All.View',
    'StoreLocator.Details.View',
    'ErrorManagement.PageNotFound.View',
    'StoreLocator.Search.View.BoundsFix',
    'StoreLocator.StoreLocator.Details.View',
    'StoreLocator.StoreLocator.List.All.Store.View'
], function AwaLabsStoreLocator(
    Utils,
    ReferenceConfiguration,
    StoreLocatorUpgradeView,
    ReferenceMap,
    StoreLocatorListAllView,
    StoreLocatorDetailsView,
    ErrorManagementPageNotFoundView
) {
    'use strict';


    return {
        mountToApp: function mountToApp(application) {
            var pageType = application.getComponent('PageType');
            var referenceMap = new ReferenceMap();
            if (ReferenceConfiguration.isEnabled() && window.location.protocol === 'https:') {
                if (Utils.oldIE(8)) {
                    // remove previous route
                    pageType.registerPageType({
                        name: 'StoreLocatorUpgrade',
                        routes: ['stores', 'stores/details/:id', 'stores/all', 'stores/all?:options'],
                        view: ErrorManagementPageNotFoundView,
                        defaultTemplate: {
                            name: 'store_locator_upgrade.tpl',
                            displayName: 'Browser Upgrade',
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                '/path/to/store_locator_upgrade_tpl.png'
                            )
                        }
                    });
                    // add new route
                    pageType.registerPageType({
                        name: 'StoreLocatorUpgrade',
                        routes: ['stores', 'stores/:id', 'storelist', 'storelist?:options'],
                        view: StoreLocatorUpgradeView,
                        defaultTemplate: {
                            name: 'store_locator_upgrade.tpl',
                            displayName: 'Browser Upgrade',
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                '/path/to/store_locator_upgrade_tpl.png'
                            )
                        }
                    });
                } else {
                    // remove previous route
                    pageType.registerPageType({
                        name: 'StoreLocatorListAll',
                        routes: ['stores/all', 'stores/all?:options'],
                        view: ErrorManagementPageNotFoundView,
                        defaultTemplate: {
                            name: 'store_locator_list_all.tpl',
                            displayName: ReferenceConfiguration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-list.png'
                            )
                        }
                    });
                    // add new route
                    pageType.registerPageType({
                        name: 'StoreLocatorListAll',
                        routes: ['storelist', 'storelist?:options'],
                        view: StoreLocatorListAllView,
                        defaultTemplate: {
                            name: 'store_locator_list_all.tpl',
                            displayName: ReferenceConfiguration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-list.png'
                            )
                        }
                    });
                    // remove previous route
                    pageType.registerPageType({
                        name: 'StoreLocatorDetails',
                        routes: ['stores/details/:id'],
                        view: ErrorManagementPageNotFoundView,
                        defaultTemplate: {
                            name: 'store_locator_details.tpl',
                            displayName: referenceMap.configuration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-details.png'
                            )
                        }
                    });
                    // add new route
                    pageType.registerPageType({
                        name: 'StoreLocatorDetails',
                        routes: ['stores/:id'],
                        view: StoreLocatorDetailsView,
                        defaultTemplate: {
                            name: 'store_locator_details.tpl',
                            displayName: referenceMap.configuration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-details.png'
                            )
                        }
                    });
                }
            }
        }
    };
});


};

extensions['AwaLabs.Trade.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Trade/2.1.0/' + asset;
}

define('AwaLabs.Trade', [
    'Profile.Model',
    'MyAccountMenu',
    'Dialog.Service',
    'Profile.Model.HidePrices'
], function AwaLabsTrade(
    ProfileModel,
    MyAccountMenu,
    DialogService
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container, showContactAndTradingInfo) {
            var checkout = container.getComponent('Checkout');
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();

            if (checkout) {
                checkout.on('afterShowContent', function beforeShowContent() {
                    checkout.getCurrentStep().done(function getCurrentStepDone(currentStep) {
                        if (currentStep && currentStep.url === 'shipping/address' && profile && profile.get('isPendingTradeApproval')) {
                            new DialogService(container).openDialog('Pending Trade Approval - Checkout');
                        }
                    });
                });
            }

            if (layout) {
                layout.addToViewContextDefinition('Header.Menu.MyAccount.View', showContactAndTradingInfo || 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade') && (!showContactAndTradingInfo || !!profile.get('contactId'));
                });

                layout.addToViewContextDefinition('Header.Menu.View', 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade');
                });
            }

            if (!profile.get('isTrade')) {
                MyAccountMenu.getInstance().removeSubEntry('quotes');
            }
        }
    };
});


define('Profile.Model.HidePrices', [
    'Profile.Model',
    'underscore'
], function ProfileModelHidePrices(
    ProfileModel,
    _
) {
    _.extend(ProfileModel.prototype, {
        hidePrices: _.wrap(ProfileModel.prototype.hidePrices, function hidePrices(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var customfields = this.get('customfields');
            var pricingDisabled = customfields && _.findWhere(customfields, {
                name: 'custentity_pricing_disabled'
            });
            var disabled = pricingDisabled && pricingDisabled.value === 'T';

            return disabled || ret;
        })
    });
});


define('Trade.Link.View', [
    'trade_link_view.tpl',
    'SCView',
    'Backbone'
], function TradeLinkViewModule(
    TradeLinkViewTpl,
    SCViewComponent,
    Backbone
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function TradeLinkView(options) {
        SCView.call(this);

        this.options = options || {};
        this.environment = options.environment;
        this.template = TradeLinkViewTpl;
    }

    TradeLinkView.prototype = Object.create(SCView.prototype);

    TradeLinkView.prototype.constructor = TradeLinkView;

    TradeLinkView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="trade-signin"]': 'tradeSignIn',
            'click [data-action="trade-apply"]': 'tradeApply'
        };
    };

    TradeLinkView.prototype.render = function render() {
        if (!this.options.profile || !(this.options.profile.get('isLoggedIn') === 'T')) {
            SCView.prototype.render.apply(this, arguments);
        }
    };

    TradeLinkView.prototype.tradeSignIn = function tradeSignIn() {
        var login = this.environment.getSiteSetting('touchpoints.login');
        var loginUrl = this.generateUrl(login);

        window.location.href = loginUrl;
    };

    TradeLinkView.prototype.tradeApply = function tradeApply() {
        var login = this.environment.getSiteSetting('touchpoints.login');
        var loginUrl = this.generateUrl(login);

        window.location.href = loginUrl + '&fragment=register-trade';
    };

    TradeLinkView.prototype.generateUrl = function generateUrl(touchpoint) {
        var origin = this.environment.getConfig('currentTouchpoint');
        var hash = Backbone.history.fragment;
        var loginUrl = touchpoint + '&origin=' + origin + '&origin_hash=' + encodeURIComponent(hash);

        return loginUrl;
    };

    TradeLinkView.prototype.getContext = function getContext() {
        return {};
    };

    return TradeLinkView;
});


define('AwaLabs.Trade.Shopping', [
    'AwaLabs.Trade',
    'Trade.Link.View',
    'Profile.Model',
    'Profile.Model.HidePrices'
], function AwaLabsTradeShopping(
    AwaLabsTrade,
    TradeLinkView,
    ProfileModel
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');
            var profile = ProfileModel.getInstance();
            var tradeLinkView;

            if (cart) {
                cart.addToViewContextDefinition('Cart.Item.Actions.View', 'isTrade', 'boolean', function isTrade() {
                    return profile.get('isTrade');
                });

                cart.addToViewContextDefinition('Cart.Detailed.View', 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade');
                });
            }

            if (pdp) {
                tradeLinkView = {
                    'Product.Price': {
                        'Trade.Link.View': {
                            childViewConstructor: function TradeLinkChildView() {
                                return new TradeLinkView({
                                    environment: environment,
                                    profile: profile
                                });
                            }
                        }
                    }
                };

                pdp.addToViewContextDefinition('ProductDetails.Full.View', 'isTrade', 'boolean', function isTrade() {
                    return profile.get('isTrade');
                });

                pdp.addChildViews(pdp.PDP_FULL_VIEW, tradeLinkView);
                pdp.addChildViews(pdp.PDP_QUICK_VIEW, tradeLinkView);
            }

            if (layout) {
                layout.addToViewContextDefinition('ProductLine.Stock.View', 'showInStockMessage', 'boolean', function showInStockMessage(context) {
                    return profile.get('isTrade') && context.stockInfo.isInStock && profile.get('isLoggedIn') === 'T';
                });

                layout.addToViewContextDefinition('ProductLine.Stock.View', 'showOutOfStockMessage', 'boolean', function showOutOfStockMessage(context) {
                    return !profile.get('isTrade') && !context.stockInfo.isInStock;
                });
            }
            AwaLabsTrade.mountToApp(container, 'showContactAndTradingInfo');
        }
    };
});


};

extensions['SuiteLabs.WasPrice.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/WasPrice/1.0.0/' + asset;
}


define('WasPrice.View', [
    'SCView',
    'was_price_view.tpl',
    'Item.Model',
    'underscore'
], function WasPriceViewModule(
    SCViewComponent,
    WasPriceTpl,
    ItemModel,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function WasPriceView(options) {
        SCView.call(this);
        this.template = WasPriceTpl;
        this.targetComponent = options.targetComponent;
        this.contextDataRequest = ['item'];
    }

    WasPriceView.prototype = Object.create(SCView.prototype);

    WasPriceView.prototype.constructor = WasPriceView;

    WasPriceView.prototype.getContext = function getContext() {
        var item = this.contextData.item && this.contextData.item();
        var wasPrice = item.custitemwasprice;
        var wasPriceFormatted = item.custitemwasprice_formatted;
        var priceObject = this.targetComponent.getPrice
            && _.isFunction(this.targetComponent.getPrice)
            ? this.targetComponent.getPrice()
            : new ItemModel(item).getPrice();
        var showWasPrice;

        if (priceObject &&
            priceObject.price &&
            wasPrice &&
            wasPriceFormatted
        ) {
            showWasPrice = wasPrice > priceObject.price;
        }

        return {
            showWasPrice: showWasPrice,
            wasPrice: wasPrice,
            wasPriceFormatted: wasPriceFormatted
        };
    };

    return WasPriceView;
});


define('SuiteLabs.WasPrice', [
    'WasPrice.View'
], function SuiteLabsWasPrice(
    WasPriceView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var PDP = container.getComponent('PDP');
            var PLP = container.getComponent('PLP');
            var pdpChildView = {
                'Product.Price': {
                    'WasPriceView': {
                        childViewIndex: 1,
                        childViewConstructor: function WasPriceChildView() {
                            return new WasPriceView({ targetComponent: PDP });
                        }
                    }
                }
            };
            var plpChildView = {
                'Cart.QuickAddToCart': {
                    'WasPriceView': {
                        childViewIndex: 1,
                        childViewConstructor: function WasPriceChildView() {
                            return new WasPriceView({ targetComponent: PLP });
                        }
                    }
                }
            };

            PDP.addChildViews(PDP.PDP_FULL_VIEW, pdpChildView);
            PDP.addChildViews(PDP.PDP_QUICK_VIEW, pdpChildView);
            PLP.addChildViews(PLP.PLP_VIEW, plpChildView);
        }
    };
});


};

SC.ENVIRONMENT.EXTENSIONS_JS_MODULE_NAMES = ["AssamblyInstructions.View","AssamblyInstructions.Modal.View","FileUpload.File.Collection","FileUpload.File.Model","FileUpload.File.Thumbnail.View","FileUpload.File.View","BackInStockNotification.PDP.View","InventoryDisplay.PDP.View","BackInStockNotification.StockNotifications.Subscription.Create.View","BulbUpsell.View","CartToQuote.Model","CartToQuote.View","CartToQuote.Utils","CartToQuote.RequestQuoteWizard.Module.Items","CartToQuote.RequestQuoteWizard.Module.Items.Line.Action.View","CartToQuote.RequestQuoteWizard","CartToQuote.ProductList.DetailsLater.View","CartToQuote.MarketWizard.View","CartToQuote.ProductList.Item.Model","CartToQuote.RequestQuoteWizard.View","CartToQuote.ProductDetailToQuote.View","CartToQuote.Module.Items.Line.Quantity.View","ContactUsLoggedIn.Page.View","Dialog.View","Dialog.Service","SuiteLabs.DynamicHeight.Main","MerchandisingZoneSliders","SuiteLabs.ExcludeFromSEO.Facets.Browse.View","FacetsSettings.Facets","FavoritesList.ProductList.Utils","FavoritesList.ProductList.Details.View","Project.ProductList.Lists.View","FavoritesList.AddedToCart.Improved.View","FavoritesList.BulkActions.Extended.View","FavoritesList.ControlSingle.View","ShareFavorites.Model","FavoritesList.CartSaveForLater.View","FavoritesList.ProductList.DetailsLater.View","FavoritesList.ProductList.Control.View","FavoritesList.ProductList.DisplayFull.View","Header.MiniFavorites.View","Header.MiniFavoritesItemCell.View","Header.MiniProjects.View","Header.MiniProjectsItemCell.View","Favorites.ProductList.Details.View","FavoritesList.ProductList.Model","FavoritesList.ProductList.ControlItem.View","FavoritesList.RequestQuoteWizard.Module.Items","FooterCopyright.View","HeaderCustomizations.Header.View","HeaderCustomizations.MyAccount.Menu","HorizontalFacets.Facets.Browse.View","HorizontalFacets.Facets.Horizontal.View","HorizontalFacets.Facets.FacetedNavigation.View","HorizontalFacets.Facets.FacetedNavigationItem.View","ImageSwitcher.Facets.ItemCell.View","Session.Message","InactivityMessage.Model","InactivityMessage.ProfileModel","ItemOptions.Utils","ItemSearchAutoAdd.ItemSearcher.View","ItemSearchAutoAdd.QuickAdd.View","ItemSearchAutoAdd.Product.Model","Jewelry.Utils","OrderWizard.Module.Confirmation.Jewelry","Tavano.Klaviyo.Cart.Sync","Tavano.Klaviyo.ProductView.Sync","Tavano.Klaviyo.LoaderSync","Tavano.Klaviyo.Checkout.Sync","Tavano.Klaviyo.Order.Sync","Tavano.Klaviyo.Profile.Sync","Tavano.Klaviyo.AddOrderSource.Checkout","Tavano.Klaviyo.Checkout.Sync.Checkout","Tavano.Klaviyo.Klaviyo.Checkout","Tavano.Klaviyo.LoaderSync.Checkout","Tavano.Klaviyo.OrderSource.View","Tavano.Klaviyo.Profile.Sync.Checkout","Tavano.Klaviyo.Profile.Model","Tavano.Klaviyo.Checkout.Profile.Model","Tavano.Klaviyo.KlaviyoProfile.Model","SuiteLabs.OuterCSS.Checkout","SuiteLabs.OuterCSS.MyAccount","SuiteLabs.OuterCSS.Helper","PDFGenerator.View",["N/search","N/file","N/render","N/record","N/commerce/recordView"],"PDPCustomField.View","PDPCustomField.FutureAvailability.View","PDPCustomField.Vectary3dModel.View","PDPCustomField.RomanceDescription.View","PDPCustomField.Stock.Messaging.View","PDPCustomField.Base.View","PLPCellContent.View","PriceToggle.Item.Model","fitVids","Header.Profile.View.RedirectAfterLogin","SchemaOrg.Breadcrumb","SchemaOrg.Organization","SchemaOrg.Product","SchemaOrg.ProductList","SchemaOrg.BaseModule","SchemaOrg.RelatedItems","SchemaOrg.CorrelatedItems","SchemaOrg.ItemRelations","Facets.Browse.View.FixMetaDescription","CMSadapter.Impl.Enhanced.OpenGraph.Fix","SEOImprovements.Home.View","SEOImprovements.PLP.View","SEOImprovements.PDP.View","SEOImprovements.FacetDisplay.View","SocialMedia.View","StoreLocator.LocationInfo.View","StoreLocator.LocationRoute.Model","StoreLocator.LocationRoute.View","StoreLocator.LocationSteps.View","StoreLocator.StoreLocator.List.All.Store.View","StoreLocator.StoreLocator.Details.View","StoreLocator.Search.View.BoundsFix","AwaLabs.Trade","Profile.Model.HidePrices","Trade.Link.View","WasPrice.View"];
try{
	extensions['AwaLabs.AssamblyInstructions.2.0.1']();
	SC.addExtensionModule('AwaLabs.AssamblyInstructions');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.AutoSlider.2.1.0']();
	SC.addExtensionModule('AwaLabs.AutoSlider');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.AwaFileUpload.2.1.0']();
	SC.addExtensionModule('AwaLabs.FileUpload');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.BackInStockNotification.2.0.1']();
	SC.addExtensionModule('AwaLabs.BackInStockNotification');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.BulbUpsell.2.1.1']();
	SC.addExtensionModule('AwaLabs.BulbUpsell.Shopping');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.CartAvailabilityBISDate.1.0.0']();
	SC.addExtensionModule('CartAvailabilityBISDate');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.CartToQuote.2.1.0']();
	SC.addExtensionModule('AwaLabs.CartToQuote.Shopping');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.CategoriesCustomSort.2.1.0']();
	SC.addExtensionModule('CategoriesCustomSort');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.CategoriesFacetsDisplayFeature.1.1.0']();
	SC.addExtensionModule('AwaLabs.CategoriesFacetsDisplayFeature');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.ContactUsLoggedIn.2.1.0']();
	SC.addExtensionModule('AwaLabs.ContactUsLoggedIn.Shopping');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.DeliveryInstructions.2.1.0']();
	SC.addExtensionModule('AwaLabs.DeliveryInstructions.Shopping.EntryPoint');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Dialog.2.0.0']();
	SC.addExtensionModule('AwaLabs.Dialog');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.DynamicHeight.1.0.0']();
	SC.addExtensionModule('DynamicHeight.Facets.Browse.View');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.DynamicMerchandisingZones.2.0.0']();
	SC.addExtensionModule('AwaLabs.DynamicMerchandisingZones');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.ExcludeFromSEO.1.0.0']();
	SC.addExtensionModule('SuiteLabs.ExcludeFromSEO.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.FacetsSettings.2.1.0']();
	SC.addExtensionModule('AwaLabs.FacetsSettings');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Favicon.2.0.0']();
	SC.addExtensionModule('AwaLabs.Favicon');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.FavoritesList.2.1.0']();
	SC.addExtensionModule('AwaLabs.FavoritesList');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.FooterCopyright.2.1.0']();
	SC.addExtensionModule('AwaLabs.FooterCopyright');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.Foursixty.1.0.0']();
	SC.addExtensionModule('SuiteLabs.Foursixty');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.GeoIPLocation.2.1.0']();
	SC.addExtensionModule('AwaLabs.GeoIpLocation');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.HeadContentByApplication.2.1.0']();
	SC.addExtensionModule('AwaLabs.HeadContentByApplication');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.HeaderCustomizations.2.0.0']();
	SC.addExtensionModule('AwaLabs.HeaderCustomizations');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.HideSections.1.0.0']();
	SC.addExtensionModule('AwaLabs.HideSections.Shopping');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.HorizontalFacets.1.0.0']();
	SC.addExtensionModule('SuiteLabs.HorizontalFacets.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.ImageSwitcher.1.0.0']();
	SC.addExtensionModule('SuiteLabs.ImageSwitcher.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.InactivityMessage.2.1.0']();
	SC.addExtensionModule('AwaLabs.Inactivity.Message');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.InventoryDisplayFix.2.0.1']();
	SC.addExtensionModule('AwaLabs.InventoryDisplayFix');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.ItemOptions.2.0.0']();
	SC.addExtensionModule('AwaLabs.ItemOptions');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.ItemSearchAutoAdd.2.1.0']();
	SC.addExtensionModule('AwaLabs.ItemSearchAutoAdd');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Jewelry.2.1.1']();
	SC.addExtensionModule('AwaLabs.Jewelry');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['Tavano.Klaviyo.3.0.7']();
	SC.addExtensionModule('Tavano.Klaviyo.Klaviyo');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.LayoutClass.2.0.0']();
	SC.addExtensionModule('AwaLabs.LayoutClass');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.OrderStatusImprovements.2.0.0']();
	SC.addExtensionModule('AwaLabs.OrderStatusImprovements');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.OrderStatusImprovementsHandlebarsExtras.2.0.0']();
	SC.addExtensionModule('AwaLabs.OrderStatusImprovementsHandlebarsExtras');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.OuterCSS.1.0.0']();
	SC.addExtensionModule('SuiteLabs.OuterCSS.Shopping');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.PDFGenerator.1.0.1']();
	SC.addExtensionModule('SuiteLabs.PDFGenerator');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.PDPCustomFields.2.2.0']();
	SC.addExtensionModule('AwaLabs.PDPCustomFields');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.PLPCellContent.1.0.0']();
	SC.addExtensionModule('SuiteLabs.PLPCellContent.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.PLPColorRelations.2.0.0']();
	SC.addExtensionModule('AwaLabs.PLPColorRelations');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.PriceToggle.2.1.1']();
	SC.addExtensionModule('AwaLabs.PriceToggle');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.ProductGalleryAddons.2.0.0']();
	SC.addExtensionModule('AwaLabs.ProductGalleryAddons');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.ProfileUtils.2.0.1']();
	SC.addExtensionModule('AwaLabs.ProfileUtils');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.RedirectAfterLogin.1.0.0']();
	SC.addExtensionModule('SuiteLabs.RedirectAfterLogin.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.SchemaOrg.2.1.0']();
	SC.addExtensionModule('AwaLabs.SchemaOrg');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.SEOEnhancements.1.0.4']();
	SC.addExtensionModule('SuiteLabs.SEOEnhancements.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.SEOImprovements.2.0.0']();
	SC.addExtensionModule('AwaLabs.SEOImprovements.Shopping');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.SocialMedia.2.1.0']();
	SC.addExtensionModule('AwaLabs.SocialMedia');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.SocialShareLanguage.1.0.0']();
	SC.addExtensionModule('SuiteLabs.SocialShareLanguage');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.StickyHeader.2.0.0']();
	SC.addExtensionModule('AwaLabs.StickyHeader');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.StoreLocator.2.0.0']();
	SC.addExtensionModule('AwaLabs.StoreLocator');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Trade.2.1.0']();
	SC.addExtensionModule('AwaLabs.Trade.Shopping');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.WasPrice.1.0.0']();
	SC.addExtensionModule('SuiteLabs.WasPrice');
}
catch(error)
{
	console.error(error);
}

