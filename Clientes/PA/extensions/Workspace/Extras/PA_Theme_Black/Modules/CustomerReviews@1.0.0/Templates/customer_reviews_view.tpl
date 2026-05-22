<div class="product-reviews-item-container" itemprop="itemListElement" data-item-id="{{itemId}}" itemscope itemtype="https://schema.org/Product" data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
	<div class="product-reviews-item-thumbnail">
		<img class="product-reviews-item-image" src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" itemprop="image">
	</div>
	<div class="product-reviews-item-full-details">
		<p class="product-reviews-item-name">
			<a href='{{url}}' data-touchpoint="home" class="product-reviews-item-name-anchor" data-hashtag="{{url}}"> {{#if model.item.pagetitle}} {{model.item.pagetitle}} {{else}} {{name}} {{/if}} </a>
		</p>
		<div class="product-reviews-item-sku">
			<div class="item-sku"> SKU: {{sku}}</div>
		</div>
		<div class="product-reviews-item-price">
			<div data-view="Price.View"></div>
		</div>
		<div class="product-reviews-item-rating" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
			<div class="product-reviews-item-rating-label"> <label for="">My Rating:</label> </div>
			<div class="product-reviews-item-rating-content">
				<div data-view="GlobalViews.Customer.StarRating"></div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="product-reviews-item-rating" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
			<div class="product-reviews-item-rating-label">
				<label for=""  class="full-label"> Average Rating: </label>
				<label for="" class="short-label"> Avg. Rating: </label>
			</div>
			<div class="product-reviews-item-rating-content">
				<div data-view="GlobalViews.Item.Avg.StarRating"></div>
			</div>
			<div class="clearfix"></div>
		</div>
		
		<div data-view="Item.SelectedOptions"></div>
		<div data-view="Option.Selected.View"></div>
		<div class="product-reviews-item-review-date">
            <label for="">{{translate 'Last Reviewed On '}}</label><span>{{created}}</span>
        </div>
	</div>
	<div class="product-reviews-item-review-details">
		<div class="product-reviews-item-review-title-wrapper dropdown">
			<p  data-toggle="dropdown" aria-expanded="false">
				<span class="product-reviews-item-review-title">{{ model.review_title }}</span>
				<span class="icon-chevron-down"></span>
			</p>
			<div class="product-reviews-item-review-text dropdown-menu">
				<p>{{ model.review_content }}</p>
			</div>  
		</div>      
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
