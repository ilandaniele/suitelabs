{{#if showView}}
<div class="stock-notifications-accordion accordion-head">
  <a class="accordion-head-toggle-custom{{#if isAccordionClosed}} collapsed{{/if}}"
    data-toggle="collapse"
    data-target="#accordion-id"
    data-action="stocknotifications-dropdown-show"
    aria-expanded="{{#if isAccordionOpen}}true{{else}}false{{/if}}"
    aria-controls="accordion-id"
  >
    {{translate 'Email me when item is back in stock'}}
  </a>
</div>
<div id="accordion-id"
  class="accordion-body collapse{{#if isAccordionOpen}} in{{/if}}"
  aria-expanded="{{#if isAccordionOpen}}true{{else}}false{{/if}}"
>
  <div class="stocknotifications-form-wrapper">
    <p class="stocknotifications-subscribing-item">{{{subscribingToMessage}}}</p>
    <div data-view="StockNotifications.Subscription.Create"></div>
  </div>
</div>
{{/if}}


