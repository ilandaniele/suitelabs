{{#if showWishlistButton}}
	{{#if isLoading}}
		<div class="product-details-add-to-product-list-loading">
			{{translate 'Loading List...'}}
		</div>
	{{else}}
		<div data-view="ProductListControl"></div>
	{{/if}}
{{/if}}


{{!----
Use the following context variables when customizing this template: 
	
	isLoading (Boolean)

----}}
