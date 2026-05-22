{{#if sessionExpired}}
    <div class="modal-body modal-body-session-message">
        <h5 class="session-login-explanation">{{translate 'You have been logged out due to inactivity.'}}</h5>
    </div>

    <div class="modal-footer">
        <a class="header-profile-login-mobile-link" data-touchpoint="login" data-hashtag="login-register" href="#">
            {{translate 'Login to see the entire RAD collection'}}
        </a>
    </div>
{{else}}
    {{#if sessionMantained}}
        <div class="modal-body modal-body-session-message">
            <h5 class="session-login-explanation">{{translate 'Your session was maintained.'}}</h5>
        </div>
    {{else}}
        <div class="modal-body modal-body-session-message">
            <div class="session-login-explanation">
                {{translate 'You are being timed out due to inactivity.'}}</br>
                {{translate 'Please choose to stay signed in or to logoff.'}}</br>
                {{translate 'Otherwise, you will be logged off automatically.'}}
            </div>
        </div>

        <div class="modal-footer">
            <a type="button" class="session-message-logout-button button-medium button-primary" data-touchpoint="logout" data-hashtag="login">{{translate 'Log Off'}}</a>
            <button type="button" class="session-message-maintain-button button-medium button-primary" data-action="maintain-session">{{translate 'Stay Logged In'}}</button>
        </div>
    {{/if}}
{{/if}}
