{{#if showExtendedMenu}}
    <a class="header-menu-myaccount-signout-link" href="#" data-touchpoint="logout" name="signout">
        {{translate 'Logout'}}
    </a>
    <a class="header-profile-welcome-link" href="/overview" data-touchpoint="customercenter" data-hashtag="#overview" name="Overview">
        {{translate 'My Account'}}
    </a>
    {{#if showMyAccountMenu}}
        <ul class="header-profile-menu-myaccount-container">
            <li data-view="Header.Menu.MyAccount"></li>
        </ul>
    {{/if}}

{{else}}

    {{#if showLoginMenu}}
        {{#if showLogin}}
            <div class="header-profile-menu-login-container">
                <ul class="header-profile-menu-login">
                    <li>
                        <a class="header-profile-login-link" data-touchpoint="login" data-hashtag="login-register" href="#">
                            {{translate 'Login / Register'}}
                        </a>
                    </li>
                </ul>
            </div>
        {{/if}}
    {{else}}
        <a class="header-profile-loading-link">
            <i class="header-profile-loading-icon"></i>
            <span class="header-profile-loading-indicator"></span>
        </a>
    {{/if}}

{{/if}}



{{!----
Use the following context variables when customizing this template:

	showExtendedMenu (Boolean)
	showLoginMenu (Boolean)
	showLoadingMenu (Boolean)
	showMyAccountMenu (Boolean)
	displayName (String)
	showLogin (Boolean)
	showRegister (Boolean)

----}}
