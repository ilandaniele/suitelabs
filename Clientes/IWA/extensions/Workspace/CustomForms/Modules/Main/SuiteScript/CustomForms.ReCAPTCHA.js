define('CustomForms.ReCAPTCHA', [

], function CustomFormsReCAPTCHA(

) {
    'use strict';

    return {
        getReCAPTCHAValidatorUrl: function getReCAPTCHAValidatorUrl() {
            return nlapiResolveURL(
                'SUITELET',
                'customscript_cms_form_recaptcha_validato',
                'customdeploy_cms_form_recaptcha_validato',
                true
            );
        },

        validate: function validate(data, secretKeyId) {
            var requestBody;
            var reCAPTCHAValidatorUrl;
            var reCAPTCHAValidatorResponse;
            var reCAPTCHAValidatorParsedResponse;

            try {
                requestBody = {
                    secretKeyId: secretKeyId,
                    gReCAPTCHAToken: data.gReCAPTCHAToken,
                    remoteIP:
                        request.getHeader('true-client-ip') ||
                        request.getHeader('ns-client-ip') ||
                        undefined
                };
                reCAPTCHAValidatorUrl = this.getReCAPTCHAValidatorUrl();
                reCAPTCHAValidatorResponse = nlapiRequestURL(
                    reCAPTCHAValidatorUrl,
                    JSON.stringify(requestBody)
                );
                reCAPTCHAValidatorParsedResponse = JSON.parse(
                    reCAPTCHAValidatorResponse.getBody() || '{}'
                );

                nlapiLogExecution(
                    'error',
                    'reCAPTCHAValidatorParsedResponse',
                    reCAPTCHAValidatorParsedResponse
                );
                nlapiLogExecution(
                    'error',
                    'JSON.stringify(reCAPTCHAValidatorParsedResponse)',
                    JSON.stringify(reCAPTCHAValidatorParsedResponse)
                );
            } catch (e) {
                nlapiLogExecution('error', 'Error Validating ReCAPTCHA', e);
            }

            return (
                reCAPTCHAValidatorParsedResponse &&
                reCAPTCHAValidatorParsedResponse.response &&
                reCAPTCHAValidatorParsedResponse.response.success
            );
        }
    };
});
