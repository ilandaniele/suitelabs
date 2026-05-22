<div class="paypal-options-divider">{{ translate '- OR -' }}</div>

<div class="cart-summary-btn-paypal-express">
    <a href="#" data-touchpoint="checkout" data-hashtag="#" data-parameters="paypalexpress=T">
        <img src="{{paypalCheckoutBtn}}" class="cart-summary-btn-paypal-express-image" alt="PayPal Express" />
    </a>
</div>

<div class="cart-summary-btn-paypal-express">
    <a href="#" data-touchpoint="checkout" data-hashtag="#" data-parameters="paypalexpress=T">
        <img src="{{paypalLaterBtn}}" class="cart-summary-btn-paypal-express-image" alt="PayPal Express" />
    </a>
</div>

<div class="paypal-options-container">
    <div
        data-pp-message
        data-pp-style-layout="text"
        data-pp-style-logo-type="inline"
        data-pp-style-text-color="black"
        data-pp-style-text-size="12"
        data-pp-amount="{{cartTotal}}"
        data-pp-placement=cart>
    </div>
</div>
