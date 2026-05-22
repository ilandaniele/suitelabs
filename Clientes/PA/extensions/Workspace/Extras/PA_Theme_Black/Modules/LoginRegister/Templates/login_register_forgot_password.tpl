<section class="login-register-forgot-password">

	<header class="login-register-forgot-password-header">
		<h1 class="login-register-forgot-password-header-title">
			{{translate 'Log in'}}
		</h1>
	</header>

	<div class="login-register-forgot-password-body">

		<h2 class="login-register-forgot-password-title">
			{{translate 'Reset Password'}}
		</h2>

		<form class="login-register-forgot-password-form" novalidate>
			<p class="login-register-forgot-password-description">
				{{translate 'Enter your email below and we\'ll send you a link to reset your password.'}}
			</p>
			{{#if isReset}}
			<p class="login-register-forgot-password-info-message">
				<i class="icon-info"></i> Welcome back!  In order to make your shopping with us as safe as possible we reset passwords if they have not been used for a while.
			</p>
			{{else}}
			<p class="login-register-forgot-password-info-message">
				<i class="icon-info"></i> If this is your first time using our new site you will be able to re-enter your previous password.
			</p>
			{{/if}}
			<div class="clearfix"></div>

			<fieldset>

				<div class="login-register-forgot-password-form-controls-group" data-validation="control-group">
					<label class="login-register-forgot-password-form-label" for="email">
						{{translate 'Email Address <small class="login-register-forgot-password-form-required">*</small>'}}
					</label>
					<div class="login-register-forgot-password-form-controls" data-validation="control">
						<input type="email" name="email" id="email" class="login-register-forgot-password-form-input" placeholder="{{translate 'your@email.com'}}">
					</div>
				</div>

				<div data-type="alert-placeholder"></div>

				<div class="login-register-forgot-password-form-controls-group">
					<button type="submit" class="login-register-forgot-password-submit">
						{{translate 'Send Email'}}
					</button>

				</div>

			</fieldset>
		</form>
		<a href="/login-register" class="login-register-forgot-password-sign-in" data-target=".register" data-action="sign-in-now">
			{{translate 'Log in now'}}
		</a>
	</div>
</section>



{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}
