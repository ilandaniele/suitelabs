<div class="cookie-modal-confirmation-content">
    <div class="cookie-modal-confirmation-logo">
        <img class="cookie-modal-confirmation-image" src="{{getThemeAssetsPathWithDefault logoURL 'img/porthos-logo-popup.png'}}" alt="{{siteName}}">
    </div>
    <h3 class="cookie-modal-confirmation-welcome">{{welcome}}</h3>
    <div class="cookie-modal-confirmation-description">
        {{{description}}}
    </div>
    <div class="cookie-modal-confirmation-date-form" data-validation="control-group">
        <div class="cookie-modal-confirmation-date-form-controls" data-validation="control">
            <select name="cookie-modal-day" id="cookie-modal-day" class="cookie-modal-confirmation-date-select">
                {{#each days}}
                    <option value="{{value}}">
                        {{value}}
                    </option>
                {{/each}}
            </select>
            <select name="cookie-modal-month" id="cookie-modal-month" class="cookie-modal-confirmation-date-select">
                {{#each months}}
                    <option value="{{id}}">
                        {{value}}
                    </option>
                {{/each}}
            </select>
            <select name="cookie-modal-year" id="cookie-modal-year" class="cookie-modal-confirmation-date-select">
                {{#each years}}
                    <option value="{{value}}">
                        {{value}}
                    </option>
                {{/each}}
            </select>
        </div>
        <div class="cookie-modal-confirmation-date-form-controls">
            <button class="cookie-modal-confirmation-date-submit" data-action="verify-age-birthdate">Verify Age</button>
        </div>
        <div class="cookie-modal-confirmation-date-form-controls">
            <p class="cookie-modal-confirmation-date-young-age" data-action="verify-young-age">{{translate 'I&apos;m not 18'}}</p>
        </div>
    </div>
</div>