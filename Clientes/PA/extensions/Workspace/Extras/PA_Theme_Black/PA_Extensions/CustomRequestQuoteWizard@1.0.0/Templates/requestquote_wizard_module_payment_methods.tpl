{{#if showPaymentMethodField}}
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
				<div class="requestquote-wizard-module-comments-box-message requestquote-wizard-half-box-read-field">
					<p>{{selectedPaymentMethodName}}</p>
				</div>
			{{else}}
				<div data-type="alert-placeholder-module"></div>
				<select name="select-payment-method" class="list-header-view-accordion-body-select requestquote-wizard-half-box-write-field" data-action="select-payment-method">
					{{#each estimatePaymentMethods}}
						<option value="{{paymentMethodId}}" {{#if selected}} selected {{/if}}>{{paymentMethodName}}</option>
					{{/each}}
				</select>
			{{/if}}
		</div>
	</div>
{{/if}}