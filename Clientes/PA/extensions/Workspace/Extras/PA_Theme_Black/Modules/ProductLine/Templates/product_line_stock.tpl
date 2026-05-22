{{#unless isRetailDeliveryItem}}
	<div class="product-line-stock {{#if isNonSellableItem}}non-sellable{{/if}}">
	{{#if isVerifiedDiscontinuedItem}}
		<div class='no-longer-available-message'>{{{verifiedDiscontinuedItemMessage}}}</div>
	{{else}}
		{{#unless isNonSellableItem}}
			{{#if isNotAvailableInStore}}
				<div class='product-line-stock-msg-not-available'>{{translate 'This item is no longer available'}}</div>
			{{else}}
				{{#if showInStockMessage}}
					<p class="product-line-stock-msg-in">
						<i class="fa fa-check-circle"></i>
						{{stockInfo.inStockMessage}}
					</p>
				{{else}}
					{{#if showBackOrderMessage}}
						<p class="product-line-stock-msg-out">
							<i class="fa fa-times-circle"></i>
							<span class="product-line-stock-msg-out-text"> {{stockInfo.outOfStockMessage}} (Backordered)</span>
						</p>
					{{else}}
						{{#if isPreOrderable}}
							<p class="product-line-stock-msg-in">
								<i class="fa fa-check-circle"></i>
								<span class="product-line-stock-msg-out-text"> {{stockInfo.outOfStockMessage}}</span>
							</p>
						{{else}}
							<p class="product-line-stock-msg-out">
								<i class="fa fa-times-circle"></i>
								<span class="product-line-stock-msg-out-text"> {{stockInfo.outOfStockMessage}}</span>
							</p>
						{{/if}}
					{{/if}}
				{{/if}}
			{{/if}}
		{{/unless}}
	{{/if}}
	</div>
{{/unless}}
{{!----
Use the following context variables when customizing this template: 
	
	showOutOfStockMessage (Boolean)
	stockInfo (Object)
	stockInfo.isInStock (Boolean)
	stockInfo.outOfStockMessage (String)
	stockInfo.showOutOfStockMessage (Boolean)
	stockInfo.inStockMessage (String)
	stockInfo.showInStockMessage (Boolean)
	stockInfo.stockDescription (String)
	stockInfo.showStockDescription (Boolean)
	stockInfo.stockDescriptionClass (String)
	stockInfo.isNotAvailableInStore (Boolean)
	stockInfo.stockPerLocation (Array)
	stockInfo.isAvailableForPickup (Boolean)
	stockInfo.showQuantityAvailable (Boolean)
	model (Object)
	model.item (Object)
	model.item.internalid (Number)
	model.item.type (String)
	model.quantity (Number)
	model.internalid (String)
	model.options (Array)
	model.options.0 (Object)
	model.options.0.cartOptionId (String)
	model.options.0.itemOptionId (String)
	model.options.0.label (String)
	model.options.0.type (String)
	model.options.0.values (Array)
	model.location (String)
	model.fulfillmentChoice (String)
	model.description (String)
	model.priority (Object)
	model.priority.id (String)
	model.priority.name (String)
	model.created (String)
	model.createddate (String)
	model.lastmodified (String)
	showInStockMessage (Boolean)
	isNotAvailableInStore (Boolean)

----}}
