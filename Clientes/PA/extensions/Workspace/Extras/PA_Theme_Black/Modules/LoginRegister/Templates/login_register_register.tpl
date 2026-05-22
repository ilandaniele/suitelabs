{{#unless showFormFieldsOnly}}
<p class="login-register-register-form-description">
	{{translate 'Create an account and take advantage of faster checkouts and other great benefits.'}}
</p>

<form class="login-register-register-form" method="POST">
	<small class="login-register-register-required">{{translate 'Required <span class="login-register-register-form-required">*</span>'}}</small>

{{/unless}}

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-firstname">
			{{translate 'First Name <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input {{#if hasAutoFocus}} autofocus {{/if}} type="text" name="firstname" id="register-firstname" class="login-register-register-form-input">
		</div>
	</div>

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-lastname">
			{{translate 'Last Name <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="text" name="lastname" id="register-lastname" class="login-register-register-form-input">
		</div>
	</div>

	{{#if showCompanyField}}
		<div class="login-register-register-form-controls-group" data-validation="control-group">
			<label class="login-register-register-form-label" for="register-company">
				{{#if isCompanyFieldRequire}}
					{{translate 'Company <small class="login-register-register-form-required">*</small>'}}
				{{else}}
					{{translate 'Company'}} <small class="login-register-register-form-optional">{{translate '(optional)'}}</small>
				{{/if}}
			</label>
			<div class="login-register-register-form-controls" data-validation="control">
				<input type="text" name="company" id="register-company" class="login-register-register-form-input"/>
			</div>
		</div>
	{{/if}}

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-email">
			{{translate 'Email Address <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="email" name="email" id="register-email" class="login-register-register-form-input" placeholder="{{translate 'your@email.com'}}">
			<p class="login-register-register-form-help-block">
				<small>
					{{translate 'We need your email address to contact you about your order.'}}
				</small>
			</p>
		</div>
	</div>
	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-password">
			{{translate 'Password <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="password" name="password" id="register-password" class="login-register-register-form-input">
		</div>
	</div>

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-password2">
			{{translate 'Re-Enter Password <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="password" name="password2" id="register-password2" class="login-register-register-form-input">
		</div>
	</div>

	{{#if isRedirect}}
		<div class="login-register-register-form-controls-group" data-validation="control-group">
			<div class="login-register-register-form-controls" data-validation="control">
				<input value="true" type="hidden" name="redirect">
			</div>
		</div>
	{{/if}}

	<div data-view="Register.CustomFields"></div>

	<div class="login-register-register-form-controls-group">
		<label class="login-register-register-form-label">
			<input type="checkbox" name="emailsubscribe" id="register-emailsubscribe" value="T" {{#if isEmailSubscribeChecked}} checked {{/if}}>
			{{translate 'Yes, Please sign me up for $(0) exclusive offers and promotions' siteName}}
		</label>
	</div>

    {{#if subscribedForSmsUpdatesEnable}}
	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label">
			<input type="checkbox" name="custentity_opted_into_listrak_sms" id="register-smssubscribe" value="T" {{#if
				isSmsSubscribeChecked}} checked {{/if}}>
			{{translate 'Yes, I would like to join Primary Arms SMS Club to recieve special text offers, price drop alerts, and back in stock notifications.'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control" name="phone-number">
			<label class="login-register-register-form-label" for="register-phone">
			{{translate '<b>Phone</b>&nbsp<small class="login-register-register-form-required">*</small>'}}
		   </label>
			<input  type="tel" name="phone" id="register-phone" class="login-register-register-form-input"
				data-type="phone" placeholder="{{translate '(xxx)-xxx-xxxx'}}">
		</div>
		    <p>
				<small>
					{{translate '<b>Disclaimer :</b> By subscribing to Primary Arms text messaging, you agree to receive recurring autodialed marketing text messages (e.g. cart reminders) to the mobile number used at opt-in and represent that you are at least twenty-one years of age. Consent is not a condition of purchase. Message frequency may vary. Msg & data rates may apply. Reply HELP for help and STOP to cancel. See Terms and Conditions & Privacy Policy.'}}
				</small>
			</p>
	</div>
	{{/if}}

	<div class="login-register-register-form-messages" data-type="alert-placeholder"></div>
	<small>By using our website, you agree to our <a style="text-decoration:underline;" href='/privacy-policy' target="_blank" data-navigation="ignore-click">Privacy Policy</a> and <a style="text-decoration:underline;" href='/terms-conditions' target="_blank" data-navigation="ignore-click">Terms & Conditions</a>.</small>
            

{{#unless showFormFieldsOnly}}
	<div class="login-register-register-form-controls-group">
		<button type="submit" class="login-register-register-form-submit">
			{{translate 'Create Account'}}
		</button>
	</div>
</form>
{{/unless}}




{{!----
Use the following context variables when customizing this template: 
	
	showCompanyField (Boolean)
	isCompanyFieldRequire (Boolean)
	siteName (String)
	showFormFieldsOnly (Boolean)
	isRedirect (Boolean)
	hasAutoFocus (Boolean)

----}}
