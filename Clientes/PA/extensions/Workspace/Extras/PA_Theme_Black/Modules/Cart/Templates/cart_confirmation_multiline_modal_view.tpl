<div class="cart-confirmation-modal">
	<div data-view="Cart.Confirmation.View"></div>
    <div class="cart-confirmation-summary">
        <h4>
            <span class="cart-confirmation-item-count">{{totalItems}} Items</span>
        </h4>
        <h4>
            <span class="cart-confirmation-subtotal">Subtotal: {{subTotal}}</span>
        </h4>
    </div>
    <div class="cart-confirmation-modal-actions">
        <div class="cart-confirmation-modal-view-cart">
            <a href="/cart" class="cart-confirmation-modal-view-cart-button">{{translate 'View Cart &amp; Checkout'}}</a>
        </div>
        <div class="cart-confirmation-modal-continue-shopping">
            <button class="cart-confirmation-modal-continue-shopping-button" data-dismiss="modal">{{translate 'Continue Shopping'}}</button>
        </div>
    </div>
    {{#if showSuggestedProducts}}
        <div class="cart-confirmation-modal-suggested-products">
            <div data-view="Suggested.Products"></div>
        </div>
    {{/if}}
</div>