<div class="product-views-price">
	{{#if isPriceEnabled}}
		{{#if isPriceRange}}
			<span class="product-views-price-range" itemprop="offers">
				<meta itemprop="priceCurrency" content="{{currencyCode}}"/>
				<!-- Price Range -->
				<span class="product-views-price-lead" data-role="product-view-price-lead">
					{{translate '<span itemprop="lowPrice" data-rate="$(0)" >$(1)</span> to <span itemprop="highPrice" data-rate="$(2)">$(3)</span>' minPrice minPriceFormatted maxPrice maxPriceFormatted}}
				</span>
				{{#if showComparePrice}}
					<small class="product-views-price-old">
						{{comparePriceFormatted}}
					</small>
				{{/if}}
				<link itemprop="availability" href="{{#if isPurchasable}}{{#if isInStock}}https://schema.org/InStock{{else}}{{#if backOrderPreOrder}}https://schema.org/PreOrder{{else}}https://schema.org/InStock{{/if}}{{/if}}{{else}}https://schema.org/OutOfStock{{/if}}"/>
			</span>

		{{else}}
			<span class="product-views-price-exact" itemprop="offers">
				<meta itemprop="priceCurrency" content="{{currencyCode}}"/>
				<!-- Single -->
        {{#if showPriceLevelName}}
          <span class="product-views-price-lead-type">{{priceLevelName}}</span>
        {{/if}}
				<span class="product-views-price-lead" itemprop="price" data-rate="{{price}}" data-role="price-lead-formatted">
					{{priceFormatted}} {{frequency}}
				</span>
				{{#if showComparePrice}}
					<small class="product-views-price-old">
						{{comparePriceFormatted}}
					</small>
				{{/if}}
				<link itemprop="availability" href="{{#if isPurchasable}}{{#if isInStock}}https://schema.org/InStock{{else}}{{#if backOrderPreOrder}}https://schema.org/PreOrder{{else}}https://schema.org/InStock{{/if}}{{/if}}{{else}}https://schema.org/OutOfStock{{/if}}"/>
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