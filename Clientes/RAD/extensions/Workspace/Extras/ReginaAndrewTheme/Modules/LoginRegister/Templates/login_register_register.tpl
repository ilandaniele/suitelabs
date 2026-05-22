<div class="login-register-fields-wrapper">
    <div class="dropdown customer-type-dropdown-container">
        <i></i>
        <button class="customer-type" type="button" id="customer-type-dropdown" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
            {{translate 'Choose Your Customer Type'}}
        </button>
        <div class="dropdown-menu" aria-labelledby="customer-type-dropdown">
            <a class="dropdown-item" href="#" data-action="link-register" data-link="register-retail">{{translate
                    retailSelectText }}</a>
            <a class="dropdown-item" href="#" data-action="link-register" data-link="register-trade">{{translate
                    tradeSelectText}}</a>
        </div>
    </div>
</div>

<div class="login-register-register-form-controls-group">
    <button class="login-register-register-form-submit" id="btnRedirect" data-action="submit">
        {{translate 'Create an Account'}}
    </button>
</div>
<div data-cms-area="cms_login_register_register_area" data-cms-area-filters="path"></div>



{{!----
Use the following context variables when customizing this template:

	showCompanyField (Boolean)
	isCompanyFieldRequire (Boolean)
	siteName (String)
	showFormFieldsOnly (Boolean)
	isRedirect (Boolean)
	hasAutoFocus (Boolean)

----}}
