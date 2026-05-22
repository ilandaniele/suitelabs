<section class="loginregister-info-card">
    <div class="retail-customer-container" data-cms-area="retail-customer" data-cms-area-filters="path">
    </div>

    <form class="login-register-register-form" method="POST" novalidate>
        <div class="col-sm-offset-3 clearfix">
            <div class="col-md-6">
                <div class="login-register-register-form-controls-group" data-validation="control-group">
                    <label for="register-firstname">
                        {{translate 'First Name <small class="login-register-register-form-required">*</small>'}}
                    </label>
                    <div class="login-register-register-form-controls" data-validation="control">
                        <input type="text" placeholder="Enter your first name" name="firstname" id="register-firstname"
                               class="login-register-register-form-input">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="login-register-register-form-controls-group" data-validation="control-group">
                    <label for="register-lastname">
                        {{translate 'Last Name <small class="login-register-register-form-required">*</small>'}}
                    </label>
                    <div class="login-register-register-form-controls" data-validation="control">
                        <input type="text" placeholder="{{translate 'Enter your last name'}}" name="lastname"
                               id="register-lastname" class="login-register-register-form-input">
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="col-sm-offset-3 clearfix">
            <div class="col-md-6">
                <div class="login-register-register-form-controls-group" data-validation="control-group">
                    <label for="register-email">
                        {{translate 'Email Address <small class="login-register-register-form-required">*</small>'}}
                    </label>
                    <div class="login-register-register-form-controls" data-validation="control">
                        <input type="email" name="email" id="register-email" class="login-register-register-form-input"
                               placeholder="{{translate 'your@email.com'}}">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="login-register-register-form-controls-group" data-validation="control-group">
                    <label for="register-email-confirm">
                        {{translate
                        'Email Address Confirm<small class="login-register-register-form-required">*</small>'}}
                    </label>
                    <div class="login-register-register-form-controls" data-validation="control">
                        <input type="email" name="email2" id="register-email-confirm"
                               class="login-register-register-form-input"
                               placeholder="{{translate 'your@email.com'}}">
                    </div>
                </div>
            </div>
        </div>

        <div class="login-register-register-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="register-password">
                {{translate 'Password <small class="login-register-register-form-required">*</small>'}}
            </label>
            <div class="login-register-register-form-controls in-line" data-validation="control">
                <input type="password" name="password" id="register-password"
                       class="login-register-register-form-input"
                       placeholder="{{translate 'Your password'}}">
            </div>
        </div>

        <div class="login-register-register-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="register-password2">
                {{translate 'CONFIRM PASSWORD <small class="login-register-register-form-required">*</small>'}}
            </label>
            <div class="login-register-register-form-controls in-line" data-validation="control">
                <input type="password" name="password2" id="register-password2"
                       placeholder="{{translate 'Confirm your password'}}" class="login-register-register-form-input">
            </div>
        </div>

        {{#if isRedirect}}
        <div class="login-register-register-form-controls-group" data-validation="control-group">
            <div class="login-register-register-form-controls" data-validation="control">
                <input value="true" type="hidden" name="redirect">
            </div>
        </div>
        {{/if}}

        <div class="login-register-register-form-messages" data-type="alert-placeholder"></div>

        <hr class="trade-line">
        <div class="login-register-register-form-controls-group">
            <button type="submit" class="login-register-register-form-submit">
                {{translate 'Create Account'}}
            </button>
        </div>
    </form>
    <br>
</section>
