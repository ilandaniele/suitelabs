{{#if showTypeOfRequestField}}
	{{#if showModuleTitle}}
		<h2 class="order-wizard-title"> 
			{{title}} <span class="case-new-form-required">*</span>
		</h2>
	{{/if}}
	<div class="requestquote-wizard-module-comments">
		<div class="requestquote-wizard-module-comments-box requestquote-wizard-module-payment-method-box requestquote-wizard-module-type-of-request-box">
			{{#if showTitle}}
				<h3 class="requestquote-wizard-module-comments-title">
					{{title}}
				</h3>
			{{/if}}

			{{#if isReadOnly}}
				<div class="requestquote-wizard-module-comments-box-message requestquote-wizard-half-box-read-field">
					<p>{{selectedRequestType}}</p>
				</div>
			{{else}}
				<div data-type="alert-placeholder-module"></div>
				<select name="select-request-type" class="mobile-request-type list-header-view-accordion-body-select requestquote-wizard-half-box-write-field" data-action="select-request-type">
					{{#each requestTypes}}
						<option value="{{requestTypeId}}" {{#if selected}} selected {{/if}}>{{requestTypeName}}</option>
					{{/each}}
				</select>
				{{#if typeOfRequestTooltip}}
					<span class="type-of-request-information-tooltip">
						<i class="order-wizard-promocodeform-tooltip" data-toggle="tooltip" title=""  data-placement="top"  data-original-title="{{{typeOfRequestTooltip}}}"></i>

						<div class="type-of-request-tooltip-content"><div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">{{{typeOfRequestTooltip}}}</div></div>
						
					</span>
				{{/if}}
			{{/if}}
		</div>
	</div>
{{/if}}

