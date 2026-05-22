<div data-action="skip-login-message" class="order-wizard-step-guest-message"></div>

{{#if showTitle}}
<header class="order-wizard-step-header">
	<h2 data-type="wizard-step-name-container" class="order-wizard-step-title">{{title}}</h2>
</header>
{{/if}}

{{#if showContinueButton}}
	<div data-type="alert-placeholder-step"></div>
{{/if}}

<div class="order-wizard-step-review-wrapper">
	
	<section class="order-wizard-step-review-main">
		<div id="wizard-step-review-left"></div>
	</section>

	<section id="wizard-step-review-right" class="order-wizard-step-review-secondary">
	</section>

</div>

{{#if IsReviewPage}}
	<div class="order-wizard-step-content-wrapper review">
{{else}}
	<div class="order-wizard-step-content-wrapper checkout">
{{/if}}
		
	<section id="wizard-step-content" class="order-wizard-step-content-main">
	</section>
    {{#unless showTitle}}{{#unless isMultiOrder}}<h2 class="order-wizard-title"><br></h2>{{/unless}}{{/unless}}
	<section id="wizard-step-content-right" class="order-wizard-step-content-secondary">
	</section>
    
	{{#unless isRestrictionMessageEmpty}}
	<div class="order-wizard-restriction-message-wrapper {{#if isAdvancedCheckout}}advanced-checkout{{/if}}">
        <div class="order-wizard-restriction-message-container">
			{{#if isRestrictionMessageEnabled}}
				{{{restrictionMessage}}}
			{{/if}}
        </div>
    </div>
    {{/unless}}

	<div class="order-wizard-step-actions">

		{{#if showBottomMessage}}
		<small class="order-wizard-step-message {{bottomMessageClass}}">
			{{bottomMessage}}
		</small>
		{{/if}}

		<div class="order-wizard-step-button-container">
			{{#ifCond signatureRequired '&&' signatureRequiredMessage }}
			<div id="signature-required" style="clear:both;margin-bottom:20px;background:#D9EDF7;color:#31708f;text-align:center;padding:10px;font-size:16px"><i class="fa fa-info-circle" aria-hidden="true"></i> {{{signatureRequiredMessage}}}</div><br>
			{{/ifCond}}
			{{#if showContinueButton}}
			<a class="order-wizard-step-button-continue" data-action="submit-step">
				{{continueButtonLabel}}
			</a>
			{{/if}}
			<a class="order-wizard-step-button-back" {{#unless showBackButton}}style="display:none;"{{/unless}} data-action="previous-step">
				{{translate 'Back'}}
			</a>
		</div>
	</div>
</div>