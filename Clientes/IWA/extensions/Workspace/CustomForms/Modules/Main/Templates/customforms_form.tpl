<form data-form-id="{{formId}}" class="cctcustomforms-form container-fixed">
    {{{formContent}}}
    <div class="custom-form-messages" data-type="alert-placeholder"></div>
</form>

{{#if hideBadge}}
    <div class="container-fixed">
        <div class="row">
            <div class="col-md-12">
                <div class="custom-form-grecaptcha-disclaimer">
                    This site is protected by reCAPTCHA and the Google
                    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                </div>
            </div>
        </div>
    </div>

    <style>
        .grecaptcha-badge { visibility: hidden; }
    </style>
{{/if}}
