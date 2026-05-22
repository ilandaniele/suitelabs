{{#if showShippingInformation}}
	<section class="order-wizard-showshipments-module-shipping-details">
		<div class="order-wizard-showshipments-module-shipping-details-body">

			<div class="order-wizard-showshipments-module-shipping-details-address">
				<h3 class="order-wizard-showshipments-module-shipping-title">
					{{#if isRestricted}}
                    	{{translate 'Home Address'}}
                    {{else}}
                    	{{translate 'Shipping Address'}}
                    {{/if}}
				</h3>
				{{#if showShippingAddress}}
					<div data-view="Shipping.Address"></div>
					{{#if showEditButton}}
						<a data-action="edit-module" href="{{{editUrl}}}?force=true" class="order-wizard-showshipments-module-shipping-details-address-link">
                        	{{#if isRestricted}}
								{{translate 'Back to edit home address'}}
                            {{else}}
                            	{{translate 'Back to edit shipping information'}}
                            {{/if}}
						</a>
					{{/if}}
				{{else}}
					<a data-action="edit-module" href="{{{editUrl}}}?force=true" class="order-wizard-showshipments-module-shipping-details-address-link">
						{{translate 'Please select a valid shipping address'}}
					</a>
				{{/if}}
			</div>
            {{#if isRestricted}}
            <div class="order-wizard-showshipments-module-shipping-details-address">
				<h3 class="order-wizard-showshipments-module-shipping-title">
                    	{{translate 'FFL Shipping Address'}}
    	        </h3>
                <div>
                    <div class="address-details">
                    	<div class="address-details-container" data-id="2869860" data-manage="shipaddress">
                        	<address>
                            	<div class="address-details-info">
                               
                               		{{#if custbody_ffl_name}}
                                	<p class="address-details-container-multiselect-address-title" name="fflcompany">{{custbody_ffl_name}}</p>
                                    {{/if}}
                                    
                                    {{#if custbody_ffl_shipping_address_1}}
                                    <p class="address-details-container-multiselect-address-details-addr1" name="ffladdr1">{{custbody_ffl_shipping_address_1}}</p>
                                    {{/if}}
                                    
                                    <span class="address-details-container-multiselect-address-line">
                                    
                                    	{{#if custbody_ffl_shipping_city}}
                                        <p class="address-details-container-multiselect-address-details-city" name="fflcity">{{custbody_ffl_shipping_city}}</p>
                                        {{/if}}
                                        
                                    	<p class="address-details-container-multiselect-address-details-state" name="fflstate">{{custbody_ffl_shipping_state}}</p>
                                        <p class="address-details-container-multiselect-address-zip" name="fflzip">{{custbody_ffl_shipping_zip}}</p>
                                    </span>
                                    <p class="address-details-country" name="fflcountry"> United States </p>
                                    
                                    {{#if custbody_ffl_phone}}
                                    <p class="address-details-phone" name="phone">{{custbody_ffl_phone}}</p>
                                    {{/if}}
                                    
                                </div>
                            </address>
                        </div>
                    </div>
                </div>
                {{#if showEditButton}}
                    <a data-action="edit-module" href="{{{editUrl}}}?force=true" class="order-wizard-showshipments-module-shipping-details-address-link">
                        {{translate 'Back to edit shipping information'}}
                    </a>
                {{/if}}
			</div>
            {{/if}}

			{{#if showShippingMetod}}
			<div class="order-wizard-showshipments-module-shipping-details-method" {{#if isRestricted}}style="clear: both"{{/if}}>
				<h3 class="order-wizard-showshipments-module-shipping-title">
					{{translate 'Delivery Method'}}
				</h3>

				{{#if show_selected_shipmethod}}
					<div class="order-wizard-showshipments-module-shipping-details-method-info-card">
						<span class="order-wizard-showshipments-module-shipmethod-name">
								{{selectedShipmethod.name}}:
						</span>
						<span class="order-wizard-showshipments-module-shipmethod-rate">
							{{selectedShipmethod.rate_formatted}}
						</span>
					</div>
				{{/if}}

				{{#if show_selected_shipmethod_preorder}}
					<div class="order-wizard-showshipments-module-shipping-details-method-info-card">
						<span class="order-wizard-showshipments-module-shipmethod-name">
								{{selected_shipmethod_preorder.name}}:
						</span>
						<span class="order-wizard-showshipments-module-shipmethod-rate">
							{{selected_shipmethod_preorder.rate_formatted}}
						</span>
					</div>
				{{/if}}
			</div>
            {{/if}}
            {{#if custbodyspecialinstructions}}
                <div class="{{#if isRestricted}}order-wizard-showshipments-module-shipping-details-address{{else}}order-wizard-showshipments-special-instructions{{/if}}">
                    <h3 class="order-wizard-showshipments-module-shipping-title">
                        {{translate 'Special Instructions'}}
                    </h3>
                    <div class="order-wizard-showshipments-special-instructions-details order-wizard-showshipments-module-shipping-details-method-info-card">
                        {{custbodyspecialinstructions}}
                    </div>
                </div>
            {{/if}}
		</div>
	</section>
{{/if}}
