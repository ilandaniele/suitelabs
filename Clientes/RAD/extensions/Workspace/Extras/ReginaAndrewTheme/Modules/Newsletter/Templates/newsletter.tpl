<form class="newsletter-suscription-form" data-action="newsletter-subscribe" novalidate>

	<div data-validation="control-group">

		<h3 class="newsletter-subscription-form-label" for="login-email">{{translate 'Join us!'}}</h3>

		<div class="newsletter-subscription-form-container {{#if showErrorMessage}}error{{/if}}" data-validation="control">
			<input
				name="email"
				id="email"
				type="email"
				class="newsletter-suscription-form-input"
				placeholder="{{translate 'Enter your email address'}}"
			>

			<button type="submit" class="newsletter-subscription-form-button-subscribe">
				{{translate 'Sign Up'}}
			</button>

			<div class="newsletter-alert-placeholder" data-type="alert-placeholder" >
				{{#if isFeedback}}
				<div data-view="GlobalMessageFeedback"></div>
				{{/if}}
			</div>
		</div>
	</div>
</form>



{{!----
Use the following context variables when customizing this template:

	isFeedback (Boolean)
	model (Object)

----}}
