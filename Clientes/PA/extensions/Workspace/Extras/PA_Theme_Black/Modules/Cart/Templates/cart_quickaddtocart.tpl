<form class="cart-quickaddtocart" data-action="add-to-cart">
	<a class="facets-item-cell-grid-title-name" href="{{url}}">
		<span itemprop="name">{{name}}</span>
	</a>
	<div data-view="ProductViewsPrice.Price" class="cart-quickaddtocart-price"></div>
	{{#if addToCartFromFacetsViewEnabled}}
		{{#if showQuickAddToCartButton}}
		<div data-view="AddToCart">
			<input name="quantity" data-action="setquantity" class="cart-quickaddtocart-quantity" type="number" min="{{minimumQuantity}}"{{#if isMaximumQuantity}} max="{{maximumQuantity}}"{{/if}} value="{{quantity}}"/>
		</div>
		{{/if}}
		{{#if showEmailNotifyButton}}
			<div class="email-when-in-stock-button-container">
				<a class="product-list-control-button-email-backinstock item-details-back-in-stock-button" href="{{redirect_url}}" data-touchpoint="home" data-hashtag="#{{redirect_url}}">
					<i class="icon-envelope"></i>  Email Me When In Stock
				</a>
			</div>
		{{/if}}
	{{/if}}
</form>




{{!----
Use the following context variables when customizing this template: 
	
	itemId (Number)
	showQuickAddToCartButton (Boolean)
	minimumQuantity (Number)
	quantity (Number)

----}}
