{{#if show_widget}}
    {{#if isPLP}}
        {{{widgetHtml}}}
    {{else if isPDP}}
        {{{pdpWidgetHtml}}}
    {{else if isCart}}
        {{{CartWidgetHtml}}}
    {{else}}
        <div class="credova-product-message credova-product-message-{{internalid}}" data-amount="{{amount}}" data-type="{{credova_shopping_type}}"></div>
    {{/if}}
{{/if}}
