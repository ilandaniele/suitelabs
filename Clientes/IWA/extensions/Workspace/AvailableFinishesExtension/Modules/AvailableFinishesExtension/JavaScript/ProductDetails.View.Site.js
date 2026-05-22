/* eslint-disable */
define( 'ProductDetails.View.Site', [
    'ProductDetails.Full.View', 'ItemRelations.Finishes.View', 'jQuery', 'underscore' , 'Utils'
], function ( ProductDetailsFullView, ItemRelationsFinishesView, jQuery, _, Utils ) {
    'use strict';



    ProductDetailsFullView.prototype.childViews = _.extend( ProductDetailsFullView.prototype.childViews, {

        'Finishes.Related.View': function ( options ) {

            return new ItemRelationsFinishesView( {

                parentItemId: this.model.get( 'item' ).get( 'internalid' ),

                application: this.application

            } );
        }

    } )


    return {
        mountToApp: function mountToApp() {
            
            
            
            ProductDetailsFullView.prototype.installPlugin( 'postContext', {
                name: 'productDetailsSiteContext',
                priority: 10,
                execute: function execute( context ) {
                    var item = context.model.attributes.item;
                    var isMobileDevice = Utils.isPhoneDevice();
                    _.extend( context, {
                        backorder: item.get( 'custitemstockstatus' ) === "On Backorder",
                        instockdate: item.get( 'custitem25' ),
                        stockleadtime: item.get( 'custitemstockleadtimes' ),
                        shipping: item.get( 'custitemship_method_web' ),
                        couponcode: item.get( 'custitem75' ),
                        atf: item.get( 'custitematf' ),
                        cutoffdate: item.get( 'custitemcutoff_date' ),
                        itemId: item.id,
                        urlComponent: item.get( 'urlcomponent' ),
                        showImageStock: ( item.get( 'custitemstockstatus' ) == "In Stock" || item.get( 'custitemstockstatus' ) == "Preorder" || item.get( 'custitemstockstatus' ) == "Low Inventory" ) ? true : false,
                        headerCouponCode: item.get('custitem_header_coupon_code'),
                        itemid: item.get('itemid'),
                        brand: item.get('custitem84'),
                        isMobileDevice: isMobileDevice
                    } );
                }
            } );
        }
    };
} );
