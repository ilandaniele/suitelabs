<div class="bulbupsell-main-wrapper">
    {{#each availableBulbs}}
        <div class="bulbupsell-checkbox-wrapper" data-action="select-bulb" data-item-id="{{internalid}}" data-type="{{type}}">
            <input type="checkbox" name="bulb-option-{{@index}}" {{#if checked}}checked{{/if}}>
            <label for="bulb-option-{{@index}}">{{translate '$(0) $(1) + $(2)' label bulbQty priceFormatted}}</label>
        </div>
    {{/each}}
</div>

