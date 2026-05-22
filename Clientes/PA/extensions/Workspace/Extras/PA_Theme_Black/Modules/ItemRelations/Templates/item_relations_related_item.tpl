<div class="item-relations-wrapper" itemprop="itemListElement" data-item-id="{{itemId}}" data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
	<a class="item-relations-related-item-thumbnail" {{{itemURL}}}>
		<img class="correlatedlink" src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" />
	</a>
	<div data-view="Product.Stock.Info.Related"></div>


	{{#if showRating}}
		<div class="item-relations-related-item-rate" data-view="Global.StarRating">
		</div>
	{{/if}}
	<a {{{itemURL}}} class="item-relations-related-item-title">
		<span class="correlatedlink" itemprop="name">{{model._pageTitle}}</span>
	</a>

	<div class="item-relations-related-item-price" data-view="Item.Price"></div>
	
	{{#if showAddToCartButton }}
		<div class="item-relations-related-item-add-to-cart" data-view="AddToCart.Related">
		</div>	
	{{/if}}
	<!--  gift certificate message -->
	<div class="bonus-bucks-badge-plp non-visible {{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}makeItVisible{{/ifCond}}">
	{{#if isNotGovermentUser}}
		<img class="icon-moneybill" src="{{getThemeAssetsPathWithDefault moneyBillIcon 'img/Icons/bonus-bucks-icon-on-item-cell.svg'}}" alt="Money Bill Icon">
		<div class="bonus-bucks-text">
			{{translate 'Bonus'}}<br><strong>{{translate 'Bucks'}}</strong>
		</div>
	</div>
	<div class="clearfix"></div>
	<div class="item-gift-certificate-message non-visible {{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}makeItVisible{{/ifCond}}">
		{{{giftCertificateMessage}}}
	</div>
	{{/if}}
</div>


{{!----
Use the following context variables when customizing this template: 
	
	itemURL (String)
	thumbnail (Object)
	thumbnail.url (String)
	thumbnail.altimagetext (String)
	sku (String)
	model (Object)
	model.itemsIds (Number)
	model.options (Array)
	model._matrixParent (Object)
	model._matrixParent.options (Array)
	model._url (String)
	model._name (String)
	model._thumbnail (Object)
	model._thumbnail.url (String)
	model._thumbnail.altimagetext (String)
	model._sku (String)
	model._rating (Number)
	model._ratingsCount (Number)
	model._matrixChilds (Array)
	model._inStockMessage (String)
	model._showInStockMessage (Boolean)
	model._showStockDescription (Boolean)
	model._stockDescriptionClass (String)
	model._quantityavailableforstorepickup_detail (Array)
	model._showQuantityAvailable (Boolean)
	showRating (Boolean)
	itemName (String)
	itemId (Number)

----}}
