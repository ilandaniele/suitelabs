{{#unless inProgress}}
<div class="order-wizard-shipmethod-module">
	{{#if showTitle}}
		<h3 class="order-wizard-shipmethod-module-title">
			{{title}}
		</h3>
	{{/if}}
	
    {{#if isRestricted}}
		<div class="order-wizard-restriction-message-container">
        	{{#if isNotShippable}}
            <p>
                <span class="order-wizard-restriction-shipping-message-title">We're sorry, no delivery methods are available for your order.</span>
            </p>
            {{{isNotShippable}}}
			{{else}}
				{{#if isShippingMessageOnCheckoutEnabled}}
					{{{shippingMessageOnCheckoutMessage}}}
				{{/if}}
				{{#if hasSpecialOrderItem}}
				<p><strong>{{{hasSpecialOrderItemMessage}}}</strong></p>
				{{/if}}
            {{/if}}
        </div>
    {{else}}
        <div class="order-wizard-restriction-message-container">
			{{{nonRestrictedShippingMessageOnCheckoutMessage}}}
			<!--Fedex 2Day, Express Saver and Standard Overnight do not ship out on Sundays.-->
        </div>
    {{/if}}
    
	{{#if showEnterShippingAddressFirst}}
		<div class="order-wizard-shipmethod-module-message">
			{{translate 'Warning: Please enter a valid shipping address first'}}
		</div>
	{{else}}
		{{#if showLoadingMethods}}
			<div class="order-wizard-shipmethod-module-message">
				{{translate 'Loading...'}}
			</div>
		{{else}}
			{{#if hasShippingMethods}}
				{{#if showSelectForShippingMethod}}
					<select data-action="select-delivery-option" data-action="edit-module" class="order-wizard-shipmethod-module-option-select">
						<option>{{translate 'Select a delivery method'}}</option>
						{{#each shippingMethods}}
							<option 
							{{#if isActive}}selected{{/if}} 
							value="{{internalid}}"
							id="delivery-options-{{internalid}}">
								{{rate_formatted}} - {{name}}
							</option>
						{{/each}}
					</select>
				{{else}}
					{{#each shippingMethods}}
						<a data-action="select-delivery-option-radio" 
						class="order-wizard-shipmethod-module-option {{#if isActive}}order-wizard-shipmethod-module-option-active{{/if}}"
						data-value="{{internalid}}">
							<input type="radio" name="delivery-options" data-action="edit-module" class="order-wizard-shipmethod-module-checkbox" 
							{{#if isActive}}checked{{/if}}
							value="{{internalid}}" 
							id="delivery-options-{{internalid}}" />
							
							<span class="order-wizard-shipmethod-module-option-name">{{name}}
								<span class="order-wizard-shipmethod-module-option-price">{{rate_formatted}}</span>	
							</span>
						</a>
					{{/each}}
				{{/if}}
			{{else}}
				{{#if hasReloadingProjectile}}
					<div class="order-wizard-shipmethod-module-message">
						{{translate 'Warning: Items are not allowed to shipped to the state selected due to imposed ship restrictions on nature of the item.'}}
					</div>
				{{else}}
					<div class="order-wizard-shipmethod-module-message">
						{{translate 'Warning: No Delivery Methods are available for this address'}}
					</div>
				{{/if}}
			{{/if}}
		{{/if}}
	{{/if}}
</div>
{{/unless}}
