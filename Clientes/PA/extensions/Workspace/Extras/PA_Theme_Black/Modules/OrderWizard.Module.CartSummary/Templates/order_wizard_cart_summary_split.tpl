
<div class="order-wizard-cart-summary-container {{summary_id}}">
  <div class="cart-summary-container">
    <div data-view="Promocode.Notifications"></div>
    <div class="cart-summary-free-shipping" data-view="FreeShipping.Info"></div>
    {{#ifCond bonusBucksBySubtotal.isEnabled '&&' bonusBucksBySubtotal.bonusBucksMessage}}
			{{#if isNotGovermentUser}}
      <div class="bonus-bucks-by-subtotal-message">
				{{{bonusBucksBySubtotal.bonusBucksMessage}}}
			</div>
      {{/if}}
		{{/ifCond}}
    <h3 class="order-wizard-cart-summary-title">{{translate 'Order Summary'}}</h3>    
    <div class="order-wizard-cart-summary-body">
        {{#if showEditCartMST}}
          <div class="order-wizard-cart-summary-edit-cart-label-mst">
            <a href="#" class="order-wizard-cart-summary-edit-cart-link" data-touchpoint="viewcart">
              {{translate 'Edit Cart'}}
            </a>
          </div>
        {{/if}}
      <div class="order-wizard-cart-summary-subtotal">
        <p class="order-wizard-cart-summary-grid-float">
          <span class="order-wizard-cart-summary-grid-right" >
            {{subtotal_formatted}}
          </span>
          <span class="order-wizard-cart-summary-subtotal-label">
            {{#if itemPromotionDiscountTotal }}
              {{translate 'Discounted Subtotal'}}
            {{else}}
              {{#if itemCountGreaterThan1}}
                {{translate 'Subtotal <span class="order-wizard-cart-summary-item-quantity-subtotal" data-type="cart-summary-subtotal-count">$(0) items</span>' itemCount}}
              {{else}}
                {{translate 'Subtotal <span class="order-wizard-cart-summary-item-quantity-subtotal" data-type="cart-summary-subtotal-count">$(0) item</span>' itemCount}}
              {{/if}}
            {{/if}}
          </span>
        </p>
      </div>
      <div class="order-wizard-cart-summary-promocode-applied">
        <div data-view="CartPromocodeListView"></div>
      </div>
      {{#if showDiscount}}
        <div class="order-wizard-cart-summary-discount-applied">
          <p class="order-wizard-cart-summary-grid-float">
            <span class="order-wizard-cart-summary-discount-total">
              {{discounttotal_formatted}}
            </span>
            {{translate 'Discount Total'}}
          </p>
        </div>
      {{/if}}

      {{#if itemPromotionDiscountTotal }}
        <div class="order-wizard-cart-summary-discount-applied">
          <p class="order-wizard-cart-summary-grid-float">
            <span class="order-wizard-cart-summary-discount-total">
              ${{itemPromotionDiscountTotal}}
            </span>
            {{translate 'Discount Applied'}}
          </p>
        </div>
      {{/if}}
  
      {{#if showGiftCertificates}}
        <div class="order-wizard-cart-summary-giftcertificate-applied">
          <p class="order-wizard-cart-summary-gift-certificate">{{translate 'Gift Certificates Applied ($(0))' giftCertificates.length}}</p>
          <div data-view="GiftCertificates"></div>
        </div>
      {{/if}}

        <div class="order-wizard-cart-summary-shipping-cost-applied">
            <p class="order-wizard-cart-summary-grid-float">
              <span class="order-wizard-cart-summary-shipping-cost-formatted">
                {{shippingHandling}}
              </span>
              {{translate 'Shipping'}}
            </p>
            <p class="order-wizard-cart-summary-grid-float">
              <span class="order-wizard-cart-summary-tax-total-formatted" >
                {{taxtotal_formatted}}
              </span>
              {{translate 'Tax'}}
            </p>
        </div>
    
        <div class="order-wizard-cart-summary-total">
            <p class="order-wizard-cart-summary-grid-float">
              <span class="order-wizard-cart-summary-grid-right" >
                {{total_formatted}}
              </span>
              {{translate 'Total'}}
            </p>
        </div>
        {{#if showWarningMessage}}
        <div class="order-wizard-cart-summary-warning" role="alert">
            <div>{{warningMessage}}</div>
        </div>
        {{/if}}
    </div>
    {{#if showGOVDiscountMessage}}
      <div class="gov-discount-message-box discount-cart-summary discount-order-summary">
        <div class="gov-discount-price"><strong>Standard Price:</strong> {{{basePriceQtyOneCartTotal}}}</div>
        <div class="gov-discount-price"><strong>{{{GOVPrielevelLabel}}}:</strong> {{{onlinecustomerpriceTotal}}}</div>
        <div class="gov-discount-percent-box">{{{GOVDiscountPercentLabel}}} {{{GOVDiscountPercent}}}%</div>
      </div>
    {{/if}}
    {{#if betterPerformingDiscountMessage}}
      <div class="gov-better-performing-discount-message-box">
        {{{betterPerformingDiscountMessage}}}
      </div>
    {{/if}}
    {{#if title}}
    <div class="order-name">
      <div class="order-type">
        {{ title }}
      </div>
    </div>
    {{/if}}
</div>