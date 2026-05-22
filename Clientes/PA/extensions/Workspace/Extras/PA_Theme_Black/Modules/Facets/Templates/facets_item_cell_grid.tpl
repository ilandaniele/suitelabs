<div class="facets-item-cell-grid {{#if hasNoGetItByMessage}}non-get-it-by-item{{/if}}" data-type="item" data-item-id="{{itemId}}" {{#unless excludeSchemaFromPLP}}itemprop="itemListElement" itemscope="" itemtype="http://schema.org/Product" {{/unless}} data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
	{{#unless excludeSchemaFromPLP}}
		<meta itemprop="url" content="{{url}}"/>
	{{/unless}}

	<div class="facets-item-cell-grid-details">
		<div class="facets-item-cell-grid-image-wrapper">
			{{#if hasColorItemOption}}
				<div data-view="ItemViews.Thumbnail"></div>
			{{else}}
				<span class="facets-item-cell-grid-link-image">
					{{#if enableLazyLoad}}	
						<img class="facets-item-cell-grid-image lazy" src="img/ajax-loader.gif" data-src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" {{#unless excludeSchemaFromPLP}}itemprop="image"{{/unless}}/>
					{{else}}
						<img class="facets-item-cell-grid-image" src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" {{#unless excludeSchemaFromPLP}}itemprop="image"{{/unless}}/>
					{{/if}}
				</span>
			{{/if}}
			{{#if isEnvironmentBrowser}}
				<div class="facets-item-cell-grid-quick-view-wrapper">
					<span data-navigation="consider-click" data-url="{{url}}" class="facets-item-cell-grid-quick-view-link" data-toggle="show-in-modal">
						<i class="facets-item-cell-grid-quick-view-icon"></i>
						{{translate 'Quick View'}}
					</span>
				</div>
			{{/if}}
		</div>
		{{#if notGiftCertificate}}
			{{#if showRating}}
				<div class="facets-item-cell-grid-rating" {{#if hasRatings}} {{#unless excludeSchemaFromPLP}}itemprop="aggregateRating" itemscope="" itemtype="https://schema.org/AggregateRating"  {{/unless}} {{/if}} data-view="GlobalViews.StarRating">
				</div>
			{{/if}}
		{{/if}}
		{{#if isVerifiedDiscontinuedItem}}
			<div class='no-longer-available-message-plp'>{{{verifiedDiscontinuedItemMessage}}}</div>
		{{else}}
			<div class="facets-item-cell-grid-stock">
				<div data-view="ItemViews.Stock" class="facets-item-cell-grid-stock-message"></div>
			</div>
			<div class="facets-item-cell-grid-email-when-in-stock" data-view="ItemViews.EmailMeWhenInStock"></div>
		{{/if}}
		<div class="facets-item-cell-grid-title-container">
			<p class="facets-item-cell-grid-title-name">
				<a class="facets-item-cell-grid-title" href="{{url}}">
					<span {{#unless excludeSchemaFromPLP}}itemprop="name"{{/unless}}>{{name}}</span>
				</a>
			</p>
		</div>
		{{#unless isNonSellableItem}}
		<div class="matrix-color-option-holder">
			{{#if hasColorItemOption}}
				<div class="item-option-flyout-wrapper">
					{{#unless isVerifiedDiscontinuedItem}}
						<div data-view="ItemDetails.Options.Colors"></div>
					{{/unless}}
					
					<!--  gift certificate message -->
					{{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}
					{{#if isNotGovermentUser}}
						<div class="item-gift-certificate-message {{#if hideGiftCertificateMessage}}hide small-size{{/if}}">
							{{{giftCertificateMessage}}}
						</div>
						{{/if}}
					{{/ifCond}}
				</div>
			{{/if}}
		</div>
		
		<div class="facets-item-cell-grid-getitby {{#if isVerifiedDiscontinuedItem}}zero-opacity-class{{/if}}" data-view="GetItBy.View"></div>
		
		{{/unless}}
		<span class="facet-item-view-more-button">View Details</span>
		{{#unless isNonSellableItem}}
		<div class="item-compare-checked" data-view="CompareCheckbox"> </div>
		{{/unless}}
		<div class="facets-item-cell-grid-price" data-view="ItemViews.Price"></div>	
		
		{{#if isNonSellableItem}}
		<a class="facets-item-cell-grid-contact-price-link" href="mailto:{{emailIds}}"> <i class="header-email-icon"></i>Contact For Price</a>
		{{/if}}

		{{#unless isNonSellableItem}}
		<!--  gift certificate message -->
		{{#if isCreditMessageEnable }}
		{{#if isNotGovermentUser}}
			<div class="bonus-bucks-badge-plp">
				<img class="icon-moneybill" src="{{getThemeAssetsPathWithDefault moneyBillIcon 'img/Icons/bonus-bucks-icon-on-item-cell.svg'}}" alt="Money Bill Icon">
				<div class="bonus-bucks-text">
					{{translate 'Bonus'}}<br><strong>{{translate 'Bucks'}}</strong>
				</div>
			</div>
			{{#if hasCreditAmount}}
				<div class="item-gift-certificate-message {{#if hideGiftCertificateMessage}}hide small-size{{/if}}">
					{{{giftCertificateMessage}}}
				</div>
			{{/if}}
			{{/if}}
		{{/if}}

		{{#if promoLink}}
			<div class="promotion-link-container">
				<span class="promotion-link-button" data-action="promotion.link.button">* Click here for rebate</span>
			</div>
		{{/if}}
		
		<div data-view="ItemDetails.Options"></div>
		<div data-view="Widget.Item.Credova"></div>

		<!-- <div data-view="Cart.QuickAddToCart"></div> -->
		<div data-view="Holster.QuickAddToCart"></div>

		<div data-view="StockDescription"></div>
		{{#unless isVerifiedDiscontinuedItem}}
			<div class="facets-item-cell-grid-eta-msg-wrapper" data-view="ETA.Message"></div>
		{{/unless}}
		{{#ifCond isBlueLable '&&' showBlueLabelBadge}}
		{{#if blueLabelBadgeText}}
			{{#unless isVerifiedDiscontinuedItem}}
				<span class="facets-item-cell-grid-blue-label-badge">{{blueLabelBadgeText}}</span>
			{{/unless}}
		{{/if}}
		{{/ifCond}}
		{{/unless}}
	</div>
</div>




{{!----
Use the following context variables when customizing this template: 
	
	itemId (Number)
	name (String)
	url (String)
	sku (String)
	isEnvironmentBrowser (Boolean)
	thumbnail (Object)
	thumbnail.url (String)
	thumbnail.altimagetext (String)
	itemIsNavigable (Boolean)
	showRating (Boolean)
	rating (Number)

----}}