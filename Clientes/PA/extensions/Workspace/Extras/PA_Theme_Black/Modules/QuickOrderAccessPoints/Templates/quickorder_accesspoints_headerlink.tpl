{{#if showTitle}}
	<a class="{{#if hasClass}} {{className}} {{else}}quickorder-accesspoints-headerlink-link{{/if}}" href="#" data-touchpoint="{{cartTouchPoint}}" data-hashtag="#cart?openQuickOrder=true" title="{{translate title}}">
		<img class="pa-icon icon-quick-add" src="{{getThemeAssetsPathWithDefault addShoppingCartIcon 'img/Icons/icon-material-add-shopping-cart.svg'}}" alt="{{title}}" width="20" height="20">
		<span class="pa-caption tracking-order-text">
			{{translate title}}
		</span>		
	</a>
{{/if}}	



{{!----
Use the following context variables when customizing this template: 
	
	hasClass (Boolean)
	cartTouchPoint (String)
	className (String)

----}}
