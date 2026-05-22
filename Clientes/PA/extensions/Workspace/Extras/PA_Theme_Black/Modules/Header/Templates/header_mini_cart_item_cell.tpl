<li class="header-mini-cart-item-cell" data-item-id="{{itemId}}" data-item-type="{{itemType}}">
		<a {{{linkAttributes}}}>
			<div class="header-mini-cart-item-cell-image">
		    	{{#if isFreeGift}}
		    		<span class="header-mini-cart-item-cell-free-badge">{{translate 'FREE'}}</span>
		    	{{/if}}
				<img src="{{brightedgeImageDomain 'noWebsiteDomain' 'tinythumb'}}{{resizeImage thumbnail.url 'tinythumb' 'removeImageUrlProtocol'}}?resizeh=60" alt="{{thumbnail.altimagetext}}">
			</div>
		</a>
		<div class="header-mini-cart-item-cell-details">
			<ul>
				<li class="header-mini-cart-item-cell-product-title">
					<a {{{linkAttributes}}} class="header-mini-cart-item-cell-title-navigable">
						{{#if line.item.pagetitle}}	
							{{line.item.pagetitle}}
						{{else}}
							{{#if line.item._matrixParent.pagetitle}}  
								{{line.item._matrixParent.pagetitle}}
							{{else}}  
								{{line.item._name}} 
							{{/if}}
						{{/if}}
					</a>
				</li>

		    {{#if isPriceEnabled}}
		    	{{#if isFreeGift}}
			    	<li class="header-mini-cart-item-cell-product-price">{{line.total_formatted}}</li>
		    	{{else}}
			    <li class="header-mini-cart-item-cell-product-price">{{rateFormatted}}</li>
		    	{{/if}}
		    {{else}}
		    	<li>
					{{translate '<a data-touchpoint="login" data-hashtag="login-register" origin-hash="" href="#">Login</a> to see price'}}
				</li>
		    {{/if}}

				<div data-view="Item.SelectedOptions"></div>

			    <li class="header-mini-cart-item-cell-product-qty">
		    	<span class="header-mini-cart-item-cell-quantity-label">
		    		{{translate 'Quantity: '}}
		    	</span>
			    	<span class="header-mini-cart-item-cell-quantity-value">
			    		{{line.quantity}}
			    	</span>
			    </li>
				<li class="header-mini-cart-item-cell-eta-msg-wrapper" data-view="ETA.Message"></li>
		    </ul>
		</div>
</li>



{{!----
Use the following context variables when customizing this template: 
	
	line (Object)
	line.item (Object)
	line.item.internalid (Number)
	line.item.type (String)
	line.quantity (Number)
	line.internalid (String)
	line.options (Array)
	line.location (String)
	line.fulfillmentChoice (String)
	itemId (Number)
	itemType (String)
	linkAttributes (String)
	thumbnail (Object)
	thumbnail.altimagetext (String)
	thumbnail.url (String)
	isPriceEnabled (Boolean)

----}}
