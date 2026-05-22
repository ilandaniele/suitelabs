<div class="facets-item-cell-list" data-item-id="{{itemId}}" {{#unless excludeSchemaFromPLP}}itemprop="itemListElement" itemscope itemtype="https://schema.org/Product"{{/unless}} data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
	<div class="facets-item-cell-list-left">
		<div data-view="ItemDetails.Options" class="{{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}hasBonusBucks{{/ifCond}}"></div>
		<div class="facets-item-cell-list-image-wrapper">
			{{#if hasColorItemOption}}
				<div data-view="ItemViews.Thumbnail"></div>
			{{else}}
				{{#if itemIsNavigable}}
					<a class="facets-item-cell-list-anchor" href='{{url}}'>
						{{#if enableLazyLoad}}	
							<img class="facets-item-cell-list-image lazy" src="img/ajax-loader.gif" data-src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" {{#unless excludeSchemaFromPLP}}itemprop="image"{{/unless}}>
						{{else}}
							<img class="facets-item-cell-list-image" src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" {{#unless excludeSchemaFromPLP}}itemprop="image"{{/unless}}>
						{{/if}}
					</a>
				{{else}}
					{{#if enableLazyLoad}}	
						<img class="facets-item-cell-list-image lazy" src="img/ajax-loader.gif" data-src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" {{#unless excludeSchemaFromPLP}}itemprop="image"{{/unless}}>
					{{else}}
						<img class="facets-item-cell-list-image" src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" {{#unless excludeSchemaFromPLP}}itemprop="image"{{/unless}}>
					{{/if}}
				{{/if}}
			{{/if}}
			{{#if isEnvironmentBrowser}}
				<div class="facets-item-cell-list-quick-view-wrapper">
					<span data-navigation="consider-click" data-url="{{url}}" class="facets-item-cell-list-quick-view-link" data-toggle="show-in-modal">
						<i class="facets-item-cell-list-quick-view-icon"></i>
						{{translate 'Quick View'}}
					</span>
				</div>
			{{/if}}
		</div>
	</div>
	<div class="facets-item-cell-list-right">
		{{#unless excludeSchemaFromPLP}}
			<meta itemprop="url" content="{{url}}">
		{{/unless}}
		
		{{#if notGiftCertificate}}
			{{#if showRating}}
				<div class="facets-item-cell-list-rating" {{#if hasRatings}}{{#unless excludeSchemaFromPLP}}itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating"{{/unless}} {{/if}} data-view="GlobalViews.StarRating">
			</div>
			{{/if}}
		{{/if}}
		{{#if isVerifiedDiscontinuedItem}}
			<div class='no-longer-available-message-plp'>{{{verifiedDiscontinuedItemMessage}}}</div>
		{{else}}
			<div class="facets-item-cell-list-stock">
				<div data-view="ItemViews.Stock" class="facets-item-cell-list-stock-message"></div>
			</div>
			<div class="facets-item-cell-list-email-when-in-stock" data-view="ItemViews.EmailMeWhenInStock"></div>
		{{/if}}
		<p class="facets-item-cell-list-title">
			{{#if itemIsNavigable}}
				<a class="facets-item-cell-list-name" href='{{url}}'>
					<span {{#unless excludeSchemaFromPLP}}itemprop="name"{{/unless}}>
						{{name}}
					</span>
				</a>
			{{else}}
				<span {{#unless excludeSchemaFromPLP}}itemprop="name"{{/unless}}>
					{{name}}
				</span>
			{{/if}}
		</p>
		{{#unless isNonSellableItem}}
		{{#if hasColorItemOption}}
			<div class="item-option-flyout-wrapper">
				{{#unless isVerifiedDiscontinuedItem}}
					<div data-view="ItemDetails.Options.Colors"></div>
				{{/unless}}
			</div>
		{{/if}}
	
		<div class="facets-item-cell-list-getitby  {{#if isVerifiedDiscontinuedItem}}zero-opacity-class{{/if}}" data-view="GetItBy.View"></div>
	
		{{/unless}}
		<span class="facet-item-view-more-button">View Details</span>
	
		{{#unless isNonSellableItem}}
		<div class="item-compare-checked" data-view="CompareCheckbox"> </div>
		{{/unless}}
		<div class="facets-item-cell-list-price-eta-wrapper">
			<div class="facets-item-cell-list-price" data-view="ItemViews.Price"></div>
			{{#unless isVerifiedDiscontinuedItem}}
				<div class="facets-item-cell-list-eta-msg-wrapper" data-view="ETA.Message"></div>
			{{/unless}}
		</div>
		{{#if isNonSellableItem}}
		<a class="facets-item-cell-list-contact-price-link" href="mailto:{{emailIds}}"> <i class="header-email-icon"></i>Contact For Price</a>
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
				<div class="item-gift-certificate-message {{#if hideGiftCertificateMessage}}hide{{/if}}">
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

		<!-- <div data-view="ItemDetails.Options"></div> -->

		<div data-view="Widget.Item.Credova"></div>

		<!-- <div data-view="Cart.QuickAddToCart"></div> -->
		<div data-view="Holster.QuickAddToCart"></div>
 
		{{#ifCond isBlueLable '&&' showBlueLabelBadge}}
		{{#if blueLabelBadgeText}}
			{{#unless isVerifiedDiscontinuedItem}}
				<span class="facets-item-cell-list-blue-label-badge">{{blueLabelBadgeText}}</span>
			{{/unless}}
		{{/if}}
		{{/ifCond}}

		<div data-view="StockDescription"></div>
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