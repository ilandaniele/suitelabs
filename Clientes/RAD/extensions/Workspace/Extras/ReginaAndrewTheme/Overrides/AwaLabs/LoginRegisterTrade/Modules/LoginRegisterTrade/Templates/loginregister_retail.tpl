<section class="loginregister-info-card">

    <div class="loginregister-retail-wrapper">
        <div data-cms-area="retail-form-top-text" data-cms-area-filters="path">

        </div>

        <form class="login-register-register-form" method="POST" novalidate>
            <div class="loginregister-retail-fields">
                <div class="row">
                    <div class="col-md-6 odd-field">
                        <div class="login-register-register-form-controls-group" data-validation="control-group">
                            <label for="register-firstname">
                                {{translate 'First Name <small class="login-register-register-form-required">*</small>'}}
                            </label>
                            <div class="login-register-register-form-controls" data-validation="control">
                                <input type="text" name="firstname" id="register-firstname"
                                       class="login-register-register-form-input">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 even-field">
                        <div class="login-register-register-form-controls-group" data-validation="control-group">
                            <label for="register-lastname">
                                {{translate 'Last Name <small class="login-register-register-form-required">*</small>'}}
                            </label>
                            <div class="login-register-register-form-controls" data-validation="control">
                                <input type="text" name="lastname"
                                       id="register-lastname" class="login-register-register-form-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 odd-field">
                        <div class="login-register-register-form-controls-group" data-validation="control-group">
                            <label for="register-email">
                                {{translate 'Email Address <small class="login-register-register-form-required">*</small>'}}
                            </label>
                            <div class="login-register-register-form-controls" data-validation="control">
                                <input type="email" name="email" id="register-email" class="login-register-register-form-input">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 even-field">
                        <div class="login-register-register-form-controls-group" data-validation="control-group">
                            <label for="register-email-confirm">
                                {{translate
                                        'Confirm Email Address<small class="login-register-register-form-required">*</small>'}}
                            </label>
                            <div class="login-register-register-form-controls" data-validation="control">
                                <input type="email" name="email2" id="register-email-confirm"
                                       class="login-register-register-form-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 odd-field">
                        <div class="login-register-register-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="register-password">
                                {{translate 'Password <small class="login-register-register-form-required">*</small>'}}
                            </label>
                            <div class="login-register-register-form-controls in-line" data-validation="control">
                                <input type="password" name="password" id="register-password"
                                       class="login-register-register-form-input">
                                <span class="login-register-register-label-message">Minimum of 8 Characters</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 even-field">
                        <div class="login-register-register-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="register-password2">
                                {{translate 'Confirm Password <small class="login-register-register-form-required">*</small>'}}
                            </label>
                            <div class="login-register-register-form-controls in-line" data-validation="control">
                                <input type="password" name="password2" id="register-password2" class="login-register-register-form-input">
                            </div>
                        </div>
                    </div>
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

            <div class="loginregister-retail-buttons login-register-register-form-controls-group">
                <button type="submit" class="login-register-register-form-submit">
                    {{translate 'Create Account'}}
                </button>
            </div>
        </form>
    </div>

    <div class="retail-customer-container" data-cms-area="retail-customer" data-cms-area-filters="path"></div>

    <div class="loginregister-bottom-link">
        <a href="/login-register">{{translate 'Take me back to the main registration page'}}</a>
    </div>
</section>

