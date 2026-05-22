<div class="requestquote-wizard-module-items-line-actions">
	<a class="requestquote-wizard-module-items-line-actions-button-remove" data-action="remove">
		{{translate 'Remove'}}
	</a>
    {{#unless isTradeAndNotIsBackOrderable}}
       <a class="requestquote-wizard-module-items-line-actions-button-add" data-line="{{lineId}}" data-action="add-item-to-cart">
        {{translate 'Move to cart'}}
       </a>
    {{/unless}}
</div>



{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}
