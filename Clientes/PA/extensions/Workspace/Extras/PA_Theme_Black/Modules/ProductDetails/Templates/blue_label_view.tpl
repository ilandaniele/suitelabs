<div class="blue-label-title blue-label-approval-link {{#if isQuickView}}quickview {{#if isBlueLabelApproved}}in-cart{{/if}}{{/if}}">
    {{#if isQuickView}}
    <p class="blue-label-quick-title-wrapper">
        <span class="blue-label-image approved"></span>
        <span class="blue-label-title-text">Program Approval Process</span>
    </p>
    {{#unless isBlueLabelApproved}}
        <div data-view="Blue.Label.Options.View"></div>
        {{#unless isQuickView}}
            <a class="product-details-quickview-full-details blue-label" data-action="go-to-fullview" data-touchpoint="home" data-name="view-full-details" data-hashtag="#{{itemUrl}}" href="{{itemUrl}}">
                {{translate 'View full details'}}
            </a>
        {{/unless}}
    {{/unless}}
    {{else}}
    <a href="{{glockPageUrl}}" class="blue-label-glock-plp-page-link"><span class="blue-label-image approved"></span></a>
    <button class="{{#if isBlueLabelApproved}}aprroval-in-process{{/if}}" {{#unless isBlueLabelApproved}}data-modal="blueLabelModal"{{/unless}} type="button">
        <span class="blue-label-image approved"></span>
    </button>
    {{/if}}
</div>