<div class="order-wizard-deliveryinstructions-module">
    {{#if showTitle}}
        <h4 class="order-wizard-deliveryinstructions-module-title">{{translate 'Delivery Specifications'}}</h4>
    {{/if}}
    {{#if liftgateEnabled}}
            <label for="liftgate">
                <input
                    {{isTemporarlyDisabled}}
                        data-action="change-delivery-option"
                        data-option="liftGate"
                        type="checkbox"
                        name="liftgate"
                        id="liftgate"
                        class="order-wizard-shipmethod-module-checkbox"
                        {{#if liftgateChecked}}checked{{/if}}
                        value="T"
                        data-unchecked-value="F"
                />
                <span>
                {{{liftGateTitle}}} {{{liftGateDescription}}}
                </span>
            </label>

    {{/if}}
    {{#if residentialAddressEnabled}}
            <label for="residentialaddress">
                <input
                    {{isTemporarlyDisabled}}
                        data-action="change-delivery-option"
                        data-option="residentialAddress"
                        type="checkbox"
                        id="residentialaddress"
                        name="residentialaddress"
                        class="order-wizard-shipmethod-module-checkbox"
                        {{#if residentialAddressChecked}}checked{{/if}}
                        value="T"
                        data-unchecked-value="F"
                >
                <span>
                    {{{residentialAddressTitle}}} {{{residentialAddressDescription}}}
                </span>
            </label>
    {{/if}}
    {{#if whiteGloveEnabled}}
        <div class="white_glove_section">
            <label class="label_custbody_awa_white_glove {{#if whiteGloveDisabled}}disabled{{/if}}" for="custbody_awa_white_glove">
                {{log this}}
                {{#if isTrade}}
                <input
                        data-action="change-delivery-option"
                        data-option="custbody_awa_white_glove"
                        type="checkbox"
                        id="custbody_awa_white_glove"
                        name="custbody_awa_white_glove"
                        class="order-wizard-shipmethod-module-checkbox"
                    {{#if whiteGloveChecked}}checked{{/if}}
                    {{#if whiteGloveDisabled}}disabled{{/if}}
                        value="T"
                        data-unchecked-value="F"
                >
                {{/if}}
                <span>
                    {{translate whiteGloveTitle}}
                </span>
            </label>
            <span class="wg-message">{{whiteGloveMessage}}</span>
            {{#if whiteGloveChecked}}
                <div data-type="alert-placeholder-module"></div>
                <span class="wg-customer-information">{{translate 'Please provide customer information for delivery updates:'}}</span>
                <small class="wg-edit-fields">{{translate 'Required'}}<span class="wg-fields-group-label-required">*</span></small>
                <div class="wg-fields-group" data-validation="control-group">
                    <label for="custbody_wg_full_name" class="wg-fields-group-label">
                        {{translate 'Full Name'}}
                        <span class="wg-fields-group-label-required">*</span>
                    </label>
                    <div class="wg-fields-group-form-controls" data-validation="control">
                        <input
                                data-action="wg-input-field-option"
                                data-option="custbody_wg_full_name"
                                type="text"
                                id="custbody_wg_full_name"
                                name="custbody_wg_full_name"
                                value="{{options.custbody_wg_full_name}}"
                        >
                    </div>
                </div>
                <div class="wg-fields-group" data-validation="control-group">
                    <label for="custbody_wg_email_address" class="wg-fields-group-label">
                        {{translate 'Email Address'}}
                        <span class="wg-fields-group-label-required">*</span>
                    </label>
                    <div class="wg-fields-group-form-controls" data-validation="control">
                    <input
                            data-action="wg-input-field-option"
                            data-option="custbody_wg_email_address"
                            type="text"
                            id="custbody_wg_email_address"
                            name="custbody_wg_email_address"
                            value="{{options.custbody_wg_email_address}}"
                    >
                    </div>
                </div>
                <div class="wg-fields-group" data-validation="control-group">
                    <label for="custbody_wg_phone_number" class="wg-fields-group-label">
                        {{translate 'Phone Number'}}
                        <span class="wg-fields-group-label-required">*</span>
                    </label>
                    <div class="wg-fields-group-form-controls" data-validation="control">
                        <input
                                data-action="wg-input-field-option"
                                data-option="custbody_wg_phone_number"
                                type="text"
                                id="custbody_wg_phone_number"
                                name="custbody_wg_phone_number"
                                value="{{options.custbody_wg_phone_number}}"
                        >
                    </div>
                </div>
            {{/if}}
        </div>
    {{/if}}
</div>
