{{#unless isVerifiedDiscontinuedItem}}
	{{#unless isNonSellableItem}}
	<div class="product-views-price">
		{{#if isPriceEnabled}}
			{{#if isPriceRange}}
				<span class="product-views-price-range" itemscope {{#unless excludeOffersaSchema}} itemprop="offersa" itemtype="https://schema.org/AggregateOffer"{{/unless}}>
					{{#unless isPLP}}
						<meta itemprop="priceCurrency" content="{{currencyCode}}"/>
					{{/unless}}
					<!-- Price Range -->
					{{#if isMapTypePriceInCart}}
						<span class="product-views-price-lead-sale product-views-price-lead map-type-text {{mapTypeClass}}">
							{{mapTypeText}}
						</span>
						<span class="map-type-price product-views-price-lead product-views-price-lead-sale" data-role="product-view-price-lead">
							{{translate '<span itemprop="lowPrice" data-rate="$(0)" >$(1)</span> to <span itemprop="highPrice" data-rate="$(2)">$(3)</span>' minPrice minPriceFormatted maxPrice maxPriceFormatted}}
						</span>
						{{#if showComparePrice}}
							<small class="product-views-price-old">
								{{comparePriceFormatted}}
							</small>
						{{/if}}
					{{else}}
						<span class="product-views-price-lead {{#if showComparePrice}}product-views-price-lead-sale{{/if}}" data-role="product-view-price-lead">
							{{translate '<span itemprop="lowPrice" data-rate="$(0)" >$(1)</span> to <span itemprop="highPrice" data-rate="$(2)">$(3)</span>' minPrice minPriceFormatted maxPrice maxPriceFormatted}}
						</span>
						{{#if showComparePrice}}
							{{#if isComparePriceRange}}
								<small class="product-views-price-old product-views-price-range-old">
									{{translate '<span itemprop="lowPriceCompare" data-rate="$(0)" >$(1)</span> to <span itemprop="highPriceCompare" data-rate="$(2)">$(3)</span>' minComparePrice minComparePriceFormatted maxComparePrice maxComparePriceFormatted}}
								</small>
							{{else}}
								<small class="product-views-price-old">
									{{comparePriceFormatted}}
								</small>
							{{/if}}
						{{/if}}
					{{/if}}
					{{#unless isPLP}}
						<link itemprop="availability" href="{{#if isInStock}}https://schema.org/InStock{{else}}https://schema.org/OutOfStock{{/if}}"/>
					{{/unless}}
				</span>

			{{else}}
				<span class="product-views-price-exact" itemscope {{#unless excludeOffersaSchema}} itemprop="offersa"  itemtype="https://schema.org/Offer"{{/unless}}>
					{{#unless isPLP}}
						<meta itemprop="priceCurrency" content="{{currencyCode}}"/>
					{{/unless}}

					{{#if isMapTypePriceInCart}}

					{{else}}
						{{#if isPLP}}

						{{else}}
							<meta itemprop="price" content="{{price}}"/> 
						{{/if}}
					{{/if}}
					<!-- Single -->
					{{#if isMapTypePriceInCart}}
						<span class="product-views-price-lead-sale product-views-price-lead map-type-text {{mapTypeClass}}">
							{{mapTypeText}}
						</span>
						<span class="map-type-price product-views-price-lead product-views-price-lead-sale" {{#unless isPLP}}itemprop="price" {{/unless}} data-rate="{{price}}" data-role="price-lead-formatted">
							{{priceFormatted}} {{frequency}}
						</span>
						{{#if showComparePrice}}
							<small class="product-views-price-old">
								{{comparePriceFormatted}}
							</small>
						{{/if}}
					{{else}}
						<span class="product-views-price-lead  {{#if showComparePrice}}product-views-price-lead-sale{{/if}}" {{#unless isPLP}}itemprop="price" {{/unless}} data-rate="{{price}}" data-role="price-lead-formatted">
							{{priceFormatted}} {{frequency}}
						</span>
						{{#if showComparePrice}}
							<small class="product-views-price-old">
								{{comparePriceFormatted}}
							</small>
						{{/if}}
					{{/if}}
					{{#unless isPLP}}
						<link itemprop="availability" href="{{#if isInStock}}https://schema.org/InStock{{else}}https://schema.org/OutOfStock{{/if}}"/>
					{{/unless}}
				</span>
			{{/if}}
		{{else}}

			{{#if showHighlightedMessage}}
				<div class="product-views-price-login-to-see-prices-highlighted">
					<p class="product-views-price-message">
						{{translate 'Please <a href="$(0)" data-navigation="ignore-click">log in</a> to see price or purchase this item' urlLogin}}
					</p>
				</div>
			{{else}}
				<div class="product-views-price-login-to-see-prices">
					<p class="product-views-price-message">
						{{translate '<a href="$(0)" data-navigation="ignore-click">Log in</a> to see price' urlLogin}}
					</p>
				</div>
			{{/if}}
		{{/if}}
	</div>
	{{/unless}}
	{{#if isNonSellableItem}}
	<span class="product-views-price-range" itemscope {{#unless excludeOffersaSchema}} itemprop="offersa" itemtype="https://schema.org/AggregateOffer"{{/unless}} style="display: none;">
		{{#unless isPLP}}
		<meta itemprop="priceCurrency" content="{{currencyCode}}"/>
		<meta itemprop="price" content="Call for price"/> 
		<link itemprop="availability" href="{{#if isInStock}}https://schema.org/InStock{{else}}https://schema.org/OutOfStock{{/if}}"/>
		{{/unless}}
	</span>
	{{/if}}
{{/unless}}


{{!----
Use the following context variables when customizing this template:

	isPriceEnabled (Boolean)
	urlLogin (String)
	isPriceRange (Boolean)
	showComparePrice (Boolean)
	isInStock (Boolean)
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
	currencyCode (String)
	priceFormatted (String)
	comparePriceFormatted (String)
	minPriceFormatted (String)
	maxPriceFormatted (String)
	price (Number)
	comparePrice (Number)
	minPrice (Number)
	maxPrice (Number)
	showHighlightedMessage (Boolean)

----}}