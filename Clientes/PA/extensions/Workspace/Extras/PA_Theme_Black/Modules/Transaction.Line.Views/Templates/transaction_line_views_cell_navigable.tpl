<tr class="transaction-line-views-cell-navigable {{cellClassName}} item-{{itemId}}" data-id="{{itemId}}" data-item-type="{{itemType}}">
	<td class="transaction-line-views-cell-navigable-item-image" name="item-image">
		{{#if isFreeGift}}
    		<span class="transaction-line-views-cell-navigable-free-badge">{{translate 'FREE'}}</span>
    	{{/if}}
		<img src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}">
	</td>
	<td class="transaction-line-views-cell-navigable-details" name="item-details">
		<p class="transaction-line-views-cell-navigable-product-name">
			{{#if isNavigable}}
				<a class="transaction-line-views-cell-navigable-product-title-anchor" {{{itemURLAttributes}}}>
					{{#if model.item.pagetitle}} 
						{{model.item.pagetitle}} 
					{{else}} 
						{{#if model.item._matrixParent.pagetitle}}  
							{{model.item._matrixParent.pagetitle}}
						{{else}}  
							{{itemName}} 
						{{/if}}
					{{/if}}
				</a>
			{{else}}
				<span class="transaction-line-views-cell-navigable-product-title">
					{{#if model.item.pagetitle}} 
						{{model.item.pagetitle}} 
					{{else}} 
						{{#if model.item._matrixParent.pagetitle}}  
							{{model.item._matrixParent.pagetitle}}
						{{else}}  
							{{itemName}} 
						{{/if}}
					{{/if}}
				</span>
			{{/if}}
		</p>
		{{#unless isFreeGift}}
			{{#unless isRetailDeliveryItem}}
				<div data-view="Item.Price"></div>
			{{/unless}}
		{{/unless}}
		{{#unless isRetailDeliveryItem}}
			<div class="transaction-line-views-cell-navigable-sku" data-view="Item.Sku"></div>
		{{/unless}}
		<div data-view="Item.Tax.Info"></div>
		{{#if showOptions}}
			<div data-view="Item.Options"></div>
		{{/if}}
		{{#if isRestricted}}
        	<div id="restricted-indicator" class="item-restricted-indicator-checkout"> {{isRestricted}} </div>
        {{/if}}
		{{#if enableCouponValidations}}
			{{#if enableCheckoutPageValidations}}
				{{#if couponApplied}}
					{{#if containsItemCoupon}}
						<div class="pb-2 promotion-info {{itemCouponDiscountType}}">
							<span>{{{itemCouponDiscountMessage}}}</span>
						</div>
					{{/if}}
				{{/if}}
			{{/if}}
		{{/if}}
		<span class="transaction-line-views-cell-navigable-stock" data-view="ItemViews.Stock.View"></span>

		<div data-view="StockDescription"></div>
		<div class="transaction-line-views-cell-eta-msg-wrapper" data-view="ETA.Message"></div>
		<!--  gift certificate message -->
		{{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}
		{{#if isNotGovermentUser}}
        <div class="item-gift-certificate-message {{#unless IsReviewPage}}hide{{/unless}}">
            {{{giftCertificateMessage}}}
        </div>
		{{/if}}
        {{/ifCond}}
	</td>
	
	
	<td class="transaction-line-views-cell-navigable-item-unit-price" name="item-unit-price">
		{{#if showBlockDetail2}}
			{{#unless isRetailDeliveryItem}}
				<p>
					<span class="transaction-line-views-cell-navigable-item-unit-price-label">{{detail2Title}}</span>
					<span class="transaction-line-views-cell-navigable-item-unit-price-value">{{detail2}}</span>
				</p>
			{{/unless}}
		{{/if}}			
	</td>	
	<td class="transaction-line-views-cell-navigable-item-quantity" name="item-quantity">
		{{#unless isRetailDeliveryItem}}
			<p>
				<span class="transaction-line-views-cell-navigable-item-quantity-label">{{translate 'Quantity:'}} </span>
				<span class="transaction-line-views-cell-navigable-item-quantity-value">{{quantity}}</span>
			</p>
		{{/unless}}
	</td>
	<td class="{{#if showStandardPrice}}transaction-line-views-cell-navigable-item-quantity{{else}}transaction-line-views-cell-navigable-amount{{/if}}" name="item-amount">
		<p>
		{{#if showDetail3Title}}
			{{#if containsItemCouponDiscount}}
				{{#if enableCheckoutPageValidations}}
					{{#if couponApplied}}
						{{#if enableCouponValidations }}
							<span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Discounted Amount'}}</span>
						{{/if}}		
					{{/if}}		
				{{/if}}
			{{else}}
				<span class="transaction-line-views-cell-navigable-item-amount-label">{{detail3Title}}</span>
			{{/if}}
		{{/if}}
		<span class="transaction-line-views-cell-navigable-item-amount-value">{{detail3}}</span>
		{{#if showComparePrice}}
			<small class="transaction-line-views-cell-navigable-item-old-price">{{comparePriceFormatted}}</small>
		{{/if}}
		</p>
	</td>
	{{#if showStandardPrice}}
		<td class="transaction-line-views-cell-navigable-amount" name="item-amount">
			<p>
				<span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Standard Price:'}}</span>
				<span class="transaction-line-views-cell-navigable-item-amount-value">{{{baseQtyOnePrice}}}</span>
			</p>
		</td>
	{{/if}}
	<td class="transaction-gift-message-wrap {{#if IsReviewPage}}hide{{/if}}">
		<!--  gift certificate message -->
		{{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}
		{{#if isNotGovermentUser}}
		<div class="item-gift-certificate-message">
			{{{giftCertificateMessage}}}
		</div>
		{{/if}}
		{{/ifCond}}
	</td>
</tr>




{{!----
Use the following context variables when customizing this template:

	model (Object)
	model.item (Object)
	model.item.internalid (Number)
	model.item.type (String)
	model.quantity (Number)
	model.internalid (String)
	model.options (Array)
	model.shipaddress (undefined)
	model.shipmethod (undefined)
	model.location (String)
	model.fulfillmentChoice (String)
	itemId (Number)
	itemName (String)
	isNavigable (Boolean)
	rateFormatted (String)
	showOptions (Boolean)
	itemURLAttributes (String)
	quantity (Number)
	showDetail2Title (Boolean)
	detail2Title (String)
	detail2 (String)
	showBlockDetail2 (Boolean)
	showDetail3Title (Boolean)
	detail3Title (String)
	detail3 (String)
	showComparePrice (Boolean)
	comparePriceFormatted (String)
	thumbnail (Object)
	thumbnail.url (String)
	thumbnail.altimagetext (String)

----}}
