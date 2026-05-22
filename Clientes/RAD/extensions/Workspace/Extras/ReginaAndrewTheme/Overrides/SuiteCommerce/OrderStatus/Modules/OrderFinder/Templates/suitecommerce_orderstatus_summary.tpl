{{#if viewElements.panelTitle.show}}
  <div class="sc-order-status-summary-accordion">
    <div class="sc-order-status-accordion-head">
      <a class="sc-order-status-accordion-head-toggle" data-toggle="collapse"
        data-target="#summary-accordion" aria-expanded="false"
        aria-controls="summary-accordion">
        {{viewElements.panelTitle.label}}
        <i class="sc-order-status-accordion-head-toggle-icon"></i>
      </a>
    </div>
    <div id="summary-accordion" class="sc-order-status-accordion-body in">
      <div class="sc-order-status-accordion-container">
        {{#isgreaterthan summaryData.subtotal 0}}
          {{#if viewElements.subtotal.show }}
            <div class="sc-order-status-summary-line">
              <div class="sc-order-status-summary-line-label">
                <strong>{{viewElements.subtotal.label}}</strong>
              </div>
              <div class="sc-order-status-summary-line-value">
                <strong>{{formatPriceDecimals summaryData.subtotal_formatted}}</strong>
              </div>
              <div class="sc-order-status-clear"></div>
            </div>
          {{/if}}
        {{/isgreaterthan}}
        {{#isgreaterthan summaryData.discountTotal 0}}
          {{#if viewElements.discountTotal.show }}
            <div class="sc-order-status-summary-line">
              <div class="sc-order-status-summary-line-label">
                {{viewElements.discountTotal.label}}
              </div>
              <div class="sc-order-status-summary-line-value">
                {{formatPriceDecimals summaryData.discountTotal_formatted}}
              </div>
              <div class="sc-order-status-clear"></div>
            </div>
          {{/if}}
        {{/isgreaterthan}}
        {{#isgreaterthan summaryData.taxtotal 0}}
          {{#if viewElements.taxtTotal.show }}
            <div class="sc-order-status-summary-line">
              <div class="sc-order-status-summary-line-label">
                {{viewElements.taxtTotal.label}}
              </div>
              <div class="sc-order-status-summary-line-value">
                {{formatPriceDecimals summaryData.taxtotal_formatted}}
              </div>
              <div class="sc-order-status-clear"></div>
            </div>
          {{/if}}
        {{/isgreaterthan}}
        {{#isgreaterthan summaryData.shippingCost 0}}
          {{#if viewElements.shippingCost.show }}
            <div class="sc-order-status-summary-line">
              <div class="sc-order-status-summary-line-label">
                {{viewElements.shippingCost.label}}
              </div>
              <div class="sc-order-status-summary-line-value">
                {{formatPriceDecimals summaryData.shippingCost_formatted}}
              </div>
              <div class="sc-order-status-clear"></div>
            </div>
          {{/if}}
        {{/isgreaterthan}}
        {{#islessthan summaryData.giftCertApplied 0}}
          {{#if viewElements.giftCertApplied.show }}
          <div class="sc-order-status-summary-line">
              <div class="sc-order-status-summary-line-label">
                {{viewElements.giftCertApplied.label}}
              </div>
              <div class="sc-order-status-summary-line-value">
                {{formatPriceDecimals summaryData.giftCertApplied_formatted}}
              </div>
              <div class="sc-order-status-clear"></div>
            </div>
          {{/if}}
        {{/islessthan}}
        {{#isgreaterthan summaryData.total 0}}
          {{#if viewElements.total.show }}
            <div class="sc-order-status-summary-line">
              <div class="sc-order-status-summary-line-label">
                <strong>{{viewElements.total.label}}</strong>
              </div>
              <div class="sc-order-status-summary-line-value">
                <strong>{{formatPriceDecimals summaryData.total_formatted}}</strong>
              </div>
              <div class="sc-order-status-clear"></div>
            </div>
          {{/if}}
        {{/isgreaterthan}}
      </div>
    </div>
  </div>
{{/if}}
