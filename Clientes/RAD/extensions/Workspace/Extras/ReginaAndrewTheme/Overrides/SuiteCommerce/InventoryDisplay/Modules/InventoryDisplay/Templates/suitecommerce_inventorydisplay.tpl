{{#unless isBackorderable}}
  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
  {{#if isInStock}}
    <link itemprop="availability" href="http://schema.org/InStock"/>
  {{else}}
    <link itemprop="availability" href="http://schema.org/OutOfStock"/>
  {{/if}}
  </div>
{{/unless}}

{{#if isLoading}}
  {{ loadingText }}
{{else}}
  {{#if stockMessage}}
  <div class="inventory-display">
    <p class="inventory-display-stock-information-{{messageType}} {{orderType}} inventory-display-message-text">
        <span class="inventory-display-stock-information-{{messageType}} {{orderType}} icon"><i></i></span>
        <span class="inventory-display-message-{{messageType}} {{orderType}}"> {{ stockMessage }}</span>
    </p>
    {{#if quantityAvailableMessage}}
      {{!----
      <p class="inventory-display-quantity-available">
        <span>{{ quantityAvailableMessage }}</span>
      </p>
      ----}}
    {{/if}}
  </div>
  {{/if}}
{{/if}}
