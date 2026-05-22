{{#if isCurrentItemPurchasable}}
	{{#if showCallToPrice}}
		<div class="reorder-items-actions-add-to-cart-button-container">
			<a class="reorder-items-actions-add-to-cart" href="tel:{{callToPriceNumber}}">{{callToPriceLabel}}</a>
		</div>
	{{else}}
		<div class="reorder-items-actions-add-to-cart-button-container">
			<button 
				data-item-id="{{itemId}}" 
				data-line-id="{{lineId}}" 
				data-parent-id="{{parentItemId}}" 
				data-item-options="{{itemOptions}}" 
				data-action="add-to-cart" 
				{{#if disableButtonAddToCart}} disabled {{/if}} 
				class="reorder-items-actions-add-to-cart">
				{{addToCartLabel}}	
			</button>
		</div>
	{{/if}}
{{/if}}

{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}
