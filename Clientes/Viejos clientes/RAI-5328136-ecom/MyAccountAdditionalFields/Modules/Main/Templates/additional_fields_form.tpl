<div class="profile-information additional-fields">
    <h2 class="additional-fields-form-title">{{ translate 'ADDITIONAL_FIELDS_FORM_TITLE' }}</h2>
    <p class="additional-fields-form-description">{{ translate 'ADDITIONAL_FIELDS_FORM_DESCRIPTION' }}</p>

    <form class="additional-fields-form" novalidate>
        <div data-validation="control-group" class="additional-fields-field-container">
            <div data-validation="control">
                <hr>
                <label>{{{ translate 'ADDITIONAL_FIELDS_CATEGORY' }}}</label>
                <hr>
                <select id="category" name="category" class="category-select">
                    {{#each categories}}
                        <option value="{{id}}">{{name}}</option>
                    {{/each}}
                </select>
                <hr>
                <br>

                <label class="cursive">{{ translate 'ADDITIONAL_FIELDS_INSTRUCTIONS_PRACTICE_MANAGER' }}</label>
                <br>

                <div class="additional-fields-info-container">
                    <div class="additional-fields-row">
                        <label><span class="input-required"> * </span>{{{ translate 'ADDITIONAL_FIELDS_PRACTICE_MANAGER' }}}</label>
                        <span >
                            <input class="input-large format-input" name="practiceManager" type="text" id="practiceManager">
                        </span>
                    </div>

                    <div class="additional-fields-row">
                        <label><span class="input-required"> * </span>{{{ translate 'ADDITIONAL_FIELDS_PRACTICE_MANAGER_EMAIL' }}}</label>
                        <span >
                            <input class="input-large format-input" name="practiceManagerEmail" type="text" id="practiceManagerEmail">
                        </span>
                    </div>

                    <div class="additional-fields-row">
                        <label><span class="input-required"> * </span>{{{ translate 'ADDITIONAL_FIELDS_PRACTICE_MANAGER_PHONE' }}}</label>
                        <span >
                            <input class="input-large format-input" name="practiceManagerPhone" type="text" id="practiceManagerPhone">
                        </span>
                    </div>

                    <div class="additional-fields-row">
                        <label>{{ translate 'ADDITIONAL_FIELDS_PHYSICIAN' }}</label>
                        <span >
                            <input class="input-large format-input" name="physician" type="text" id="physician">
                        </span>
                    </div>

                    <div class="additional-fields-row">
                        <label>{{ translate 'ADDITIONAL_FIELDS_PHYSICIAN_EMAIL' }}</label>
                        <span >
                            <input class="input-large format-input" name="physicianEmail" type="text" id="physicianEmail">
                        </span>
                    </div>

                    <div class="additional-fields-row">
                        <label>{{ translate 'ADDITIONAL_FIELDS_PHYSICIAN_PHONE' }}</label>
                        <span >
                            <input class="input-large format-input" name="physicianPhone" type="text" id="physicianPhone">
                        </span>
                    </div>

                    <div class="additional-fields-row">
                        <label><span class="input-required"> * </span>{{ translate 'ADDITIONAL_FIELDS_ACCOUNTS_PAYABLE' }}</label>
                        <span>
                            <input class="input-large format-input" name="accountsPayable" type="text" id="accountsPayable">
                        </span>
                    </div>

                    <div class="additional-fields-row">
                        <label><span class="input-required"> * </span>{{ translate 'ADDITIONAL_FIELDS_ACCOUNTS_PAYABLE_EMAIL' }}</label>
                        <span >
                            <input class="input-large format-input" name="accountsPayableEmail" type="text" id="accountsPayableEmail">
                        </span>
                    </div>

                    <div class="additional-fields-row">
                        <label><span class="input-required"> * </span>{{ translate 'ADDITIONAL_FIELDS_ACCOUNTS_PAYABLE_PHONE' }}</label>
                        <span >
                            <input class="input-large format-input" name="accountsPayablePhone" type="text" id="accountsPayablePhone">
                        </span>
                    </div>
                </div>

                <label class="cursive low-opacity">{{ translate 'ADDITIONAL_FIELDS_INSTRUCTIONS_INVOICE_EMAIL' }} </label>
                <br>
                <label><span class="input-required"> * </span>{{ translate 'ADDITIONAL_FIELDS_INVOICE_EMAIL' }}</label>
                <span>
                    <input class="input-large" name="invoiceEmail" type="text" id="invoiceEmail">
                </span>
                <hr>

                <label>{{{ translate 'ADDITIONAL_FIELDS_CREDIT_CARD_INVOICE' }}}</label>
                <br>
                <span>
                    <input class="" name="creditCardOrInvoice" type="radio" id="creditCard" value="creditCard">
                </span>
                <label for="creditCard">{{ translate 'ADDITIONAL_FIELDS_CREDIT_CARD' }}</label>
                <br>
                <span>
                    <input class="" name="creditCardOrInvoice" type="radio" id="invoice" value="invoice">
                </span>
                <label for="invoice">{{ translate 'ADDITIONAL_FIELDS_INVOICE' }}</label>

                <hr>
                <label>{{{ translate 'ADDITIONAL_FIELDS_INSTRUCTIONS_CREDIT_CARD_INVOICE' }}}</label>
                <hr>
                <label>{{{ translate 'ADDITIONAL_FIELDS_INSTRUCTIONS_CREDIT_CARD_INVOICE_DUPLICATE' }}}</label>
                <label>{{{ translate 'ADDITIONAL_FIELDS_TAX_EXEMPT_ID' }}}</label>
                <span>
                    <input class="input-large" name="taxExemptId" type="text" id="taxExemptId">
                </span>
                <hr>

                <label class="cursive low-opacity">{{ translate 'ADDITIONAL_FIELDS_INSTRUCTIONS_THIRD_PARTY_CARRIER' }} </label>
                <br>
                <label>{{ translate 'ADDITIONAL_FIELDS_THIRD_PARTY_CARRIER' }}</label>
                <select id="thirdPartyCarrier" name="thirdPartyCarrier" class="third-party-carrier-select">
                    {{#each carriers}}
                        <option value="{{value}}">{{text}}</option>
                    {{/each}}
                </select>
                <label>{{ translate 'ADDITIONAL_FIELDS_THIRD_PARTY_ACCT' }}</label>
                <span>
                    <input class="input-large" name="thirdPartyAcct" type="text" id="thirdPartyAcct">
                </span>
                <hr>
                <label class="cursive">
                    {{ translate 'ADDITIONAL_FIELDS_PROVIDER_LOCATOR' }}
                    <span>
                        <input class="additional-fields-provider-locator" name="providerLocator" type="checkbox" id="providerLocator">
                    </span>
                </label>
            </div>
        </div>

        <button type="submit" class="additional-fields-submit-button button-medium button-primary">
            {{ translate 'Update' }}
        </button>

        <div class="additional-fields-checkout-success-message">
            {{#if successMessage}}
                {{ translate 'ADDITIONAL_FIELDS_SUCCESS_MESSAGE' }}
            {{else}}
                {{#if errorMessage}}
                    {{ translate errorMessage }}
                {{/if}}
            {{/if}}
        </div>
    </form>
</div>
