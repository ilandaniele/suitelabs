<div class="rma-form-view">
    <!-- TEMPLATE STARTS: scf_form-->
    <section class="rma-form-container">
        <div class="rma-form-sub-form-container">
            <p class="rma-form-heading" id="return-policy-heading">{{translate title }}</p>
            {{#if isFormSubmitted}}
                {{#if isSuccess}}
                <form class="store-credits-message-success">
                    <div class="form-group row">
                        <label class="col-xs-6 col-form-label col-form-label-code">
                            {{translate 'Gift Certificate / Bonus Bucks Code' }}
                        </label>

                        <label class="col-xs-6 col-form-label-value col-form-label-value-code">
                            {{data.code}}
                        </label>
                    </div>
                    <div class="form-group row">
                        <label class="col-xs-6 col-form-label">
                            {{translate 'Original Amount' }}
                        </label>
                        <label class="col-xs-6 col-form-label-value">
                            {{data.amount_org_formatted}}
                        </label>
                    </div>
                    <div class="form-group row">
                        <label class="col-xs-6 col-form-label">
                            {{translate 'Remaining Balance' }}
                        </label>
                        <label class="col-xs-6 col-form-label-value">
                            {{data.amount_rem_formatted}}
                        </label>
                    </div>
                    <div class="form-group row">
                        <label class="col-xs-6 col-form-label">
                            {{translate 'Expiration Date' }}
                        </label>
                        <label class="col-xs-6 col-form-label-value">
                            {{data.date_expiration}}
                        </label>
                    </div>
                    <div class="form-group row">
                        <button type="button" class="btn btn-primary pull-right" data-action="navigate-back">{{translate 'Back' }}</button>
                    </div>
                </form>
                {{/if}}
            {{/if}}

            {{#unless isFormSubmitted}}
            <form class="store-credits-form" method="POST">
                <div class="form-group" data-validation="control-group">
                    <label class="label-email" for="store-credits-form-email">
                        {{translate 'Email address <small class="store-credits-form-email-required">*</small>'}}
                    </label>
                    <div class="store-credits-form-controls" data-validation="control">
                        <input name="email" type="email" class="form-control" id="store-credits-form-email"
                            aria-describedby="emailHelp" placeholder="{{translate 'your@email.com'}}">
                    </div>
                </div>
                <div class="form-group" data-validation="control-group">
                    <label class="label-code" for="store-credits-form-code">
                        {{translate 'Gift Certificate/Bonus Bucks Code <small class="store-credits-form-code-required">*</small>'}}
                    </label>
                    <div class="store-credits-form-controls" data-validation="control">
                        <input name="code" type="code" class="form-control" id="store-credits-form-code"
                            aria-describedby="codeHelp" placeholder="{{translate 'Enter Code'}}">
                    </div>
                </div>

                {{#if hasErrors}}
                    <div data-view="NoGiftCertificateFound"></div>
                {{/if}}

                <button type="submit" class="btn btn-primary">{{translate 'Submit' }}</button>
            </form>
            {{/unless}}
        </div>
    </section>
    <!-- TEMPLATE ENDS: rma_form -->
</div>