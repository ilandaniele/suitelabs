<div class="cart-item-actions-links">
    <div class="cart-item-actions-item-list-actionable-edit-button dropdown">
        {{#if isAdvanced}}
            {{#if isEditable}}
                <a href="{{editUrl}}" class="button-secondary button-small" data-toggle="show-in-modal">{{translate 'Edit'}}</a>
            {{/if}}
                    <button type="button" class="cart-toggle-button dropdown-toggle button-secondary button-small" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false"><i></i></button>
            <ul class="dropdown-menu cart-item-actions-item-list-actionable-edit-content" aria-labelledby="dropdownMenuButton" role="menu">
                <li>
                    <a class="cart-item-actions-item-list-actionable-edit-content-remove" data-action="remove-item" data-internalid="{{lineId}}">
                        {{translate 'Remove'}}
                    </a>
                </li>
                {{#if showSaveForLateButton}}
                    <li>
                        <a class="cart-item-actions-item-list-actionable-edit-content-saveforlater" data-action="save-for-later-item" data-internalid="{{lineId}}">
                            {{translate 'Move to Favorites'}}
                        </a>
                    </li>
                {{/if}}
                {{#if isTrade}}
                    <li>
                        <a class="cart-item-actions-item-list-actionable-edit-content-move-market-wizard" data-action="move-market-wizard" data-internalid="{{lineId}}">
                            {{translate 'Move to Market Wizard'}}
                        </a>
                    </li>
                {{/if}}
            </ul>
        {{else}}
            <a class="cart-item-actions-item-list-actionable-edit-content-remove" data-action="remove-item" data-internalid="{{lineId}}">
                {{translate 'Remove'}}
            </a>
        {{/if}}

    </div>
</div>

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
	item (Object)
	item.isinactive (Boolean)
	item.isinstock (Boolean)
	item.isonline (Boolean)
	item.matrixchilditems_detail (undefined)
	item.itemid (String)
	item.minimumquantity (undefined)
	item.ispurchasable (Boolean)
	item.stockdescription (String)
	item.isbackorderable (Boolean)
	item.itemimages_detail (Object)
	item.onlinecustomerprice_detail (Object)
	item.onlinecustomerprice_detail.onlinecustomerprice_formatted (String)
	item.onlinecustomerprice_detail.onlinecustomerprice (Number)
	item.internalid (Number)
	item.showoutofstockmessage (Boolean)
	item.itemtype (String)
	item.outofstockmessage (String)
	item.itemoptions_detail (Object)
	item.itemoptions_detail.fields (Array)
	item.itemoptions_detail.fields.0 (Object)
	item.itemoptions_detail.fields.0.internalid (String)
	item.itemoptions_detail.fields.0.label (String)
	item.itemoptions_detail.fields.0.type (String)
	item.displayname (String)
	item.storedisplayname2 (String)
	item.pricelevel1 (Number)
	item.pricelevel1_formatted (String)
	item.urlcomponent (String)
	item._optionsDetails (Object)
	item._optionsDetails.fields (Array)
	item._optionsDetails.fields.0 (Object)
	item._optionsDetails.fields.0.internalid (String)
	item._optionsDetails.fields.0.label (String)
	item._optionsDetails.fields.0.type (String)
	item._matrixParent (Object)
	item._matrixParent.options (Array)
	item.options (Array)
	item.options.0 (Object)
	item.options.0.cartOptionId (String)
	item.options.0.itemOptionId (String)
	item.options.0.label (String)
	item.options.0.type (String)
	item._url (String)
	item._isPurchasable (Boolean)
	item._name (String)
	item._priceDetails (Object)
	item._priceDetails.onlinecustomerprice_formatted (String)
	item._priceDetails.onlinecustomerprice (Number)
	item._comparePriceAgainst (Number)
	item._comparePriceAgainstFormated (String)
	item._isInStock (Boolean)
	item._outOfStockMessage (String)
	item._showOutOfStockMessage (Boolean)
	item._inStockMessage (String)
	item._showInStockMessage (Boolean)
	item._stockDescription (String)
	item._showStockDescription (Boolean)
	item._stockDescriptionClass (String)
	item._quantityavailableforstorepickup_detail (Array)
	item._showQuantityAvailable (Boolean)
	item._sku (String)
	item._minimumQuantity (Number)
	item._itemType (String)
	editUrl (String)
	isAdvanced (Boolean)
	showSaveForLateButton (Boolean)
	lineId (String)
	showQuantity (Boolean)

----}}
