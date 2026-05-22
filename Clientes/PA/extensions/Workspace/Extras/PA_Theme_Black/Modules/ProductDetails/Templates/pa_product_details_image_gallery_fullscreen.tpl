<div class="product-details-image-gallery fullscreen">
	{{#if showImages}}
		{{#if showImageSlider}}
			<ul class="bxslider" data-slider>
				{{#each images}}
					<li class="product-details-image-gallery-container">
						{{#if ../enableLazyLoad}}	
							<div class="lazy-wrapper">
								<img
									class="lazy"
									src="img/bx_loader.gif"
									data-src="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId }}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}"
									alt="{{altimagetext}}"
									itemprop="image">
							</div>					
							
						{{else}}
							<img
								src="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId }}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}"
								alt="{{altimagetext}}"
								itemprop="image"
								width="1100" height="1100">
						{{/if}}
					</li>
				{{/each}}
			</ul>
		{{else}}
			{{#with firstImage}}
				<link itemprop="image" href="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId}}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}" />
				<div class="product-details-image-gallery-detailed-image">					
					{{#if enableLazyLoad}}	
						<img
							class="center-block lazy"
							src="img/bx_loader.gif"
							data-src="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId}}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}"
							alt="{{altimagetext}}"
							itemprop="image"
							width="1100" height="1100">
					{{else}}
						<img
							class="center-block"
							src="{{brightedgeImageDomain 'noWebsiteDomain' ../imageResizeId}}{{resizeImage url ../imageResizeId 'removeImageUrlProtocol'}}"
							alt="{{altimagetext}}"
							itemprop="image"
							width="1100" height="1100">
					{{/if}}
				</div>
			{{/with}}

		{{/if}}
	{{/if}}	
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
