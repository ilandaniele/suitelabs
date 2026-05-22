<section class="freeshipping-layout">

    {{#if eligibleForFreeShipping}}
        <div class="cart-free-shipping-section">
            {{translate 'You are Eligible for'}}<span style="color: green; font-weight: bold;"> {{translate 'Free Shipping'}} </span> {{translate 'on this Order!'}} 
        </div>
    {{/if}}

    {{#if showFreeShippingBar}}
        <div class="cart-free-shipping-section">
            {{translate 'Spend'}} <span style="font-weight:bold;">{{translate '$'}}{{ amountTillFreeShipping }}</span>
            {{translate 'more to receive'}} <span style="color: green; font-weight:bold;">{{translate 'Free Shipping'}}</span>
        </div>
        <div style="padding:15px;">
            <div class="progress">
                <div class="freeShippingBar"></div>
            </div>
        </div>
    {{/if}}
    
</section>