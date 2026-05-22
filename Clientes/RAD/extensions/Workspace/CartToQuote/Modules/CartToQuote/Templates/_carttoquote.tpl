{{#if isCartDetail}}
    <a class="cart-detailed-proceed-to-checkout cart-summary-button-request-quote
        {{#if showProceedButton}} cart-summary-button-proceed-checkout-sb {{/if}}"
       href="#request-a-quote" data-touchpoint="customercenter" data-hashtag="#request-a-quote" data-action="cart-detail-to-quote"
       origin_hash="request-a-quote" origin=customercente>
        {{translate 'Submit as Quote'}}
    </a>
{{else}}
    <a class="cart-summary-button-proceed-checkout cart-summary-button-request-quote
        {{#if showProceedButton}} cart-summary-button-proceed-checkout-sb {{/if}}"
       href="#request-a-quote" data-touchpoint="customercenter" data-hashtag="#request-a-quote" data-action="cart-to-quote"
       origin_hash="request-a-quote" origin=customercente>
        {{translate 'Submit as Quote'}}
    </a>
{{/if}}
