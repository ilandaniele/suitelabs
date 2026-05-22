<div id="cookieconsent-banner" class="cookieconsent-overlay-banner-{{bannerPosition}}">
    <div class="cookieconsent-overlay-banner-container" id="cookieconsent-container" aria-labelledby="bannerHeading" tabindex="-1"
         role="alert">
        <div class="cookieconsent-overlay-banner-container-info">
            {{#if bannerHeading}}
                <h1 id="bannerHeading" class="cookieconsent-overlay-banner-container-info-heading">{{translate
                        bannerHeading}}</h1>
            {{/if}}
            <div class="cookieconsent-overlay-banner-container-info-text">{{{translate bannerText}}}</div>
        </div>
        <div class="cookieconsent-overlay-banner-container-actions">
            <button data-action="acceptAll" type="button" class="cookie-accept" aria-label="{{translate 'Accept All'}}">Accept & Close</button>
        </div>
    </div>
</div>