<section class="login-register" >

	<header class="login-register-header">
        <div data-cms-area="login-register-top-text" data-cms-area-filters="path">

        </div>
	</header>
	<div {{#if showRegister}} class="login-register-body" {{else}} class="login-register-body-colored" {{/if}}>

		{{#if showLogin}}
            <div class="login-register-column">
                <div class="login-register-wrapper-column-login">
                    <div class="login-register-wrapper-login" data-view="Login"></div>
                </div>
            </div>
		{{/if}}

		{{#if showRegisterOrGuest}}
            <div class="login-register-column">
                <div class="login-register-wrapper-column-register">
                    <div class="login-register-wrapper-register">
                        <div data-cms-area="register-cms-text-right" data-cms-area-filters="path">

                        </div>


                        {{#if showCheckoutAsGuest}}
                            <div class="login-register-wrapper-guest" data-view="CheckoutAsGuest"></div>
                        {{/if}}

                        {{#if showRegister}}
                            <div class="{{#if showCheckoutAsGuest}}collapse{{/if}} " data-view="Register" id="register-view"></div>
                        {{/if}}
                    </div>
                </div>
            </div>
		{{/if}}

	</div>
</section>



{{!----
Use the following context variables when customizing this template:

	showRegister (Boolean)
	showCheckoutAsGuest (Boolean)
	showLogin (Boolean)
	showRegisterOrGuest (Boolean)

----}}
