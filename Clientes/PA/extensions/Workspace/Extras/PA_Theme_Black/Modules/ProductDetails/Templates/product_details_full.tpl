<div class="product-details-full">
	{{#ifCond enableBackToSearchResult '&&' searchResultUrl}}
		<a class="product-details-back-to-search-result" data-action="go-back-to-search-results">
			<i class="fa fa-angle-left" aria-hidden="true"></i>{{translate 'Back to Search Result'}}
		</a>
	{{/ifCond}}
	<div data-cms-area="item_details_banner" data-cms-area-filters="page_type"></div>

	<header class="product-details-full-header">
		<div id="banner-content-top" class="product-details-full-banner-top"></div>
	</header>
	<div class="product-details-full-divider-desktop"></div>
	<article class="product-details-full-content" itemscope itemtype="https://schema.org/Product">
		<meta itemprop="url" content="{{itemUrl}}">
		<div id="banner-details-top" class="product-details-full-banner-top-details"></div>

		<section class="product-details-full-main-content">
			<div class="product-details-full-content-header">
				<div itemprop="offers" itemscope itemtype="https://schema.org/Offer"></div>
				<div data-cms-area="product_details_full_cms_area_1" data-cms-area-filters="page_type"></div>
				<h1 class="product-details-full-content-header-title" itemprop="name">{{model.item._pageTitle}}</h1>
				<div class="item-details-manufacturer-container show-mobile">
					<div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
						<meta itemprop="name" content="{{model.item.manufacturer}}" />
					</div>
					<div class="item-details-manufacturer">{{translate 'Manufactured by '}}<a href="brand{{betweenFacetNameAndValue}}{{brandURL}}">{{model.item.manufacturer}}</a></div>
				</div>
				{{#if isPhoneDevice}}
					<div class="product-details-full-rating show-mobile" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
						<div class="product-details-full-rating-wrap" data-action="reviewsClick" data-view="Global.StarRating"></div>
					</div>
				{{/if}}
				<div data-cms-area="item_info" data-cms-area-filters="path"></div>
			</div>
			<div class="product-details-full-divider show-mobile"></div>
			<div class="product-details-full-main-content-left">
				<div class="product-details-full-image-gallery-container">
					<div id="banner-image-top" class="content-banner banner-image-top"></div>
					<div data-view="Product.ImageGallery"></div>
					<div class="img-icon-zoom">
            			<img class="icon-zoom" src="{{getThemeAssetsPath 'img/Icons/zoom_in_grey.svg'}}" >		
                    </div>
					{{#if youTube}}
					<div class="item-details-video-container hide-mobile col-xs-12">
						<ul class="bxslider" data-video-slider>
							{{{youTube}}}
						</ul>
					</div>
					{{/if}}
					<div id="banner-image-bottom" class="content-banner banner-image-bottom"></div>

					<div data-cms-area="product_details_full_cms_area_2" data-cms-area-filters="path"></div>
					<div data-cms-area="product_details_full_cms_area_3" data-cms-area-filters="page_type"></div>
				</div>
			</div>

			<div class="product-details-full-main-content-right">
			<div class="product-details-full-divider"></div>

			<div class="product-details-full-main">
				{{#if isItemProperlyConfigured}}
					<form id="product-details-full-form" data-action="submit-form" method="POST">

						<section class="product-details-full-info">
							<div id="banner-summary-bottom" class="product-details-full-banner-summary-bottom"></div>
						</section>

						<div data-cms-area="product_details_full_cms_area_4" data-cms-area-filters="path"></div>

						<div data-view="Product.Sku"></div>

						{{#if model.item.mpn}}
							<div class="product-line-mpn-container">
								<span class="product-line-sku-label">
									MPN:
								</span>
								<span class="product-line-sku-value" itemprop="mpn">
									{{model.item.mpn}}
								</span>
							</div>
						{{/if}}
						<div class="item-details-manufacturer-container hide-mobile">
							<div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
								<meta itemprop="name" content="{{model.item.manufacturer}}" />
							</div>
						  <div class="item-details-manufacturer">{{translate 'Manufactured by '}}<a href="brand{{betweenFacetNameAndValue}}{{brandURL}}">{{model.item.manufacturer}}</a></div>
						</div>
						{{#unless isPhoneDevice}}
						<div class="product-details-full-rating hide-mobile" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
							<div class="product-details-full-rating-wrap" data-action="reviewsClick" data-view="Global.StarRating"></div>
						</div>
						{{/unless}}

						<div class="product-details-stock-price-{{#if blue_label_item}}blue-label-{{/if}}wrapper">
							<div class="price-customizations flex">
								<div class="product-details-full-product-price-wrapper {{#if model.item.custitem_map_type}}map-type{{/if}}" data-view="Product.Price"></div>								
							</div>							
							<!-- <div data-view="Quantity.Pricing"></div> -->
							<div class="product-details-full-product-stock-status-wrapper" data-view="Product.Stock.Info"></div>
							{{#if isVerifiedDiscontinuedItem}}
								<div class="verifiedDiscontinuedItemSalesPageLink">
									<a href="{{verifiedDiscontinuedItemSalesPageLink}}">{{verifiedDiscontinuedItemSalesPageText}}</a>
								</div>
							{{/if}}
							{{#unless isVerifiedDiscontinuedItem}}
								<div class="product-details-full-eta-msg-wrapper" data-view="ETA.Message"></div>
								{{!-- Blue Label Program View --}}
								{{#if blue_label_item}}
								<div class="product-details-full-blue-label-container {{#if model.item.custitem_map_type}}map-type{{/if}}{{#unless isCurrentItemPurchasable}}out-of-stock{{/unless}}" data-view="Blue.Label.View"></div>
								{{/if}}
								{{!-- Blue Label Program View --}}
							{{/unless}}
						</div>

						<div data-view="MILE.Message.View"></div>

						{{#if showGOVDiscountMessage}}
								<div class="gov-discount-message-box">
									<div class="gov-discount-price"><strong>Standard Price:</strong> <span>{{{basePriceQtyOne}}}</span></div>
									<div class="gov-discount-price"><strong>{{{GOVPrielevelLabel}}}:</strong> <span>{{{onlinecustomerprice}}}</span></div>
									<div class="gov-discount-percent-box">{{{GOVDiscountPercentLabel}}} <span>{{{GOVDiscountPercent}}}</span></div>
								</div>
						{{/if}}
						
						{{#unless isVerifiedDiscontinuedItem}}
							<div data-view="Widget.Item.Credova"></div>
							<div class="product-details-quick-view-getitby" data-view="GetItBy.View"></div>
						{{/unless}}
						
						

						<!--  gift certificate message -->
						{{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}
						{{#if isNotGovermentUser}}
							<div class="item-details-incentive-message item-gift-certificate-message {{#if hideGiftCertificateMessage}}hide{{/if}}" style="float:none;">
								<div class="pdp-gift-message-text">
									<img class="icon-moneybill" src="{{getThemeAssetsPathWithDefault moneyBillWaveIcon 'img/Icons/icon-awesome-money-bill-wave.svg'}}" alt="Money Bill Wave Icon" width="34" height="30">
									<span>{{{giftCertificateMessage}}}</span>
									<div class="pdp-gift-message-tool-tip">
										<div class="gift-message-tooltip-trigger">
											<img  class="not-hover-state" src="{{getThemeAssetsPathWithDefault infoOutlineIcon 'img/Icons/icon-material-info-outline.svg'}}" alt="Money Bill Wave Icon" width="23" height="23">
											<img class="hover-state" src="{{getThemeAssetsPathWithDefault infoOutlineIconHover 'img/Icons/icon-material-info-outline-hover.svg'}}" alt="Money Bill Wave Icon" width="23" height="23">
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
							<section class="product-details-full-limit-message" data-view="Limit.Message"></section>
							<section class="product-details-full-shipping-message" data-view="Shipping.Message"></section>
						{{/unless}}

						{{#if showPriceMsgGov}}
							{{{showPriceMsgGovMessage}}}
						{{/if}}

						{{#unless isNonSellableItem}}
						<section data-view="Product.Options"></section>
						{{/unless}}
						{{#if hasAddonOptions}}
						<div class="item-details-content-related-items">
							<div data-view="AddonOptions.Items"></div>
						</div>
						{{/if}}

						<!-- Button trigger modal -->
						{{!-- {{#if blue_label_item}}
							<div data-view="Blue.Label.View"></div>
						{{/if}} --}}

						{{#if isPriceEnabled}}
							{{#unless hideMainActionButton}}
								{{#unless isVerifiedDiscontinuedItem}}
									{{#unless isPhoneDevice}}
										<div data-view="Quantity" class="col-xs-6 col-xs-offset-3 col-sm-3 col-sm-offset-0 pa-quantity-wrapper"></div>
									{{/unless}}
								{{/unless}}
							{{/unless}}

							{{#unless isNonSellableItem}}
							{{#if isPhoneDevice}}
								{{#unless isVerifiedDiscontinuedItem}}
									<div class="mobile-fixed-quantity-addtocart-wrap active">
										{{#if isCurrentItemPurchasable}}
										<div data-view="Quantity" class="mobile-fixed-quantity-holder"></div>
										{{/if}}
										<div data-view="MainActionView" class="mobile-fixed-addtocart-holder {{#unless isCurrentItemPurchasable}}full{{/unless}}"></div>
									</div>
								{{/unless}}
							{{/if}}
							{{/unless}}

							{{#unless isNonSellableItem}}
							<section class="product-details-full-actions product-details-full-actions-container-qty-add-to-cart {{#if isCurrentItemPurchasable}}col-sm-9{{else}}col-sm-12{{/if}}">
								<div class="product-details-full-actions-container product-details-full-actions-container-qty-add-to-cart-child {{#unless isCurrentItemPurchasable}}full-width-action{{/unless}}  {{#if hideMainActionButton}}my-0{{/if}}">
									{{#unless hideMainActionButton}}
										{{#unless isVerifiedDiscontinuedItem}}
											{{#if isPhoneDevice}}
												<div data-view="Quantity" class="col-xs-6 col-xs-offset-3 col-sm-3 col-sm-offset-0 pa-quantity-wrapper"></div>
											{{/if}}
										{{/unless}}
									{{/unless}}
									<div data-view="MainActionView" class="{{#unless isCurrentItemPurchasable}}full-width-main-action{{/unless}}"></div>
								</div>
								<div class="product-details-full-actions-container product-details-full-actions-container-wishlist-quote-wrap  {{#ifCond isMountItem '||' mil_le_exclude}}override-stock-status{{/ifCond}} col-sm-6">
									{{#unless mil_le_exclude}}
										<div data-view="AddToProductList" class="product-details-full-actions-addtowishlist {{#if hideMainActionButtonDropship}}px-0{{/if}}"></div>
									{{/unless}}
									{{#if quotePermissions}}
										<div data-view="ProductDetails.AddToQuote" class="product-details-full-actions-addtoquote"></div>
									{{/if}}
								</div>
							</section>
							{{/unless}}
						{{/if}}
						{{#if isNonSellableItem}}
						<div class="product-details-full-contact-price-link-wrapper">
							<a class="product-details-full-contact-price-link" href="mailto:{{emailIds}}"> <i class="header-email-icon"></i>Contact For Price</a>
						</div>
						{{/if}}

						{{#if isWebsiteWarningMessageEnabled}}
							{{#if isRestrictionMessageEnabled}}
								{{#unless isRestrictionMessageEmpty }}
									<div class="restriction-message">
										<div class="item-details-message"> 
											<a class="item-details-message-head collapsed" data-toggle="collapse" data-target="#accordion-id" aria-expanded="false" aria-controls="accordion-id"> 
												<i class="fa fa-exclamation-triangle"></i> {{{restrictionMessageTitle}}} <i class="acordion-head-toggle-icon"></i> 
											</a>
										</div>
										<div class="item-details-message-content collapse" id="accordion-id">
											<p>{{{restrictionMessage}}}</p>
										</div>
									</div>
								{{/unless}}
							{{/if}}
						{{/if}}

						<div data-view="StockDescription"></div>

						{{#unless isVerifiedDiscontinuedItem}}
							<div class="product-details-full-social-sharing-wrapper">
								<!-- <div data-view="SocialSharing.Flyout" class="product-details-full-social-sharing"></div> -->
								
								<!-- Wrapped with div tag - product-details-full-social-sharing-wrapper , for the Request PAI-179 -->
								<!-- START: Addition of Norton Shopping Guarantee Block -->	
									<div class="norton-guarantee-container" {{#if isNonSellableItem}}style="display:none;"{{/if}}>	
										<span id="_GUARANTEE_Kicker" name="_GUARANTEE_Kicker" type="Kicker Custom 4"></span>	
									</div>	
								<!-- END: Addition of Norton Shopping Guarantee Block -->
							</div>	
						{{/unless}}
						
						<div class="product-details-full-main-bottom-banner">
							<div id="banner-summary-bottom" class="product-details-full-banner-summary-bottom"></div>
						</div>
					</form>
				{{else}}
					<div data-view="GlobalViewsMessageView.WronglyConfigureItem"></div>
				{{/if}}

				<div id="banner-details-bottom" class="product-details-full-banner-details-bottom" data-cms-area="item_info_bottom" data-cms-area-filters="page_type"></div>
			</div>
			</div>

		</section>

		<div data-cms-area="product_details_full_cms_area_5" data-cms-area-filters="page_type"></div>
		<div data-cms-area="product_details_full_cms_area_6" data-cms-area-filters="path"></div>
		
		{{#if agency_request_for_quote_enable}}
			<div data-view="RequestForQuote.View"></div>		
		{{/if}}
		{{#if isVerifiedDiscontinuedItem}}
			<div data-view="Listrak.Recommender"></div>
		{{/if}}
		<div class="row">
			<div class="col-sm-12 col-md-7">
				<section data-view="Product.Information"></section>
				<div class="hide-mobile item-details-manual-wrap col-xs-12">
					{{#if manualUrl1}}
						<div class="item-details-manual">
							<div href="{{manualUrl1}}" data-lity>
								<i id="manualicon" class="fa fa-file-pdf-o"></i> {{model.item._sku}} <span id="manual">{{translate 'MANUAL'}}{{#if manualUrl2}} 1{{/if}}</span>
							</div>
						</div>
					{{/if}}
					{{#if manualUrl2}}
						<div class="item-details-manual">
							<div href="{{manualUrl2}}" data-lity>
								<i id="manualicon" class="fa fa-file-pdf-o"></i> {{model.item._sku}} <span id="manual">{{translate 'MANUAL'}} 2</span>
							</div>
						</div>
					{{/if}}
					{{#if manualUrl3}}
					<div class="item-details-manual">
						<div href="{{manualUrl3}}" data-lity>
							<i id="manualicon" class="fa fa-file-pdf-o"></i> {{model.item._sku}} <span id="manual">{{translate 'MANUAL'}} 3</span>
						</div>
					</div>
					{{/if}}
				</div>
			</div>

			<div class="item-details-attributes-container col-sm-12 col-md-5">
				<button class="item-details-attributes-pusher" data-target="item-details-attributes" data-type="sc-pusher">
				<p class="item-details-attributes-header">{{translate 'Specifications'}}</p>
				<i></i> </button>
				<div class="item-details-attributes" data-action="pushable" data-id="item-details-attributes">
					<p class="item-details-attributes-header">{{translate 'Specifications'}}</p>
					{{#if specificationsAttributes}}
						{{#each specificationsAttributes.attributes}}
							{{#if value}}
								<div id="attribute-row"> 
								<span id="attribute-name">{{attribute}}</span> 
								<span id="attribute-value">{{value}}</span> 
								</div>
							{{/if}}
						{{/each}}
					{{/if}} 
				</div>
			</div>
			<div class="show-mobile col-xs-12 mobile-manual-wrap">
				{{#if manualUrl1}}
					<div class="item-details-manual">
						<a href="{{manualUrl1}}" target="_blank">
							<i id="manualicon" class="fa fa-file-pdf-o"></i> {{model.item._sku}} <span id="manual">{{translate 'MANUAL'}}{{#if manualUrl2}} 1{{/if}}</span>
						</a>
					</div>
				{{/if}}
				{{#if manualUrl2}}
					<div class="item-details-manual">
						<a href="{{manualUrl2}}" target="_blank">
							<i id="manualicon" class="fa fa-file-pdf-o"></i> {{model.item._sku}} <span id="manual">{{translate 'MANUAL'}} 2</span>
						</a>
					</div>
				{{/if}}
				{{#if manualUrl3}}
				<div class="item-details-manual">
					<a href="{{manualUrl3}}" target="_blank">
						<i id="manualicon" class="fa fa-file-pdf-o"></i> {{model.item._sku}} <span id="manual">{{translate 'MANUAL'}} 3</span>
					</a>
				</div>
				{{/if}}
			</div>
			{{#if youTube}}
				<div class="item-details-video-container show-mobile col-xs-12">
					<ul class="bxslider" data-video-slider>
						{{{youTube}}}
					</ul>
				</div>
			{{/if}}
		</div>
		<div class="product-details-full-divider-desktop"></div>

		{{#if prop65Message}}
			<div class="item-details-divider-desktop"></div>
			<div class="prop65-message-container">
			<p><i class="fa fa-exclamation-triangle"></i> <b>WARNING:</b> {{{ prop65Message }}} For more information, see <a href="https://www.p65warnings.ca.gov/" target="_blank">www.p65warnings.ca.gov</a></p>
			</div>
			<div class="product-details-full-divider-desktop"></div>
		{{/if}}

		<div data-cms-area="product_details_full_cms_area_7" data-cms-area-filters="path"></div>
		<div data-cms-area="product_details_full_cms_area_9" data-cms-area-filters="page_type"></div>
		{{#unless isVerifiedDiscontinuedItem}}
			<div data-view="Listrak.Recommender"></div>
		{{/unless}}
		{{#if enableRelatedCorrelatedItem}}
			<div class="product-detail-full-related-correlated-wrap">
				{{#if showFirstRelatedItem}}	
					<div class="product-details-full-content-related-items">
						<div data-view="Related.Items"></div>
					</div>
				{{/if}}
				{{#if showUpSellItem}}
					<div class="product-details-full-content-correlated-items product-details-full-content-related-items">
						<div data-view="Correlated.Items"></div>
					</div>
				{{/if}}
				{{#if showSecondRelatedItem}}
					<div class="product-details-full-content-related-items">
						<div data-view="Related.Items"></div>
					</div>
				{{/if}}
			</div>
		{{/if}}

		<div data-view="ProductReviews.Center"></div>

		<div data-cms-area="product_details_full_cms_area_8" data-cms-area-filters="path"></div>
		
		<div id="banner-details-bottom" class="content-banner banner-details-bottom" data-cms-area="item_details_banner_bottom" data-cms-area-filters="page_type"></div>
	</article>
    <div id="videoModal1" class="video-modal">
		<div id="overlay" class="video-wrapper overlay">
			<video id="custommodal" class="video-player" controls playsinline preload="none">
				<source id="modalVideoSource1" type="video/mp4">
			</video>
			<span id="closeModalBtn" class="closeModal"><i class="deal-ribbon-close"></i></span>
		</div>
		<button id="restartButton" class="restart-button" title="Replay"><svg xmlns="http://www.w3.org/2000/svg"
				width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path d="M32 4a28 28 0 1 0 20 8" stroke="#000" stroke-width="4"></path>
				<path d="M30 24L44 32 30 40 30 24z" fill="#000"></path>
				<path d="M42 2 L42 12 L52 12" fill="none" stroke="#000" stroke-width="4"></path></svg>
		</button>
	</div>
</div>

{{!----
Use the following context variables when customizing this template:

	model (Object)
	model.item (Object)
	model.item.internalid (Number)
	model.item.type (String)
	model.quantity (Number)
	model.options (Array)
	model.options.0 (Object)
	model.options.0.cartOptionId (String)
	model.options.0.itemOptionId (String)
	model.options.0.label (String)
	model.options.0.type (String)
	model.location (String)
	model.fulfillmentChoice (String)
	pageHeader (String)
	itemUrl (String)
	isItemProperlyConfigured (Boolean)
	isPriceEnabled (Boolean)

----}}
