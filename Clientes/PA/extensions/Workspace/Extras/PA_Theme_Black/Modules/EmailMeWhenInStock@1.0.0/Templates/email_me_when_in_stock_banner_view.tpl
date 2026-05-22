{{#if isMobile}}
	<div class="home grid mobile">
		<div class="row-2-cell-1 cls-placeholder">
			{{#if showBannerCarousel}}
				<div class="home-slider-container">
					<div class="home-image-slider brands-slider">
						<ul data-slider class="home-image-slider-list">
							{{#each carouselImagesMobile}}
								<li>
									<div class="home-slide-main-container">
										<div class="home-slide-image-container" {{objectToAtrributes this}}>
											<a href="{{bannerHref}}" class="home-slider-banner-link" id="banner_{{@index}}">
												<img src="{{brightedgeImageDomain 'addWebsiteDomain' 'medianlpath'}}{{removeImageUrlProtocol bannerUrl}}" alt="{{bannerAltText}}" id="banner_img_{{@index}}"/>
											</a>
										</div>
									</div>
								</li>
							{{/each}}
						</ul>
					</div>
				</div>
			{{/if}}
		</div>
	</div>
{{else}}
	<div class="home grid non-mobile">
		<div class="row-1-cell-1 cls-placeholder">
			{{#if showBannerCarousel}}
				<div class="home-slider-container">
					<div class="home-image-slider brands-slider">
						<ul data-slider class="home-image-slider-list">
							{{#each carouselImages}}
								<li>
									<div class="home-slide-main-container">
										<div class="home-slide-image-container" {{objectToAtrributes this}}>
											<a href="{{bannerHref}}" class="home-slider-banner-link" id="banner_{{@index}}">
												<img src="{{brightedgeImageDomain 'addWebsiteDomain' 'medianlpath'}}{{removeImageUrlProtocol bannerUrl}}" alt="{{bannerAltText}}" id="banner_img_{{@index}}" />
											</a>
										</div>
									</div>
								</li>
							{{/each}}
						</ul>
					</div>
				</div>
			{{/if}}
		</div>
	</div>
{{/if}}
