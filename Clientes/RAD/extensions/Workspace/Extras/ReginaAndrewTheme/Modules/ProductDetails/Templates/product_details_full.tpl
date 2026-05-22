<div class="product-details-full">
	<div data-cms-area="item_details_banner" data-cms-area-filters="page_type"></div>

	<header class="product-details-full-header">
		<div id="banner-content-top" class="product-details-full-banner-top"></div>
	</header>
	<article class="product-details-full-content" >
		<meta itemprop="url" content="{{itemUrl}}">
		<div id="banner-details-top" class="product-details-full-banner-top-details"></div>

		<section class="product-details-full-main-content">
			<div class="product-details-full-content-header">

				<div data-cms-area="product_details_full_cms_area_1" data-cms-area-filters="page_type"></div>

				<h1 class="product-details-full-content-header-title" itemprop="name">{{pageHeader}}</h1>
                <!--div class="product-details-full-rating" data-view="Global.StarRating"></div-->
                <div data-view="ItemDetails.Header"></div>
				<div data-cms-area="item_info" data-cms-area-filters="path"></div>
			</div>
			
			<div class="product-details-full-main-content-left">
				<div class="product-details-full-image-gallery-container">
					<div id="banner-image-top" class="content-banner banner-image-top"></div>
					<div data-view="Product.ImageGallery"></div>

					{{#if model.item.custitem_vectary_3d_model_url}}
						<script>
						document.getElementById("3d-modal").addEventListener("click", function() {
							var modalUrl = document.getElementById("3d-modal-iframe").dataset.src;
							console.log("Injecting 3D Modal URL: " + modalUrl)
							document.getElementById("3d-modal-iframe").src = modalUrl;

							window.addEventListener('popstate', function (event) {
								document.body.className = document.body.className.replace("modal-open", "");

								var modalBackdrop = document.getElementsByClassName("modal-backdrop");
								for (var i=0; i<modalBackdrop.length; i++) {
									var elm = modalBackdrop[i];
									elm.parentNode.removeChild(elm);
								}
								window.removeEventListener('popstate', this);
							});

							var finishes = document.getElementsByClassName("3d-model-finish");
							if (finishes && finishes.length) {
								for (var i=0; i<finishes.length; i++) {
									if (finishes[i].dataset.modelid == modalUrl) {
										console.log('Found matching finish - setting to active');
										finishes[i].classList.add("active");
									}

									finishes[i].addEventListener("click", function(e) {
										var finishLinks = document.getElementsByClassName("3d-model-finish");
										for (var j=0; j<finishLinks.length; j++) {
											finishLinks[j].classList.remove("active");
										}
										e.target.classList.add("active");

										var modelid = e.target.dataset.modelid;
										var iframeElm = document.getElementById("3d-modal-iframe").cloneNode(true);
										iframeElm.src = modelid;

										console.log('Injecting 3D Modal URL: ' + modelid);

										var iframePrev = document.getElementById("3d-modal-iframe");
										iframePrev.parentNode.removeChild(iframePrev);

										document.getElementById("3d-modal-iframe-container").appendChild(iframeElm);
									});
								}
							}
						});
						</script>

						<div class="product-details-3d-model">
							<a href="#" data-toggle="modal" id="3d-modal" data-target="#3dModal">View In My Room</a>
						</div>
						<div id="3dModal" class="modal fade" role="dialog">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"><i class="fa fa-ext-cross"></I></button>
										<h4 class="modal-title">{{pageHeader}}</h4>
									</div>
									<div class="modal-body">

										<div data-view="PDPCustomFieldVectary3dModelView"></div>

										<p id="3d-modal-iframe-container"><iframe id="3d-modal-iframe" src="" data-src="{{model.item.custitem_vectary_3d_model_url}}" width="100%" height="500" frameborder="0"></iframe></p>
									</div>
									<div class="modal-footer">
										NOTE: 3D model sizes can vary and are not an exact replica of the actual product. Electrical cords, pipes, and chains may not be shown for lighting products.
									</div>
								</div>
							</div>
						</div>
					{{/if}}

					<div id="banner-image-bottom" class="content-banner banner-image-bottom"></div>

					<div data-cms-area="product_details_full_cms_area_2" data-cms-area-filters="path"></div>
					<div data-cms-area="product_details_full_cms_area_3" data-cms-area-filters="page_type"></div>
				</div>
			</div>

			<div class="product-details-full-main-content-right">
			<div class="product-details-full-divider"></div>
                <div data-view="Product.Sku"></div>
                {{#if isPriceEnabled}}
                    <div data-view="WasPrice.View"></div>
                {{/if}}
                <div data-view="Product.Price"></div>
                <div class="product-details-full-main">

                    {{#if isItemProperlyConfigured}}
                        <form id="product-details-full-form" data-action="submit-form" method="POST">
							<div data-cms-area="product_details_full_cms_area_extra_1" data-cms-area-filters="path"></div>
                            
							{{#if model.item.custitem_unavailable_messaging}}
                                <section class="item-details-unavailable">
                                    <p>
                                        {{{model.item.custitem_unavailable_messaging}}}
                                    </p>
                                </section>
                            {{/if}}

							<div data-cms-area="product_details_full_cms_area_extra_2" data-cms-area-filters="path"></div>

                            <div data-view="Romance.Description"></div>

                            <div data-view="Stock.Messaging"></div>

                            <div data-view="Quantity.Pricing"></div>

                            <section data-view="Product.Options" class="product-options-container {{#if isTrade}}trade-user{{/if}}"></section>
                            <div data-cms-area="product_details_full_cms_area_4" data-cms-area-filters="path"></div>

                            <div data-view="Quantity.Pricing"></div>
                            <div class="product-stock-childview" data-view="Product.Stock.Info"></div>
                            <div data-view="PDPCustomFieldFutureAvailabilityView"></div>
                            <div class="pdp-custom-short-container">
                                {{#if isPriceEnabled}}
                                    <div data-view="Quantity"></div>
                                    <div data-view="BulbUpsellView"></div>
                                        <section class="product-details-full-actions clearfix">
                                            <div class="product-details-full-actions-container">
                                                <div data-view="MainActionView"></div>
                                                <div  data-view="ItemActions"></div>
                                            </div>
                                            
                                            <!-- div class="product-details-full-actions-container">
                                                >                                    <div data-view="AddToProductList" class="product-details-full-actions-addtowishlist"></div



                                                <div data-view="ProductDetails.AddToQuote" class="product-details-full-actions-addtoquote"></div>
                                            </div-->
                                        </section>
                                {{/if}}
                                <div data-view="StockDescription"></div>
                                <section data-view="Product.Information"></section>
                                {{#if isJewelry}}
                                    <section class='jewelry-warning'>
                                        <div>
                                            {{ translate shippingWarning }}
                                        </div>
                                    </section>
                                {{/if}}

								<div class="item-details-tab-content item-details-tab-content-social-sharing">
									<div class="item-details-tab-content-panel">
										<button class="" type="button" data-toggle="collapse" data-target="#product-details-social-sharing" aria-expanded="true" aria-controls="#product-details-social-sharing">
											<span class="item-details-tab-content-panel-title">{{translate 'Share'}}<i class="toggle-icon"></i></span>
										</button>
										<div class="collapse in" id="product-details-social-sharing" aria-expanded="true">
											<div class="card card-body">
												<div data-view="SocialSharing.Flyout" class="product-details-full-social-sharing"></div>
											</div>
										</div>
									</div>
								</div>

                                <div class="pdp-right-bottom-container">
                                    <div class="pdf-link-container pdp-action-element">
                                        <div data-view="PDFGenerator"></div>
                                    </div>
									<div class="favorites-wrap pdp-action-element" data-type="favorites-control"></div>
                                    <div data-view="AddToProductList" class="pdp-action-element product-details-full-actions-addtowishlist"></div>
                                    {{#if showAssamblyInstructions}}
                                        <div data-view="AssamblyInstructions" class="pdp-action-element product-details-full-actions-addtowishlist"></div>
                                    {{/if}}
                                    {{#if isTrade}}
                                        <div data-view="ProductDetails.AddToQuote" class="pdp-action-element product-details-full-actions-addtoquote"></div>
                                    {{/if}}
                                </div>

                                <div class="product-details-full-main-bottom-banner">
                                    <div id="banner-summary-bottom" class="product-details-full-banner-summary-bottom"></div>
                                </div>
                            </div>
                        </form>
                    {{else}}
                        <div data-view="GlobalViewsMessageView.WronglyConfigureItem"></div>
                    {{/if}}

                    <div class="item-details-main-bottom-container">
                        <div class="item-details-download-info">
                            {{{model.item.custitem_vendor_spec_sheet}}}
                        </div>
                    </div>
                </div>
			</div>

		</section>

		<div class="product-details-full-divider-desktop"></div>

        {{#if model.item.custitem_pdp_show_related_items}}
            <div class="product-details-full-divider-desktop"></div>
            <div class="product-details-full-content-correlated-items">
                <div class="item-relations-correlated">
                    {{#if model.item.custitem_pdp_related_items_title}}
                        <h3>{{model.item.custitem_pdp_related_items_title}}</h3>
                    {{else}}
                        <h3>{{translate 'Related Styles'}}</h3>
                    {{/if}}
                </div>
                <div data-view="Related.Items"></div>
            </div>
        {{/if}}

	    <div data-cms-area="product_details_full_cms_area_foursixty" data-cms-area-filters="page_type"></div>

		<div data-cms-area="product_details_full_cms_area_7" data-cms-area-filters="path"></div>

		<div data-cms-area="product_details_full_cms_area_8" data-cms-area-filters="path"></div>

        <div class="product-details-full-divider-desktop"></div>
		{{!----
		<div class="product-details-full-content-correlated-items">
			<div data-view="Correlated.Items"></div>
		</div>
		 ----}}
        <div class="item-details-tab-content item-details-tab-content-reviews">
            <div class="item-details-tab-content-panel">
                <button class="collapsed" type="button" data-toggle="collapse" data-target="#product-details-rating" aria-expanded="false" aria-controls="#product-details-rating">
                    <span class="item-details-tab-content-panel-title">{{translate 'Ratings & Reviews'}}<i class="toggle-icon"></i></span>
                </button>
                <div class="collapse collapsed" id="product-details-rating" aria-expanded="false">
                    <div class="card card-body">
                        <div data-view="ProductReviews.Center"></div>
                    </div>
                </div>
            </div>
        </div>
		<div id="banner-details-bottom" class="content-banner banner-details-bottom" data-cms-area="item_details_banner_bottom" data-cms-area-filters="page_type"></div>
	</article>
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
