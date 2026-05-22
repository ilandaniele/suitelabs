{{#if showBanner}}
	<div class="cookie-warning-banner-view alert {{#if enableCookieCustomization}}custom-cookie{{/if}}" role="alert">
		<div class="cookie-warning-banner-content-wrapper {{#ifEquals buttonPosition "Left"}}keep-left{{else if buttonPosition}}keep-right{{/ifEquals}} {{#ifEquals policyPageElementType "Button"}}flex-wrap{{/ifEquals}}">
			<div class="cookie-warning-banner-content">
				{{{cookieMessage}}}
				{{#if showLink}}
				{{#ifEquals policyPageElementType "Link"}}
				<a class="cookie-warning-banner-learn-more-link" href="{{#unless policyPageUrl}}https://system.netsuite.com{{linkHref}}{{else}}{{policyPageUrl}}{{/unless}}" {{#unless policyPageUrl}}data-toggle="show-in-modal"{{/unless}} data-page-header="{{linkContent}}">{{linkContent}}</a>
				{{/ifEquals}}
				{{/if}}
			</div>
			{{#if showLink}}
				{{#ifEquals policyPageElementType "Button"}}
				<a class="cookie-warning-banner-learn-more-link as-btn" href="{{#unless policyPageUrl}}https://system.netsuite.com{{linkHref}}{{else}}{{policyPageUrl}}{{/unless}}" {{#unless policyPageUrl}}data-toggle="show-in-modal"{{/unless}} data-page-header="{{linkContent}}">{{linkContent}}</a>
				{{/ifEquals}}
			{{/if}}
			{{#if showCloseButton}}
			<button class="cookie-warning-banner-view-close-button" data-action="close-message" type="button" data-dismiss="alert">{{buttonText}}</button>
			{{/if}}
		</div>
		{{#unless showCloseButton}}
		{{#if closable}}
			<button class="cookie-warning-banner-view-close-button" data-action="close-message" type="button" data-dismiss="alert">&times;</button>
		{{/if}}
		{{/unless}}
	</div>
{{/if}}




{{!----
Use the following context variables when customizing this template: 
	
	showBanner (Boolean)
	cookieMessage (String)
	showLink (Boolean)
	linkHref (String)
	linkContent (String)
	closable (Boolean)

----}}
