{{!
© 2017 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
}}

<form class="cart-shippingMethods-form" data-action="">
    {{#if noShipAddress }}
        <div>
            {{translate 'To view different shipping methods, enter your Zip code in the field above.'}}
        </div>
    {{else}}
    {{#if noShippingMethods}}
        <div>
            {{translate 'Warning: No Shipping Methods are available for this address.'}}
        </div>
    {{else}}
            {{#each ShippingMethods}}
            <div class="delivery-option">
                <input class="{{#unless ../isLoggedIn}}hidden{{/unless}}" type="radio"
                       name="delivery-options"
                       id="delivery-options-{{internalid}}>"
                       value="{{internalid}}{{isActive}}"
                       {{#if ../oneShippingMethod}} checked {{/if}}
                {{#if (equalsShipMethod ../shipMethod internalid)}} checked {{/if}} >
                   <span class="delivery-option-label" style="{{#if (equalsShipMethod rate 0)}}color:#a22f34{{/if}}">
                    {{name}}:
                </span>
                   <span class="delivery-option-rate" style="{{#if (equalsShipMethod rate 0)}}color:#a22f34{{/if}}">
                    {{{rate_formatted}}}
                </span>
            </div>
            {{/each}}
            {{#unless isLoggedIn}}
                <p><b>Select the desired Shipping method in Checkout</b></p>
            {{/unless}}
        {{/if}}
    {{/if}}
</form>

