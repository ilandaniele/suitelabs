{{#if isSSOEnabled}}
<div class="login-register-wrapper-sso-login">
    <h2 class="login-register-login-title">{{translate '$(0)' loginTitle}}</h2>
    <p class="login-register-login-description">{{translate '$(0)' loginMessage}}</p>
    <div class="login-register-login-sso-separator-btn-container"><div class="login-register-login-sso-separator-btn"><a class="login-register-login-sso-btn" href="{{ssoURL}}"> {{translate '$(0)' loginButtonLabel}} </a></div></div>
</div>
{{/if}}
