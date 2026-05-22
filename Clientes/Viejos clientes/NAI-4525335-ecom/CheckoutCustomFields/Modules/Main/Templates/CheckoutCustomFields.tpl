<section class="checkout-custom-fields">
    <span class="checkout-custom-fields-content">
        {{#if customer}}
            <div class="title">{{translate 'Customer:'}} {{customer}}</div>
        {{/if}}
        {{#if FDA}}
            <div class="title">{{translate 'FDA legal date:'}} {{FDA}}</div>
        {{/if}}
            <div class="title">{{{disclaimer}}}</div>
    </span>
</section>
