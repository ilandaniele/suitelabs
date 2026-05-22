<div class="product-details-quickview">
	<div class="product-details-quickview-img">
		<div data-view="Product.ImageGallery"></div>
		{{#if promoLink}}
			<div class="promotion-link-container">
				<span class="promotion-link-button" data-action="promotion.link.button">* Click here for rebate</span>
			</div>
		{{/if}}
	</div>
	<div class="product-details-quickview-details">

		<h1 class="product-details-quickview-item-name" itemprop="name">
			<a href="{{itemUrl}}" class="product-details-quick-view-item-url" data-action="go-to-fullview" data-touchpoint="home" data-name="view-full-details" data-hashtag="#{{itemUrl}}">
				{{#if model.item.pagetitle}}
					{{model.item.pagetitle}}
				{{else}}
					{{pageHeader}}
				{{/if}}
			</a>
		</h1>

		<div class="product-details-quickview-main">
			{{#if isItemProperlyConfigured}}
				<form id="product-details-quickview-form" data-action="submit-form" method="POST">

					<section class="product-details-quickview-info">

						<div id="banner-summary-bottom" class="product-details-quickview-banner-summary-bottom"></div>

					</section>

					<div data-view="Product.Sku"></div>
					
					<div class="product-details-quickview-manufacture-wrapper">
						<span class="product-details-quickview-manufacture-text">Manufactured By</span>
						<a href="brand{{betweenFacetNameAndValue}}{{brandURL}}" class="product-details-quickview-manufacture-url" data-touchpoint="home" data-hashtag="brand{{betweenFacetNameAndValue}}{{brandURL}}">{{model.item.manufacturer}}</a>
					</div>
					
					<div class="price-customizations flex">
						<div data-view="Product.Price" class="pull-left"></div>
						<div class="clearfix"></div>	
					</div>
					
					{{!-- <div data-view="Quantity.Pricing"></div> --}}
					
					<div class="product-details-quick-view-stock-info-eta-wrapper">
						<div class="product-details-quick-view-stock-info" data-view="Product.Stock.Info"></div>
						{{#if isVerifiedDiscontinuedItem}}
							<div class="verifiedDiscontinuedItemSalesPageLink">
								<a href="{{verifiedDiscontinuedItemSalesPageLink}}">{{verifiedDiscontinuedItemSalesPageText}}</a>
							</div>
						{{/if}}
						{{#unless isVerifiedDiscontinuedItem}}
							<div class="product-details-quickview-eta-msg-wrapper" data-view="ETA.Message"></div>
						{{/unless}}
					</div>

					<div data-view="MILE.Message.View"></div>
					
					{{#unless isVerifiedDiscontinuedItem}}
						<div data-view="Widget.Item.Credova"></div>
						<div class="product-details-quick-view-getitby" data-view="GetItBy.View"></div>
					{{/unless}}

					<!--  gift certificate message -->
					{{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}
					{{#if isNotGovermentUser}}
						<div class="item-details-incentive-message item-gift-certificate-message {{#if hideGiftCertificateMessage}}hide{{/if}}" style="float:none;">
							<div class="pdp-gift-message-text">
								<img class="icon-moneybill" src="{{getThemeAssetsPathWithDefault moneyBillWaveIcon 'img/Icons/icon-awesome-money-bill-wave.svg'}}" alt="Money Bill Wave Icon">
								<span>{{{giftCertificateMessage}}}</span>
								<div class="pdp-gift-message-tool-tip">
									<div class="gift-message-tooltip-trigger">
										<img class="not-hover-state" src="{{getThemeAssetsPathWithDefault infoOutlineIcon 'img/Icons/icon-material-info-outline.svg'}}" alt="Money Bill Wave Icon">
										<img class="hover-state" src="{{getThemeAssetsPathWithDefault infoOutlineIconHover 'img/Icons/icon-material-info-outline-hover.svg'}}" alt="Money Bill Wave Icon">
										<div class="gift-message-tooltip-target">
											{{{giftCertificateMessageToolTip}}}
										</div>
									</div>
								</div>
							</div>
						</div>
						{{/if}}
					{{/ifCond}}

									
					
					{{#unless isVerifiedDiscontinuedItem}}
						<section class="product-details-quick-view-limit-message" data-view="Limit.Message"></section>
						<section class="product-details-quick-view-shipping-message" data-view="Shipping.Message"></section>
					{{/unless}}

					{{#if isPriceEnabled}}						
						<section data-view="Product.Options"></section>
						{{#if hasAddonOptions}}
			            <div class="item-details-content-related-items">
			              <div data-view="AddonOptions.Items"></div>
			            </div>
					  	{{/if}}
			          
						<!-- START: Addition of Norton Shopping Guarantee Block -->
						<div class="norton-guarantee-container" {{#if isNonSellableItem}}style="display:none;"{{/if}}>
							<span id="_GUARANTEE_Kicker" name="_GUARANTEE_Kicker" type="Kicker Custom 4"></span>
						</div>
						<!-- END: Addition of Norton Shopping Guarantee Block -->
						
						{{#ifCond blue_label_item '&&' isBlueLabelApproved}}
							<div data-view="Blue.Label.View"></div>
						{{/ifCond}}

						{{#if blue_label_item}}
							<div class="product-details-quickview-form-action-container {{#unless isCurrentItemPurchasable}}out-of-stock{{/unless}} {{#unless isBlueLabelApproved}}collapse{{/unless}}">
								{{#if isCurrentItemPurchasable}}
									{{#unless isVerifiedDiscontinuedItem}}
										<div class="product-details-quickview-quantity" data-view="Quantity"></div>
									{{/unless}}
								{{/if}}
								
								<div class="product-details-quickview-actions-container">
									<div data-view="MainActionView"></div>
								</div>
								<div class="product-details-quickview-actions-container">
									<div data-view="AddToProductList" class="product-details-quickview-actions-container-add-to-wishlist"></div>
									<!-- <div data-view="ProductDetails.AddToQuote" class="product-details-quickview-actions-container-add-to-quote"></div> -->
								</div>
							</div>
						{{else}}
							<div class="product-details-quickview-form-action-container {{#unless isCurrentItemPurchasable}}out-of-stock{{/unless}}">
								{{#unless hideMainActionButton}}
									{{#unless isVerifiedDiscontinuedItem}}
										<div class="product-details-quickview-quantity" data-view="Quantity"></div>
									{{/unless}}
								
								
								<div class="product-details-quickview-actions-container" {{#if hideMainActionButtonDropship}}data-action="dropship-hide"{{/if}}>
									<div data-view="MainActionView"></div>
								</div>
								{{/unless}}
								{{#unless isNonSellableItem}}
								<div class="product-details-quickview-actions-container {{#ifCond isMountItem '||' mil_le_exclude}}override-stock-status{{/ifCond}}">
									{{#unless mil_le_exclude}}
										<div data-view="AddToProductList" class="product-details-quickview-actions-container-add-to-wishlist {{#if hideMainActionButtonDropship}}mt-5{{/if}}"></div>
										<!-- <div data-view="ProductDetails.AddToQuote" class="product-details-quickview-actions-container-add-to-quote"></div> -->
									{{/unless}}
								</div>
								{{/unless}}
								{{#if isNonSellableItem}}
								<a class="product-details-quickview-contact-price-link" href="mailto:{{emailIds}}"> <i class="header-email-icon"></i>Contact For Price</a>
								{{/if}}

								<!-- <section class="product-details-quickview-actions">

									<div class="product-details-quickview-actions-container">
										<div data-view="MainActionView"></div>
									</div>
									<div class="product-details-quickview-actions-container">
										<div data-view="AddToProductList" class="product-details-quickview-actions-container-add-to-wishlist"></div>
										<div data-view="ProductDetails.AddToQuote" class="product-details-quickview-actions-container-add-to-quote"></div>
									</div>

								</section> -->
							</div>
						{{/if}}
					{{/if}}

					<div data-view="StockDescription"></div>

					<div class="product-details-quickview-main-bottom-banner">
						<div id="banner-summary-bottom" class="product-details-quickview-banner-summary-bottom"></div>
					</div>
				</form>
			{{else}}
				<div data-view="GlobalViewsMessageView.WronglyConfigureItem"></div>
			{{/if}}

			<a class="product-details-quickview-full-details {{#unless isBlueLabelApproved}}collapse{{/unless}}" data-action="go-to-fullview" data-touchpoint="home" data-name="view-full-details" data-hashtag="#{{itemUrl}}" href="{{itemUrl}}">
				{{translate 'View full details'}}
			</a>

			<div class="clearfix"></div>

			<div id="banner-details-bottom" class="product-details-quickview-banner-details-bottom" data-cms-area="item_info_bottom" data-cms-area-filters="page_type"></div>
		</div>

	</div>
	<!--  Blue Label Program -->
	{{#ifCond blue_label_item '&&' isCurrentItemPurchasable}}
		{{#unless isBlueLabelApproved}}
			<div data-view="Blue.Label.View"></div>
			<div class="product-details-quickview-details blue-label-quickview">
				<div class="product-details-quickview-form-action-container {{#unless isCurrentItemPurchasable}}out-of-stock{{/unless}}">
					{{#if isCurrentItemPurchasable}}
						{{#unless isVerifiedDiscontinuedItem}}
							<div class="product-details-quickview-quantity" data-view="Quantity"></div>
						{{/unless}}
					{{/if}}
					
					<div class="product-details-quickview-actions-container">
						<div data-view="MainActionView"></div>
					</div>
					<div class="product-details-quickview-actions-container">
						<div data-view="AddToProductList" class="product-details-quickview-actions-container-add-to-wishlist"></div>
						<!-- <div data-view="ProductDetails.AddToQuote" class="product-details-quickview-actions-container-add-to-quote"></div> -->
					</div>
				</div>
				<a class="product-details-quickview-full-details" data-action="go-to-fullview" data-touchpoint="home" data-name="view-full-details" data-hashtag="#{{itemUrl}}" href="{{itemUrl}}">
					{{translate 'View full details'}}
				</a>
			</div>
		{{/unless}}
	{{/ifCond}}
	<!--  Blue Label Program -->
</div>


{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}
