<div class="product-details-image-gallery">
	{{#ifCond isCreditMessageEnable '&&' hasCreditAmount}}
	{{#if isNotGovermentUser}}
		<div class="bonus-bucks-badge-plp">
			<img class="icon-moneybill" src="{{getThemeAssetsPathWithDefault moneyBillIcon 'img/Icons/bonus-bucks-icon-on-item-cell.svg'}}" alt="Money Bill Icon" width="34" height="30">
			<div class="bonus-bucks-text">
				{{translate 'Bonus'}}<br><strong>{{translate 'Bucks'}}</strong>
			</div>
		</div>
		{{/if}}
	{{/ifCond}}
	{{#if showImages}}
		{{#if showImageSlider}}
			{{#each images}}
				<link itemprop="image" href="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId}}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}" />
			{{/each}}
			<ul class="bxslider" data-slider>
				{{#each images}}
					<li data-zoom class="product-details-image-gallery-container">		
						{{#if ../enableLazyLoad}}	
							<div class="lazy-wrapper">
								<img
									class="lazy"
									src="img/bx_loader.gif"
									data-src="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId }}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}"
									alt="{{altimagetext}}"
									itemprop="image"
									data-loader="false" slide-index="{{@index}}">
							</div>	
						{{else}}
								<img
									src="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId }}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}"
									alt="{{altimagetext}}"
									itemprop="image"
									data-loader="false" width="320" height="220" slide-index="{{@index}}">
						{{/if}}
					</li>
				{{/each}}
			</ul>
		{{else}}
			{{#with firstImage}}
				<link itemprop="image" href="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId}}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}" />
				<div class="product-details-image-gallery-detailed-image" data-zoom>	
					{{#if enableLazyLoad}}				
						<img
							class="center-block lazy"
							src="img/bx_loader.gif"
							data-src="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId}}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}"
							alt="{{altimagetext}}"
							itemprop="image"
							data-loader="false" width="320" height="220">
					{{else}}
						<img
							class="center-block"
							src="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId}}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}"
							alt="{{altimagetext}}"
							itemprop="image"
							data-loader="false" width="320" height="220">
					{{/if}}
				</div>
			{{/with}}

		{{/if}}
	{{/if}}
	<!-- <div data-view="SocialSharing.Flyout.Hover"></div> -->
</div>




{{!----
Use the following context variables when customizing this template:

	imageResizeId (String)
	images (Array)
	firstImage (Object)
	firstImage.altimagetext (String)
	firstImage.url (String)
	showImages (Boolean)
	showImageSlider (Boolean)

----}}
