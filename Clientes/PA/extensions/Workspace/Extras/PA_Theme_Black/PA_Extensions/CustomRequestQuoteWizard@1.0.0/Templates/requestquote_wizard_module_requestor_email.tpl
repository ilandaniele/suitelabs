{{#if showRequestorEmailField}}
	{{#if showModuleTitle}}
		<h2 class="order-wizard-title"> 
			{{title}} <span class="case-new-form-required">*</span>
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
					<p>{{requestorEmail}}</p>
				</div>
			{{else}}
				<div class="requestquote-wizard-module-comments-box-message requestquote-wizard-half-box-write-field">
					<p>{{requestorEmail}}</p>
				</div>
			{{/if}}
		</div>
	</div>
{{/if}}

