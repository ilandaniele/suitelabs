<div class="order-wizard-paymentmethod-external-module-row">
	<div class="order-wizard-paymentmethod-external-module-column-left vcenter">
		<img class="order-wizard-paymentmethod-external-module-image" src="{{imageUrl}}" alt="{{name}}">
	</div>
	<div class="order-wizard-paymentmethod-external-module-column-right">
		{{#if isCredovaComplete}}
			{{{paymentmethodMessageCheckoutComplete}}}
		{{else}}
			{{{paymentmethodMessageCheckoutIncomplete}}}
		{{/if}}
	</div>
</div> 