<div class="sc-order-status-details container">
  <h1 class="sc-order-status-details-title">{{title}}</h1>
  <div class="sc-order-status-details-reset">
    <!--button class="sc-order-status-details-reset-button" data-action="resetSearch">
      {{viewElements.searchButtonLabel}}
    </button-->
  </div>
  <div class="sc-order-status-details-number">
    <h3>{{viewElements.orderNumberLabel}}</h3>
  </div>
  <div class="sc-order-status-details-info">
    <div class="sc-order-status-details-info-status">
      {{#if viewElements.orderStatus.show}}
        <h4 class="highlight-status{{#if orderDetails.statusRequiresHighlight}}-{{orderDetails.highlightColor}}{{/if}}">
          {{orderDetails.status}}
        </h4>
      {{/if}}
    </div>
    <div class="sc-order-status-details-info-shipping-date">
      {{#if viewElements.orderDate.show}}
        {{viewElements.orderDate.label}}
      {{/if}}
    </div>
  </div>
  <div class="sc-order-status-details-summary">
    <div class="sc-order-status-details-summary-order">
      <div data-view="OrderFinder.Summary"></div>
      <div data-view="OrderFinder.PaymentInfo"></div>
    </div>
    <div class="sc-order-status-details-summary-item">
      <div class="sc-order-status-details-summary-item-header">
        {{#if viewElements.itemColumn.show }}
          <div class="sc-order-status-details-summary-item-header-item">
            <h5>{{viewElements.itemColumn.label}}</h5>
          </div>
        {{/if}}
        {{#if viewElements.quantityColumn.show }}
          <div class="sc-order-status-details-summary-item-header-quantity">
            <h5>{{viewElements.quantityColumn.label}}</h5>
          </div>
        {{/if}}
        {{#if viewElements.statusColumn.show }}
          <div class="sc-order-status-details-summary-item-header-status">
            <h5>{{viewElements.statusColumn.label}}</h5>
          </div>
        {{/if}}
        <div class="sc-order-status-clear"></div>
      </div>
      {{#each orderDetails.itemDetails}}
      <div class="sc-order-status-details-summary-item-line">
        {{#if ../viewElements.itemColumn.show }}
          <div class="sc-order-status-details-summary-item-line-item">
              {{#if thumbnail}}
                  <div class="awa-order-status-improvements-thumbnail">
                      <img class="awa-order-status-improvements-thumbnail-image" src="{{resizeImage thumbnail.url 'tinythumb'}}" alt="{{thumbnail.altimagetext}}" />
                  </div>
                  <div class="awa-order-status-improvements-content">
                      <p><strong>{{name}}</strong></p>
                      <p><small>{{translate 'SKU:'}} {{sku}}</small></p>
                      <p><small>{{translate 'Expected Ship Date:'}} {{itemShipDate}}</small></p>
                      <p><small>{{amount}}</small></p>
                      <p><small>{{translate 'Total:'}} {{formatPriceDecimals totalFormated}}</small></p>
                  </div>
              {{else}}
                  <p><strong>{{name}}</strong></p>
                  <p><small>{{translate 'SKU:'}} {{sku}}</small></p>
                  <p><small>{{amount}}</small></p>
                  <p><small>{{translate 'Total:'}} {{formatPriceDecimals totalFormated}}</small></p>
              {{/if}}
          </div>
        {{/if}}
        {{#if ../viewElements.quantityColumn.show }}
          <div class="sc-order-status-details-summary-item-line-quantity">
            {{quantity}}
          </div>
        {{/if}}
        {{#if ../viewElements.statusColumn.show }}
          <div class="sc-order-status-details-summary-item-line-status">
            <p>
              <strong>
                {{status}}
              </strong>
            </p>
            {{#if isForShipping}}
              {{#each trackingNumbers}}
                <p>
                  <small>
                    <a target="_blank" href="https://www.google.com/search?q={{this}}">
                      {{#if ../../viewElements.trackPackage.show}}
                        {{../../viewElements.trackPackage.label}}
                      {{/if}}
                      {{this}}
                    </a>
                  </small>
                </p>
              {{/each}}
              {{#if showDifferentAddressLabel }}
                <p>
                  <small>
                    <strong>
                      <i>{{../viewElements.shipDifferentAddressLabel}}</i>
                    </strong>
                  </small>
                </p>
              {{/if}}
            {{/if}}
            {{#if isForPickUpInStore }}
              <p>
                <small><strong>{{location.name}}</strong></small>
              </p>
            {{/if}}
            {{#if showDetailsButton }}
              <p>
                <small>
                  <a href="#" data-action="openItemDetails" data-row-index="{{itemLine}}">
                    {{../viewElements.viewDetailsLabel}}
                  </a>
                </small>
              </p>
            {{/if}}
          </div>
        {{/if}}
        <div class="sc-order-status-clear"></div>
      </div>
      {{/each}}
    </div>
  </div>

  <div class="sc-order-status-details-reset">
    <button class="sc-order-status-details-reset-button" data-action="resetSearch">
      {{viewElements.searchButtonLabel}}
    </button>
  </div>
</div>
