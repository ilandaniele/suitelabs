<section class="pacejet-zip-code-card">
    <span class="pacejet-zip-code-card-content">
        {{translate "Your Zip:"}}
        <button class="enter-button" data-action="open">{{#if show}}{{zipCode}}{{else}}{{translate "Enter a US zip code"}}{{/if}}</button>
        <div class="pop-up">
            <div class="pop-up-main-content">
                <form class="zip-code-form" data-action="zip-code" novalidate>
                    <div data-validation="control-group">
                        <div class="title">{{translate "Zip Code"}}</div>
                        <div class="subtitle">{{translate "For product availability in your area, please verify your zip code"}}</div>
                        <div class="zip-code-form-container {{#if showErrorMessage}}error{{/if}}" data-validation="control">
                            <input type="text" class="zip-code-input" name="zipcode" id="zipcode" value="{{zipCode}}" required="This field is required"></input>
                        </div>
                        <button type="submit" class="apply-button">{{#if show}}{{translate "CHANGE"}}{{else}}{{translate "APPLY"}}{{/if}}</button>
                    </div>
                </form>
            </div>
            <button class="close-button" data-action="close">X</button>
        </div>
    </span>
</section>
