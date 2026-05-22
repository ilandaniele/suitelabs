<div class="related-item-container" itemprop="itemListElement" data-item-id="{{itemId}}" data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
    {{#unless noImages}}
	<a class="item-relations-related-item-thumbnail" {{{itemURL}}}>
		<img src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" />
	</a>
    {{/unless}}
	<a {{{itemURL}}} class="item-relations-related-item-title">
		<span itemprop="name">{{itemName}}</span>
	</a>
	<div class="item-relations-related-item-price" data-view="Item.Price">
	</div>

	{{#if showRating}}
		<div class="item-relations-related-item-rate" data-view="Global.StarRating">
		</div>
	{{/if}}
	{{#if showATC}}
		<div class="item-relations-addtocart-actions">
			<input type="checkbox" name="relateditems_queue" id="relateditem_{{timestamp}}" data-action="add" data-item-id="{{itemId}}">
			<label for="relateditem_{{timestamp}}">{{translate addToCartText}}</label>
		</div>
	{{/if}}
</div>
