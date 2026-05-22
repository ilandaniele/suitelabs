<section class="loginregister-info-card">

    <div class="loginregister-retail-wrapper">

        <div data-cms-area="trade-form-top-text" data-cms-area-filters="path">

        </div>

        <form name="tradeCustomer" action="#" class="login-register-trade-form">
            <div class="loginregister-trade-fields">
                <div class="row">
                    <div class="col-md-6 odd-field">
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label for="firstName">
                                {{translate 'First Name'}} <span>*</span>
                            </label>
                            <div class="login-register-login-form-controls" data-validation="control">
                                <input type="text" name="firstName" id="firstName" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label for="lastName">
                                {{translate 'Last Name'}} <span>*</span>
                            </label>
                            <div class="login-register-login-form-controls" data-validation="control">
                                <input type="text" name="lastName" id="lastName" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="companyName">
                                {{translate 'Company Name'}} <span> *</span>
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <input type="text" name="companyName" id="companyName" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label for="email">
                                {{translate 'Email Address'}}<span> *</span>
                            </label>
                            <div class="login-register-login-form-controls" data-validation="control">
                                <input type="email" name="email" id="email" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label for="email2">
                                {{translate 'Confirm Email Address'}}<span> *</span>
                            </label>
                            <div class="login-register-login-form-controls" data-validation="control">
                                <input type="email" name="email2" id="email2" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="password">
                                {{translate 'Password'}}<span> *</span>
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <input type="password" name="password" id="password" class="login-register-login-form-input">
                            </div>
                        </div>

                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="password2">
                                {{translate 'Confirm Password'}}<span> *</span>
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <input type="password" name="password2" id="password2" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="officePhone">
                                {{translate 'Phone'}}<span> *</span>
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <input type="tel"
                                       name="officePhone"
                                       id="officePhone"
                                       class="login-register-login-form-input"
                                       data-action="formatPhoneOffice"
                                >
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="webSite">
                                {{translate 'Website'}}
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <input type="text" name="webSite" id="webSite" class="login-register-login-form-input">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 even-field">

                        <div class="login-register-login-form-controls-group"
                             data-view="CountriesDropdown"
                             data-input="country"
                             data-validation="control-group">
                        </div>

                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="street">
                                {{translate 'Street Address'}}<span> *</span>
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <input type="text" name="street" id="street" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="street2">
                                {{translate 'Street Address 2'}}
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <input type="text" name="street2" id="street2" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label for="city">
                                {{translate 'City'}}<span> *</span>
                            </label>
                            <div class="login-register-login-form-controls" data-validation="control">
                                <input type="text" name="city" id="city" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group"
                             data-view="StatesView"
                             data-input="state"
                             data-validation="control-group">
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label for="zip">
                                {{translate 'Zip/Postal Code'}}<span> *</span>
                            </label>
                            <div class="login-register-login-form-controls" data-validation="control">
                                <input type="text" name="zip" id="zip" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="businessType">
                                {{translate 'Business Type'}}
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <select name="businessType" id="businessType" class="login-register-login-form-controls login-register-login-form-select">
                                    <option value="">{{translate '-- Select --'}}</option>
                                    {{#each businessOptions}}
                                        <option value="{{ id }}">{{ value }}</option>
                                    {{/each}}
                                </select>
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="taxId">
                                {{translate 'Tax ID'}}<span> *</span>
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <input type="text" name="taxId" id="taxId" class="login-register-login-form-input">
                            </div>
                        </div>
                        <div class="login-register-login-form-controls-group" data-validation="control-group">
                            <label class="login-register-register-form-label" for="taxResaleNumber">
                                {{translate 'Tax Resale Number'}}
                            </label>
                            <div class="login-register-login-form-controls in-line" data-validation="control">
                                <input type="text" placeholder="{{translate 'Enter your Tax ID, if you don\'t have a Resale number'}}" name="taxResaleNumber" id="taxResaleNumber" class="login-register-login-form-input">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="loginregister-trade-fields-bottom">
                <p class="loginregister-trade-tax-message">{{{translate 'FOR TAX EXEMPT PURCHASES please download applicable Tax Exempt Certificates <a href="https://www.reginaandrew.com/tax-exempt" target="_blank">here</a> <br> for each state in which you are reseller.'}}}</p>
                <div class="loginregister-trade-buttons">
                    <button type="submit" class="login-register-trade-submit">{{translate 'Apply Now'}}  </button>
                </div>
                <p class="loginregister-trade-message-title">{{translate 'AFTER YOU SUBMIT YOUR APPLICATION TO OUR TRADE PROGRAM'}}</p>
                <p>{{translate 'You will receive an email confirmation requesting one of the following:'}}</p>
                <p>{{translate '1. Current Business Licence.'}}</p>
                <p>{{translate '2. Resale or Sales Tax Certificate, OR'}}</p>
                <p>{{{translate '3. W9, Federal ID Form or EIN Form (<a href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" target="_blank">download a blank W9 here</a>)'}}}</p>
            </div>

        </form>

    </div>

    <div class="trade-customer-container" data-cms-area="trade-customer" data-cms-area-filters="path"></div>

    <div class="loginregister-bottom-link">
        <a href="/login-register" data-touchpoint="register" data-hashtag="login-register">{{translate 'Take me back to the main registration page'}}</a>
    </div>
</section>
