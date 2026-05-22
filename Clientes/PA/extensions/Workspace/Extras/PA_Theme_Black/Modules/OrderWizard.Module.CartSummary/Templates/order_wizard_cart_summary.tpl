{{#if needSplitting }}
	{{#if isInProgress}}
		<div class="loading-message order-wizard-cart-summary-container" style="display:block;">
		  	<div class="cart-summary-container">
				<div class="order-wizard-cart-summary-title">
					<h3> {{translate 'Order Summary'}} </h3>
				</div>
				<div style="padding:15px;font-style: italic;" class="split-wait-text"> {{waitText}}</div>
		  	</div>			
		</div>
	{{/if}}
{{/if}}
  
{{#unless isInProgress}}
  	{{#if enableCouponValidations}}
  		{{#if enableCheckoutPageValidations}}
  			{{#if enableCouponExclusionTooltip}}
				{{#if_eq itemPromotionDiscountTotal 0}}
					<div class="promo-code-toll-wrapper">
						<div>
							<a class="collapsed" data-toggle="collapse" data-target="#eligible-brand-container" aria-expanded="false" aria-controls="eligible-brand-container">
								*<u class="promo-instruction">{{translate 'Non-Eligible Brands for Coupon'}}</u>
								<i data-toggle="tooltip" class="fas fa-exclamation-triangle" 
								title="{{translate '<b>Coupon Exclusions</b><br>Please Click to see brands not eligible for coupon.'}}">
								</i>				
							</a>										
						</div>
						<div class="non-eligible-brands  collapse" id="eligible-brand-container" aria-expanded="false">
							<div ><ul class="excluded-brands">{{{tooltipText}}}</ul></div>
						</div>
					</div>
				{{/if_eq}}
  			{{/if}}
  		{{/if}}
  	{{/if}}
{{/unless}}
  
{{#if hasPromocodeRemovalMessage}}
<div class="promocodeRemovalMessage">
    <div class="global-views-message global-views-message-warning alert" role="alert">
      	<div>{{{promocodeRemovalMessage}}}</div>  
      	<button class="global-views-message-button" data-action="close-message" type="button" data-dismiss="alert">×</button>  
    </div>
</div>
{{/if}}

<div>
{{#unless isInProgress}}
    {{#unless isMultiOrder}}
      	<div data-view="Promocode.Notifications"></div>
		  <div data-view="Credova.Errors.Notifications"></div>
      	<div class="order-wizard-cart-summary-container">
          	<div class="cart-summary-container">
            	<div class="cart-summary-free-shipping" data-view="FreeShipping.Info"></div>
            	{{#ifCond bonusBucksBySubtotal.isEnabled '&&' bonusBucksBySubtotal.bonusBucksMessage}}
              	{{#if isNotGovermentUser}}
				<div class="bonus-bucks-by-subtotal-message">
                	{{{bonusBucksBySubtotal.bonusBucksMessage}}}
              	</div>
				{{/if}}
            	{{/ifCond}}
				<h3 class="order-wizard-cart-summary-title">
				{{translate 'Order Summary'}}
				</h3>    
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
								{{model.summary.subtotal_formatted}}
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
							{{model.summary.discounttotal_formatted}}
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
    
						<!--{{#if showHandlingCost}}
						<p class="order-wizard-cart-summary-grid-float">
							<span class="order-wizard-cart-summary-handling-cost-formatted">
							{{model.summary.handlingcost_formatted}}
							</span>
							{{translate 'Handling'}}
						</p>
						{{/if}}-->
						<p class="order-wizard-cart-summary-grid-float">
						<span class="order-wizard-cart-summary-tax-total-formatted" >
							{{model.summary.taxtotal_formatted}}
						</span>
						{{translate 'Tax'}}
						</p>
					</div>
    
					<div class="order-wizard-cart-summary-total">
						<p class="order-wizard-cart-summary-grid-float">
							<span class="order-wizard-cart-summary-grid-right" >
								{{model.summary.total_formatted}}
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
				{{#if OrderTitlePreOrder}}
				<div class="order-name">
					<div class="order-type">{{ OrderTitlePreOrder }}</div>
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
		</div>
	{{/unless}}
{{/unless}}
	<div data-view="Order.Summary.Regular"></div>
	<div data-view="Order.Summary.Preorder"></div>
	{{#if multiShipmentText}}
	<div class="order-wizard-cart-summary-multi-shipment-text">{{{multiShipmentText}}}</div>
    {{/if}}
</div>
{{#if isSubscribedForShippingUpdatesEnabled }}
  	<div class="subscribe-for-shipping-updates-wrap">
    	<label class="subscribe-for-shipping-updates-fields-group-input-checkbox" data-action="subscribe-for-shipping-updates">
      	<input type="checkbox" {{#if isSubscribedForShippingUpdatesChecked}} checked {{/if}} />
      	{{translate subscribeForShippingUpdatesLabel }}
    	</label>
  	</div>
{{/if}}

{{#if isSubscribedForPromotionsUpdatesEnabled}}
	{{#unless isSubscribedForPromotionsOptIn}}
		<div class="login-register-register-form-controls-group">
				<label class="login-register-register-form-label">
					<input type="checkbox" name="emailsubscribe" id="register-emailsubscribe" data-action="subscribe-for-promotions-updates" value="T" {{#if isEmailSubscribeChecked}} checked {{/if}}>
					{{translate 'Yes, Please sign me up for  exclusive offers and promotions from Primary Arms'}}
				</label>
		</div>
	{{/unless}}
{{/if}}