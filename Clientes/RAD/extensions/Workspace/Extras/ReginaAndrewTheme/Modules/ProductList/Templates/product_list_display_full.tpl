<tr class="{{#if isChecked}}active{{/if}}" data-id="{{lineId}}" data-item-id="{{itemId}}" data-action="product-list-item">
	{{#if showCheckbox}}
	<td class="product-list-display-full-select">
		<input type="checkbox" value="{{lineId}}" data-action="select" {{#if isChecked}}checked{{/if}}
            {{#if isTradeAndNotIsBackOrderable}}
               disabled="disabled"
            {{/if}}
        >
	</td>
	{{/if}}

	<td class="product-list-display-full-thumnail">
		<img src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}">
	</td>

	<td class="product-list-display-full-details">
		<p class="product-list-display-full-name">
			<a class="product-list-display-full-name-anchor" {{{linkAttributes}}}> {{productName}}</a>
		</p>

        <div class="product-list-display-full-name">
			<span class="product-list-sku">
                {{translate 'SKU:'}}
            </span>
            <span class="product-list-sku-value" itemprop="sku">
                {{sku}}
            </span>
        </div>

		<div class="product-list-display-full-price">
			<div data-view="ItemViews.Price"></div>
		</div>

		{{#if showRating}}
		<p class="product-list-display-full-rating">
				<span data-view="GlobalViews.StarRating"></span>
			</p>
		{{/if}}

		<div data-view="Item.SelectedOptions"></div>

		<div class="product-list-display-full-stock">
			<div data-view="ItemViews.Stock"></div>

			<div data-view="StockDescription"></div>
		</div>

		<div data-view="ProductList.DetailsMinQuantity"></div>
	</td>

	<td class="product-list-display-full-extras">
		{{#if showAddedOn}}
			<p class="product-list-display-full-date">
				<span class="product-list-display-full-date-label">{{translate 'Added on: '}}</span>
				<span class="product-list-display-full-date-value">{{itemCreatedDate}}</span>
			</p>
		{{/if}}

        {{#if isItemsAddedToCart}}
            <p class="product-list-display-full-quantity">
				<span class="product-list-display-full-quantity-label">
                    {{translate 'Quantity: '}}
                </span>
                <span class="product-list-display-full-quantity-value">{{quantity}}</span>
            </p>
        {{else}}
            {{#if isFavorite}}
                <p class="product-list-display-full-quantity">
					<span class="product-list-display-full-quantity-label">
                        {{translate 'Quantity: '}}
                    </span>
                    <span class="product-list-display-full-quantity-value">{{quantity}}</span>
                </p>
            {{else}}
                <div class="product-list-edit-item-quantity">
                    <label class="product-list-edit-item-label" for="product-list-edit-item-quantity">{{translate 'Quantity: '}}</label>
                    <button class="product-list-edit-item-button-quantity-minus" data-ui-action="minus">-</button>
                    <input class="product-list-edit-item-input-quantity" type="number" min="1" name="quantity" id="product-list-edit-item-quantity" placeholder="{{translate 'Desired Quantity'}}" value="{{quantity}}">
                    <button class="product-list-edit-item-button-quantity-add" data-ui-action="add">+</button>
                </div>
            {{/if}}
        {{/if}}

		<p class="product-list-display-full-notes" data-type="item-details-notes">
			{{#if hasDescription}}
			<span class="product-list-display-full-notes-label">{{translate 'Notes: '}}</span>
			<span class="product-list-display-full-notes-value">{{description}}</span>
			{{/if}}
		</p>

        {{#if showEdit}}
            <p class="product-list-display-full-edit-notes">
                <a class="product-list-display-full-edit-notes-label" data-action="edit-item" class="label">{{translate 'Edit Notes'}}</a>
            </p>
            <p class="product-list-display-full-remove-item">
                <a class="product-list-display-full-remove-item" data-action="delete-item" class="label">{{translate 'Remove'}}</a>
            </p>
        {{/if}}
	</td>



    <td class="product-list-display-full-actions">
        {{#if showAddToCart }}
          <button class="product-list-display-full-edit" data-action="add-this-to-cart" data-toggle="show-in-modal"
              {{#if isTradeAndNotIsBackOrderable}}
                  disabled="disabled"
              {{/if}}
          >{{translate 'Add to Cart'}}</button>
        {{/if}}
    </td>
</tr>



{{!----
Use the following context variables when customizing this template:

	lineId (String)
	isChecked (Boolean)
	quantity (Number)
	description (String)
	hasDescription (Boolean)
	showEdit (Boolean)
	showMoveAction (Boolean)
	showAddedOn (Boolean)
	itemId (Number)
	isAvailableForCart (Boolean)
	showRating (Boolean)
	showCheckbox (Boolean)
	productName (String)
	priorityName (String)
	itemCreatedDate (String)
	linkAttributes (String)
	thumbnail (Object)
	thumbnail.url (String)
	thumbnail.altimagetext (String)

----}}
