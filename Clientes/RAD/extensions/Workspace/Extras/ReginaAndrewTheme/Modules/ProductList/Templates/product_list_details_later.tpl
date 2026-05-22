<div class="product-list-details-later">
	<button class="product-list-details-later-button-saveforlater-pusher" data-type="sc-pusher" data-target="{{pusherTarget}}">
        {{#if name}} {{translate name}} {{else}} {{translate 'Saved for Later'}} {{/if}} here
	</button>
	<div class="product-list-details-later-row" data-action="pushable" data-id="{{pusherTarget}}">
		<div class="product-list-details-later-col">
			<h3 class="product-list-details-later-list-header-title">
                {{#if name}} {{translate name}} {{else}} {{translate 'Saved for Later'}}{{/if}}
				<small class="product-list-details-later-shopping-cart-title-details-count">
					{{#if isEmpty}}
						{{translate 'No products yet'}}
					{{else}}
						{{#if hasMoreThanOneItem}}
							{{translate '$(0) Products' itemsLength}}
						{{else}}
							{{translate '$(0) Product' itemsLength}}
						{{/if}}
					{{/if}}
				</small>
			</h3>

			<div data-confirm-message class="product-list-details-later-confirm-message"></div>

			{{#if hasItems}}
				<div class="product-list-details-later-explanation">
					{{translate 'To buy an item now, click "Move to Cart"'}}
				</div>
				<div class="product-list-details-later-list-items" data-type="product-list-items">
					<div data-view="ProductList.DetailsLater.Collection"></div>
				</div>
			{{else}}
				<div class="product-list-details-later-header-no-items">
					{{translate 'You don\'t have items in this list yet.'}}
				</div>
			{{/if}}
		</div>
	</div>
</div>




{{!----
Use the following context variables when customizing this template:

	itemsLength (Number)
	hasItems (Boolean)
	isEmpty (Boolean)
	hasMoreThanOneItem (Boolean)

----}}
