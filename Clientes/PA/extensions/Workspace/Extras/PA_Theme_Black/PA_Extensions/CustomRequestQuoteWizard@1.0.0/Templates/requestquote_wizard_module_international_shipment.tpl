{{#if showInternationalShipmentField}}
	{{#if showModuleTitle}}
		<h2 class="order-wizard-title"> 
			{{title}}
		</h2>
	{{/if}}
	<div class="requestquote-wizard-module-comments">
		<div class="requestquote-wizard-module-comments-box requestquote-wizard-module-payment-method-box">
			{{#if showTitle}}
				<h3 class="requestquote-wizard-module-comments-title">
					{{title}}
				</h3>
			{{/if}}
			{{#if isReadOnly}}
				<div class="list-header-view-accordion-body-select requestquote-wizard-checkbox-field-wrap">
					<input type="checkbox"  name="enter-international-shipment" class="requestquote-wizard-checkbox-field" disabled {{#if isChecked}}checked{{/if}}/>
					<span>{{{internationalShipmentLabel}}}</span>
				</div>
			{{else}}
				<div data-type="alert-placeholder-module"></div>
				<div class="list-header-view-accordion-body-select requestquote-wizard-checkbox-field-wrap">
					<input type="checkbox" name="enter-international-shipment" class="requestquote-wizard-checkbox-field" data-action="enter-international-shipment" />
					<span>{{{internationalShipmentLabel}}}</span>
				</div>
			{{/if}}
		</div>
	</div>
{{/if}}

