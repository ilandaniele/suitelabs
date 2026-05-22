
{{#if isCurrentItemPurchasable}}
	{{#if showCallToPrice}}
		<div class="call-for-price-container">
			<div class="call-for-price-button">
				<div class="call-for-price-button-button">
					<a href="tel:{{callToPriceNumber}}">{{callToPriceLabel}}</a>
				</div>
			</div>
		</div>
	{{else}}
		<div class="cart-add-to-cart-button-container">
			<div class="cart-add-to-cart-button">
				<button type="submit" data-type="add-to-cart" data-action="sticky" class="cart-add-to-cart-button-button">
					<i></i>
					{{#if isUpdate}}{{translate 'Update'}}{{else}}{{addToCartLabel}}{{/if}}
				</button>
			</div>
		</div>
	{{/if}}
{{else if showEmailNotifyButton}}
	<div data-view="EmailMeWhenInStock"></div>
{{/if}}


{{!----
Use the following context variables when customizing this template: 
	
	isCurrentItemPurchasable (Boolean)
	isUpdate (Boolean)

----}}
