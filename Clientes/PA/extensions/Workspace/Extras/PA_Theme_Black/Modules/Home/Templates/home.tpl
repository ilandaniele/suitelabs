{{#if isMobile}}
	<div class="home grid mobile">

		<div class="row-1-cell-1 cls-placeholder" data-cms-area="home_banner_mobile_one_column_1" data-cms-area-filters="path"></div>
		
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
												<img data-url="{{bannerHref}}" class="home-img-banner-link" src="{{brightedgeImageDomain 'addWebsiteDomain' 'medianlpath'}}{{removeImageUrlProtocol bannerUrl}}" alt="{{bannerAltText}}" id="banner_img_{{@index}}"/>
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
		
		<div class="row-3-cell-1 fs-0 cls-placeholder" data-cms-area="home_mobile_two_column_1" data-cms-area-filters="path"></div>
		<div class="row-3-cell-2 fs-0 cls-placeholder" data-cms-area="home_mobile_two_column_2" data-cms-area-filters="path"></div>

		<div class="row-4-cell-1 cls-placeholder" data-cms-area="home_mobile_three_column_1" data-cms-area-filters="path"></div>
		<div class="row-4-cell-2 cls-placeholder" data-cms-area="home_mobile_three_column_2" data-cms-area-filters="path"></div>
		<div class="row-4-cell-3 cls-placeholder" data-cms-area="home_mobile_three_column_3" data-cms-area-filters="path"></div>
		
		<div class="row-5-cell-1 cls-placeholder" data-cms-area="home_banner_mobile_one_column_2" data-cms-area-filters="path"></div>

		<div class="row-6-cell-1 cls-placeholder" data-cms-area="home_mobile_two_column_3" data-cms-area-filters="path"></div>
		<div class="row-6-cell-2 cls-placeholder" data-cms-area="home_mobile_two_column_4" data-cms-area-filters="path"></div>

		<div class="row-7-cell-1 cls-placeholder" data-cms-area="home_mobile_three_column_4" data-cms-area-filters="path"></div>
		<div class="row-7-cell-2 cls-placeholder" data-cms-area="home_mobile_three_column_5" data-cms-area-filters="path"></div>
		<div class="row-7-cell-3 cls-placeholder" data-cms-area="home_mobile_three_column_6" data-cms-area-filters="path"></div>

		<div data-view="Items.NewArrivals" class="row-8-cell-1 cls-placeholder"></div>
		<div data-view="Items.TopSelling" class="row-9-cell-1 cls-placeholder"></div>
		<div data-view="Items.DealProducts" class="row-10-cell-1 cls-placeholder"></div>
		
		<div class="row-11-cell-1 cls-placeholder" data-cms-area="home_banner_mobile_one_column_3" data-cms-area-filters="path"></div>

	</div>
{{else}}
	<div class="home grid non-mobile">
		<div class="row-1-cell-1 cls-placeholder" data-cms-area="home_banner_desktop_one_column_1" data-cms-area-filters="path"></div>

		<div class="row-2-cell-1 cls-placeholder" data-cms-area="home_desktop_two_column_10_1" data-cms-area-filters="path"></div>
		<div class="row-2-cell-2 cls-placeholder" data-cms-area="home_desktop_two_column_2_2" data-cms-area-filters="path"></div>

		<div class="row-3-cell-1 cls-placeholder">
			{{#if showBannerCarousel}}
				<div class="home-slider-container">
					<div class="home-image-slider brands-slider">
						<ul data-slider class="home-image-slider-list">
							{{#each carouselImages}}
								<li>
									<div class="home-slide-main-container">
										<div class="home-slide-image-container" {{objectToAtrributes this}}>
											<a href="{{bannerHref}}" class="home-slider-banner-link" id="banner_{{@index}}">
												<img data-url="{{bannerHref}}" class="home-img-banner-link" src="{{brightedgeImageDomain 'addWebsiteDomain' 'medianlpath'}}{{removeImageUrlProtocol bannerUrl}}" alt="{{bannerAltText}}" id="banner_img_{{@index}}" />
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
		<div class="row-3-cell-2 featuted-brand-CMS cls-placeholder">
			<div class="home-main-full" data-cms-area="home_cms_area_slider_for_desktop" data-cms-area-filters="path"></div>
		</div>

		<div class="row-4-cell-1 cls-placeholder" data-cms-area="home_desktop_two_column_1" data-cms-area-filters="path"></div>
		<div class="row-4-cell-2 cls-placeholder" data-cms-area="home_desktop_two_column_2" data-cms-area-filters="path"></div>

		<div class="row-5-cell-1 cls-placeholder" data-cms-area="home_banner_desktop_one_column_2" data-cms-area-filters="path"></div>

		<div class="row-6-cell-1 cls-placeholder" data-view="Items.NewArrivals"></div>
		<div  class="row-7-cell-1 cls-placeholder" data-view="Items.TopSelling"></div>
		<div  class="row-8-cell-1 cls-placeholder" data-view="Items.DealProducts"></div>

		<div class="row-9-cell-1 merchandising-zone-wrapper cls-placeholder" data-cms-area="home_cms_area_4" data-cms-area-filters="path"></div>

		<div class="row-10-cell-1 home-merchandizing-zone cls-placeholder" data-id="your-merchandising-zone" data-type="merchandising-zone"></div>

		<div class="row-11-cell-1 cls-placeholder" data-cms-area="home_banner_desktop_one_column_3" data-cms-area-filters="path"></div>
	</div>
{{/if}}

{{!----
Use the following context variables when customizing this template:
	imageHomeSize (String)
	imageHomeSizeBottom (String)
	carouselImages (Array)
	bottomBannerImages (Array)
----}}