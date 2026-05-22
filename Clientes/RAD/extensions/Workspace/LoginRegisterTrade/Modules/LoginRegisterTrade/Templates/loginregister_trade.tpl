<section class="loginregister-info-card">
    <div class="trade-customer-container" data-cms-area="trade-customer" data-cms-area-filters="path">
    </div>

    <form name="tradeCustomer" action="#" class="login-register-trade-form">
        <div class="address-edit-fields-container col-sm-offset-3 clearfix">
            <div class="col-md-6">
                <div class="login-register-login-form-controls-group" data-validation="control-group">
                    <label for="firstName">
                        {{translate 'First Name'}} <span>*</span>
                    </label>
                    <div class="login-register-login-form-controls" data-validation="control">
                        <input type="text" placeholder="{{translate 'Enter your first name'}}" name="firstName" id="firstName" class="login-register-login-form-input">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="login-register-login-form-controls-group" data-validation="control-group">
                    <label for="lastName">
                        {{translate 'Last Name'}} <span>*</span>
                    </label>
                    <div class="login-register-login-form-controls" data-validation="control">
                        <input type="text" placeholder="{{translate 'Enter your last name'}}" name="lastName" id="lastName" class="login-register-login-form-input">
                    </div>
                </div>
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="selectedCountryGroup">
                {{translate 'COUNTRY OF RESIDENCE'}} <span>*</span>
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="radio" value="US"  data-action="selectedCountryGroup" name="selectedCountryGroup"
                       {{#if selectedCountryGroupUS}} checked {{/if}}/>
                {{translate 'United States'}}

                <input type="radio" value="Other" class="last-radio" data-action="selectedCountryGroup" name="selectedCountryGroup"
                       {{#unless selectedCountryGroupUS}} checked {{/unless}}/>
                {{translate 'Other'}}
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="companyName">
                {{translate 'COMPANY NAME'}} <span> *</span>
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="text" placeholder="{{translate 'Enter your company name'}}" name="companyName" id="companyName" class="login-register-login-form-input">
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="webSite">
                {{translate 'WEBSITE'}}
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="text" placeholder="{{translate 'Enter your website url (ex. http://www.example.com)'}}" name="webSite" id="webSite" class="login-register-login-form-input">
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="businessType">
                {{translate 'BUSINESS TYPE'}}
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <select name="businessType" id="businessType" class="login-register-login-form-controls">
                    <option value="">{{translate '-- Select --'}}</option>
                    {{#each businessOptions}}
                    <option value="{{ id }}">{{ value }}</option>
                    {{/each}}
                </select>
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="taxId">
                {{translate 'TAX ID'}}<span> *</span>
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="text" placeholder="{{translate 'Please enter your nine digit Tax ID Number'}}" name="taxId" id="taxId" class="login-register-login-form-input">
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="taxResaleNumber">
                {{translate 'TAX RESALE NUMBER'}}
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="text" placeholder="{{translate 'Please enter your Tax ID Number if you do not have a Resale number'}}" name="taxResaleNumber" id="taxResaleNumber" class="login-register-login-form-input">
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="numberOfYearsInBusiness">
                {{translate 'NUMBER OF YEARS IN BUSINESS ?'}}
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="number" placeholder="{{translate 'Years in business'}}" name="numberOfYearsInBusiness" id="numberOfYearsInBusiness" class="login-register-login-form-input">
            </div>
        </div>
        <hr class="trade-line">

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="officePhone">
                {{translate 'OFFICE PHONE'}}<span> *</span>
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="tel"
                       placeholder="{{translate 'Area Code and Phone Number'}}"
                       name="officePhone"
                       id="officePhone"
                       class="login-register-login-form-input"
                       data-action="formatPhoneOffice"
                >
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="cellPhone">
                {{translate 'CELL PHONE'}}
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input  type="tel"
                        placeholder="{{translate 'Enter your cell phone number'}}"
                        name="cellPhone"
                        id="cellPhone"
                        class="login-register-login-form-input"
                        data-action="formatPhoneCell"
                >
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="fax">
                {{translate 'FAX'}}
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="tel" placeholder="{{translate 'Enter your Fax number'}}" name="fax" id="fax" class="login-register-login-form-input">
            </div>
        </div>
        <hr class="trade-line">

        <div class="address-edit-fields-container col-sm-offset-3 clearfix">
            <div class="col-md-6">
                <div class="login-register-login-form-controls-group" data-validation="control-group">
                    <label for="email">
                        {{translate 'EMAIL ADDRESS'}}<span> *</span>
                    </label>
                    <div class="login-register-login-form-controls" data-validation="control">
                        <input type="email" placeholder="{{translate 'Enter your Email'}}" name="email" id="email" class="login-register-login-form-input">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="login-register-login-form-controls-group" data-validation="control-group">
                    <label for="email2">
                        {{translate 'Confirm your Email'}}<span> *</span>
                    </label>
                    <div class="login-register-login-form-controls" data-validation="control">
                        <input type="email" placeholder="{{translate 'Confirm your Email'}}" name="email2" id="email2" class="login-register-login-form-input">
                    </div>
                </div>
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="password">
                {{translate 'PASSWORD'}}<span> *</span>
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="password" placeholder="{{translate 'Enter your password, min. 6 characters'}}" name="password" id="password" class="login-register-login-form-input">
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="password2">
                {{translate 'CONFIRM PASSWORD'}}<span> *</span>
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="password" placeholder="{{translate 'Confirm your password'}}" name="password2" id="password2" class="login-register-login-form-input">
            </div>
        </div>
        <hr class="trade-line">

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="street">
                {{translate 'STREET ADDRESS'}}<span> *</span>
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="text" placeholder="{{translate 'Enter your address'}}" name="street" id="street" class="login-register-login-form-input">
            </div>
        </div>

        <div class="login-register-login-form-controls-group" data-validation="control-group">
            <label class="login-register-register-form-label" for="street2">
                {{translate 'STREET ADDRESS 2'}}
            </label>
            <div class="login-register-login-form-controls in-line" data-validation="control">
                <input type="text" placeholder="{{translate 'Enter your address 2'}}" name="street2" id="street2" class="login-register-login-form-input">
            </div>
        </div>
        <div class="address-edit-fields-container col-sm-offset-3 clearfix">
            <div class="col-md-6">
                <div class="login-register-login-form-controls-group" data-validation="control-group">
                    <label for="city">
                        {{translate 'CITY'}}<span> *</span>
                    </label>
                    <div class="login-register-login-form-controls" data-validation="control">
                        <input type="text" placeholder="{{translate 'Enter your city'}}" name="city" id="city" class="login-register-login-form-input">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="login-register-login-form-controls-group"
                     data-view="CountriesDropdown"
                     data-input="country"
                     data-validation="control-group">
                </div>
            </div>
        </div>

        <div class="address-edit-fields-container col-sm-offset-3 clearfix">
            <div class="col-md-6">
                <div class="login-register-login-form-controls-group"
                     data-view="StatesView"
                     data-input="state"
                     data-validation="control-group">
                </div>
            </div>
            <div class="col-md-6">
                <div class="login-register-login-form-controls-group" data-validation="control-group">
                    <label for="zip">
                        {{translate 'ZIP/POSTAL CODE'}}<span> *</span>
                    </label>
                    <div class="login-register-login-form-controls" data-validation="control">
                        <input type="text" placeholder="{{translate 'Enter Zip/Postal Code'}}" name="zip" id="zip" class="login-register-login-form-input">
                    </div>
                </div>
            </div>
        </div>
        <hr class="trade-line">
        <div class="login-register-register-form-controls-group">
            <button type="submit" class="login-register-trade-submit">{{translate 'Create Account'}}  </button>
        </div>
    </form>
    <br>
</section>
