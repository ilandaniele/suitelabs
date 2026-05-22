{{#ifCond isSpecializedItem '&&' specializedordertext}}
    {{#if isPurchasable}}
    <div class="item-details-ship-fast-message">
        <p>{{{specializedordertext}}}</p>
    </div>
    {{/if}}
{{else}}    
    {{#if isAutomatedBackorderItem}}
        {{#if isPurchasable}}
            <div class="item-details-ship-fast-message">
                <p>{{{backordertext}}}</p>
            </div>
        {{/if}}
    {{else}}
        {{#if isPreOrderItem}}
            {{#if isPurchasable}}
                <div class="item-details-ship-fast-message">
                    <p>{{{preordertext}}}</p>
                </div>
            {{/if}}
        {{else}}
            {{#if isPurchasable}}
                {{#if shipMessageForNonSellableItem}}
                    <div class="item-details-ship-fast-message">
                        <p>{{{shipMessageForNonSellableItem}}}</p>
                    </div>
                {{else}}
                    {{#if isWeShipFastEnabled}}  
                        <div class="item-details-ship-fast-message">
                            <p>{{{weshipfasttext}}}</p>
                        </div>
                    {{/if}}
                {{/if}}
                {{#if isspecialorderitem}}
                    {{#if isSpecialorderEnabled}}
                        <p>{{{specialordertext}}}</p>
                    {{/if}}
                {{/if}}
            {{/if}}
        {{/if}}
    {{/if}}
{{/ifCond}}

{{#if freeShipping}}
    {{#if isNotADealer}}
        {{#if isFreeShippingMessageEnabled}}
        <div class="item-details-incentive-message">
            <div class="col-xs-4 left-side">
                <i class="fa fa-truck" aria-hidden="true"></i>
                <span> FREE<br>Shipping</span>
            </div>
            <div class="col-xs-8 right-side">
                {{{freeShippingMessagetext}}}
            </div>
        </div>
        {{/if}}
    {{/if}}
{{/if}}