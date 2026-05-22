<li class="item-relations-cell facets-items-collection-view-cell-span3">
	<div class="facets-item-cell-grid" data-type="item" data-item-id="{{itemId}}" itemprop="itemListElement" data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
		<meta itemprop="url" content="{{url}}"/>

		<div class="facets-item-cell-grid-image-wrapper-rad">
			<a class="facets-item-cell-grid-link-image" href="{{url}}">
				<img class="facets-item-cell-grid-image" src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" itemprop="image"/>
			</a>
			{{#if isEnvironmentBrowser}}
				<div class="facets-item-cell-grid-quick-view-wrapper">
					<a href="{{url}}" class="facets-item-cell-grid-quick-view-link" data-toggle="show-in-modal">
						<i class="facets-item-cell-grid-quick-view-icon"></i>
						{{translate 'Quick View'}}
					</a>
				</div>
			{{/if}}
		</div>

		<div class="item-info-wrap">
			<a href="{{url}}" class="item-relations-related-item-title">
				<span itemprop="name">{{name}}</span>
				<div class="item-relations-related-item-price" data-view="Item.Price"></div>
			</a>
		</div>

		{{!----
		<div class="facets-item-cell-grid-details">
			<a class="facets-item-cell-grid-title" href="{{url}}">
				<span itemprop="name">{{name}}</span>
			</a>

			<div class="facets-item-cell-grid-price" data-view="ItemViews.Price"></div>

			{{#if showRating}}
				<div class="facets-item-cell-grid-rating" itemprop="aggregateRating" data-view="GlobalViews.StarRating"></div>
			{{/if}}

			<div data-view="Cart.QuickAddToCart"></div>

			<div class="facets-item-cell-grid-stock">
				<div data-view="ItemViews.Stock" class="facets-item-cell-grid-stock-message"></div>
			</div>

			<div data-view="StockDescription"></div>
		</div>
		----}}
	</div>
</li>
