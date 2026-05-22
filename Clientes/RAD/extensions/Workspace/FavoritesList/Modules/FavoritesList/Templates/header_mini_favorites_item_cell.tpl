<li class="header-mini-cart-item-cell" data-item-id="{{itemId}}" data-item-type="{{itemType}}">
    <a {{{linkAttributes}}}>
        <div class="header-mini-cart-item-cell-image">
            <img src="{{resizeImage url 'tinythumb'}}?resizeh=60" alt="{{altimagetext}}">
        </div>
    </a>
    <div class="header-mini-cart-item-cell-details">
        <ul>
            <li class="header-mini-cart-item-cell-product-title"><a {{{linkAttributes}}} class="header-mini-cart-item-cell-title-navigable">{{name}}</a></li>

            {{#if isPriceEnabled}}
                <li class="header-mini-cart-item-cell-product-price">{{formattedPrice}}</li>
            {{/if}}

            <div data-view="Item.SelectedOptions"></div>
            <li class="header-mini-cart-item-cell-product-qty">
		    	<span class="header-mini-cart-item-cell-quantity-label">
                    {{translate 'Quantity: '}}
                </span>
                <span class="header-mini-cart-item-cell-quantity-value">
                    {{quantity}}
                </span>
            </li>
        </ul>
    </div>
</li>
