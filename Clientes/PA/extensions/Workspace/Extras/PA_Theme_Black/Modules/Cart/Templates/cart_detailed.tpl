<div class="cart-detailed">
	<div class="cart-detailed-view-header">
		<header class="cart-detailed-header">
			{{#if showLines}}
			<h1 class="cart-detailed-title">
				{{pageHeader}}
				<small class="cart-detailed-title-details-count">
					{{productsAndItemsCount}}
				</small>
			</h1>
			{{else}}
				<h2 class="cart-detailed-title">{{translate 'Your Shopping Cart is empty'}}</h2>
			{{/if}}
		</header>
	</div>

	{{!-- <div class="cart-special-info">
		<p class="cart-special-info-message">
			<i class="cart-special-info-icon"></i>
			Items in your cart may still be purchased by other customers until checkout is complete. They are not allocated to your order until payment is processed.
		</p>
	</div> --}}

	<div data-cms-area="cart_detailed_cms_area_1" data-cms-area-filters="path"></div>

	<div class="cart-detailed-body">
		{{#if itemsNotAllocatedMessage}}
		<p id="special-cart-message">
			<i class="fa fa-info-circle" aria-hidden="true"></i> {{{itemsNotAllocatedMessage}}}
		</p>
		{{/if}}
		<section class="{{#if showLines}}cart-detailed-left {{else}}cart-detailed-empty{{/if}}">
			{{#unless showLines}}
				<div data-view="Quick.Order.EmptyCart">
					<p class="cart-detailed-body-info">
						{{translate 'Continue Shopping on our <a href="/" data-touchpoint="home">Home Page</a>.' }}
					</p>
				</div>
			{{/unless}}

			<div data-view="Quick.Order"></div>

			{{#if showLines}}
			<div class="cart-detailed-proceed-to-checkout-container">
				<a class="{{#if prevent_checkout}}cart-summary-inventory-validation-messages item-details-message-head{{else}}cart-detailed-proceed-to-checkout{{/if}}" {{#unless prevent_checkout}}href="#" data-touchpoint="checkout" data-hashtag="#"{{/unless}}>
					{{#if prevent_checkout}}
						{{{prevent_checkout_message}}}
					{{else}}
						{{translate 'Proceed to Checkout'}}
					{{/if}}
				</a>
				<!-- START: Addition of Norton Shopping Guarantee Block -->	
				<div class="norton-guarantee-container">	
					<span id="_GUARANTEE_Kicker" name="_GUARANTEE_Kicker" type="Kicker Custom 4"></span>	
				</div>	
				<!-- END: Addition of Norton Shopping Guarantee Block -->
			</div>
			<div data-confirm-message class="cart-detailed-confirm-message"></div>

			<div class="cart-detailed-item-view-cell-actionable-table cart-detailed-table-row-with-border">
				<div data-view="Item.ListNavigable">
				</div>
			</div>

			<div class="cart-detailed-item-free-info" data-view="FreeGift.Info"></div>
			<div class="cart-detailed-item-free" data-view="Item.FreeGift"></div>
			{{/if}}

			<div data-cms-area="cart_detailed_cms_area_2" data-cms-area-filters="path"></div>
		</section>

		{{#if showLines}}
		<section class="cart-detailed-right">
			<div data-view="Cart.Summary"></div>
			{{#if multiShipmentText}}
			<div class="cart-detailed-multi-shipment-text">{{{multiShipmentText}}}</div>
			{{/if}}
			<!-- START: Addition of Norton Shopping Guarantee Block -->	
			<div class="norton-guarantee-container pa-desktop-only">	
				<span id="_GUARANTEE_Kicker" name="_GUARANTEE_Kicker" type="Kicker Custom 4"></span>	
			</div>	
			<!-- END: Addition of Norton Shopping Guarantee Block -->
		</section>
		{{/if}}
	</div>
	<div class="cart-detailed-footer">
		{{#if showLines}}
			<div data-view="SavedForLater" class="cart-detailed-savedforlater"></div>

			<div data-view="RecentlyViewed.Items" class="cart-detailed-recently-viewed"></div>
			{{#if enableRelatedCorrelatedItem}}
				{{#if showFirstRelatedItem}}
					<div data-view="Related.Items" class="cart-detailed-related"></div>
				{{/if}}
				{{#if showUpSellItem}}
					<div data-view="Correlated.Items" class="cart-detailed-correlated cart-detailed-related"></div>
				{{/if}}
				{{#if showSecondRelatedItem}}
					<div data-view="Related.Items" class="cart-detailed-related"></div>
				{{/if}}
			{{/if}}
		{{else}}
			<div data-view="SavedForLater" class="cart-detailed-savedforlater"></div>
		{{/if}}
	</div>

	<div data-cms-area="cart_detailed_cms_area_3" data-cms-area-filters="path"></div>
</div>


{{!----
Use the following context variables when customizing this template:

	model (Object)
	model.addresses (Array)
	model.addresses.0 (Object)
	model.addresses.0.zip (String)
	model.addresses.0.country (String)
	model.addresses.0.company (undefined)
	model.addresses.0.internalid (String)
	model.shipmethods (Array)
	model.lines (Array)
	model.lines.0 (Object)
	model.lines.0.item (Object)
	model.lines.0.item.internalid (Number)
	model.lines.0.item.type (String)
	model.lines.0.quantity (Number)
	model.lines.0.internalid (String)
	model.lines.0.options (Array)
	model.lines.0.location (String)
	model.lines.0.fulfillmentChoice (String)
	model.paymentmethods (Array)
	model.internalid (String)
	model.confirmation (Object)
	model.confirmation.addresses (Array)
	model.confirmation.shipmethods (Array)
	model.confirmation.lines (Array)
	model.confirmation.paymentmethods (Array)
	model.multishipmethods (Array)
	model.lines_sort (Array)
	model.lines_sort.0 (String)
	model.latest_addition (undefined)
	model.promocodes (Array)
	model.ismultishipto (Boolean)
	model.shipmethod (undefined)
	model.billaddress (undefined)
	model.shipaddress (String)
	model.isPaypalComplete (Boolean)
	model.touchpoints (Object)
	model.touchpoints.logout (String)
	model.touchpoints.customercenter (String)
	model.touchpoints.serversync (String)
	model.touchpoints.viewcart (String)
	model.touchpoints.login (String)
	model.touchpoints.welcome (String)
	model.touchpoints.checkout (String)
	model.touchpoints.continueshopping (String)
	model.touchpoints.home (String)
	model.touchpoints.register (String)
	model.touchpoints.storelocator (String)
	model.agreetermcondition (Boolean)
	model.summary (Object)
	model.summary.discounttotal_formatted (String)
	model.summary.taxonshipping_formatted (String)
	model.summary.taxondiscount_formatted (String)
	model.summary.itemcount (Number)
	model.summary.taxonhandling_formatted (String)
	model.summary.total (Number)
	model.summary.tax2total (Number)
	model.summary.discountedsubtotal (Number)
	model.summary.taxtotal (Number)
	model.summary.discounttotal (Number)
	model.summary.discountedsubtotal_formatted (String)
	model.summary.taxondiscount (Number)
	model.summary.handlingcost_formatted (String)
	model.summary.taxonshipping (Number)
	model.summary.taxtotal_formatted (String)
	model.summary.totalcombinedtaxes_formatted (String)
	model.summary.handlingcost (Number)
	model.summary.totalcombinedtaxes (Number)
	model.summary.giftcertapplied_formatted (String)
	model.summary.shippingcost_formatted (String)
	model.summary.discountrate (String)
	model.summary.taxonhandling (Number)
	model.summary.tax2total_formatted (String)
	model.summary.discountrate_formatted (String)
	model.summary.estimatedshipping (Number)
	model.summary.subtotal (Number)
	model.summary.shippingcost (Number)
	model.summary.estimatedshipping_formatted (String)
	model.summary.total_formatted (String)
	model.summary.giftcertapplied (Number)
	model.summary.subtotal_formatted (String)
	model.options (Object)
	showLines (Boolean)
	lines (Array)
	productsAndItemsCount (String)
	productCount (Number)
	itemCount (Number)
	pageHeader (String)

----}}
