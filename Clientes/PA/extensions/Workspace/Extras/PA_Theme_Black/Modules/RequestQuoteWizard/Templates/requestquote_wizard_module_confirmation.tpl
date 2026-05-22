<div class="requestquote-wizard-module-confirmation">
	<h2 class="requestquote-wizard-module-confirmation-title">{{{thankyouMessage}}}</h2>
	{{#if quoteTranId}}
		<p class="requestquote-wizard-module-confirmation-body">
			{{translate 'Your Quote Request <a href="/quotes/$(0)">#$(1)</a> was successfully placed.' quoteId quoteTranId}}
		</p>
	{{/if}}
	<p class="requestquote-wizard-module-confirmation-body">
		{{translate contactBusinessDaysMessage}}
	</p>
	<p class="requestquote-wizard-module-confirmation-body">
		{{#if hasSalesrep}}
			{{translate 'For immediate assistance call us at <strong>$(0)</strong> or email us at <a href="mailto:$(1)">$(1)</a>' salesrepPhone salesrepEmail}}
		{{else}}
			{{{translate disclaimer}}}
		{{/if}}
	</p>
	<a class="requestquote-wizard-module-confirmation-new-quote" href="/request-a-quote">{{translate 'Request a new Quote'}}</a>
	<a class="requestquote-wizard-module-confirmation-continue" href="/quotes">{{translate 'See Your Quotes'}}</a>
	{{#if showRequestedQuotesButton}}
		<a class="requestquote-wizard-module-confirmation-continue requested-quotes-button" href="/requested-quotes">{{labelOfRequestedQuotesButton}}</a>
	{{/if}}
</div>

{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}
