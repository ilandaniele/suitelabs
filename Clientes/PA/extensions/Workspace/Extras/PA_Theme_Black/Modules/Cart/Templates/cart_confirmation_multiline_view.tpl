<div class="modal-product-content">
    <div class="cart-confirmation-modal-img">
        <img data-loader="false" src="{{resizeImage thumbnail.url 'main'}}" alt="{{thumbnail.altimagetext}}">
    </div>
    <div class="cart-confirmation-modal-details" itemscope itemtype="https://schema.org/Product">
        <a href="{{model.item._url}}" class="cart-confirmation-modal-item-name">
            {{#if model.item.pagetitle}} 
                {{model.item.pagetitle}} 
            {{else}} 
                {{#if model.item._matrixParent.pagetitle}}  
                    {{model.item._matrixParent.pagetitle}}
                {{else}}  
                    {{model.item._name}} 
                {{/if}}
            {{/if}}
        </a>
        <!-- SKU -->
        <div data-view="Line.Sku" class="cart-confirmation-modal-sku"></div>
        <div class="cart-confirmation-modal-price">
            <div data-view="Line.Price"></div>
        </div>
        
        <!-- Item Options -->
        <!-- <div class="cart-confirmation-modal-options">
            <div data-view="Line.SelectedOptions"></div>
        </div> -->
        
        <!-- Quantity -->
        {{#if showQuantity}}
            <div class="cart-confirmation-modal-quantity">
                <span class="cart-confirmation-modal-quantity-label">{{translate 'Quantity: '}}</span>
                <span class="cart-confirmation-modal-quantity-value">{{model.quantity}}</span>
            </div>
        {{/if}}
        <!-- Amount -->
        <div class="cart-confirmation-modal-amount-eta-msg-wrapper">
            {{#if model.total_formatted}}
            <div class="cart-item-summary-item-list-actionable-amount">
                <span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Amount: ' }}</span>
                <span class="cart-item-summary-amount-value">{{ model.total_formatted }}</span>
            </div>
            {{/if}}
            <div class="cart-confirmation-modal-eta-msg" data-view="ETA.Message"></div>
        </div>
        <!--  gift certificate message -->
		{{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}
		{{#if isNotGovermentUser}}
        <div class="item-gift-certificate-message">
            {{{giftCertificateMessage}}}
        </div>
		{{/if}}
        {{/ifCond}}
    </div>
    <div class="clearfix"></div>
    <hr class="divider">
</div>