<nav class="header-menu-secondary-nav">

	<!-- <div class="header-menu-search"> -->
		<!-- <div data-view="SiteSearchView"></div> -->
		<!-- START of removal of original search functionality -->
		<!-- 
			Commented the below code. The code is the default search functionality of the template to bring the search bar from under the secondary nav area. Since
			we want to have the search visible at all times, we're commenting the code below
		-->
		<!--<button class="header-menu-search-link" data-action="show-sitesearch" title="{{translate 'Search'}}">
			<i class="header-menu-search-icon"></i>
		</button>-->
		<!-- END of removal of original search functionality -->
	<!-- </div> -->

		
	<ul class="header-menu-level1">
		<!-- <li class="header-menu-item">
            <a class="header-menu-home-anchor" id="home-icon" href="/" data-touchpoint="home" data-hashtag="#/"><i class="fa fa-home header-menu-home-icon"></i> 
            {{translate 'Home'}}
            </a>
		</li> -->
		
		{{#each categories}}
		{{#unless hidefordesktop}}
			{{#if text}}
				<li {{#if categories}}data-toggle="categories-menu"{{/if}} class="{{ternary isgroup 'default' 'relative'}}{{#ifCond isBannersEnabled '||' enableColumnMenu}} hasbanners{{/ifCond}} {{#if enableColumnMenu}}column-menu-link{{else}}no-column-menu-link{{/if}}">
					
					{{#ifEquals text "Deals"}}
						<a class="{{class}} deals-link-desktop" {{objectToAtrributes this}}>
							<img class="dealsImage" src="{{getThemeAssetsPath 'img/deals.svg'}}">
							{{translate text}}
						</a>
					{{else}}
						<a class="{{class}}" {{objectToAtrributes this}}>
							{{translate text}}
						</a>
					{{/ifEquals}}
					{{#if categories}}
					<div class="{{ternary isgroup 'header-menu-level-container dropdown' 'header-menu-level-container'}}{{#ifCond isBannersEnabled '||' enableColumnMenu}} hasbanners{{/ifCond}} {{#if enableColumnMenu}}column-menu-wrapper{{/if}}">
						{{#if enableColumnMenu}}
							<span class="column-menu-close">&times;</span>
							<div class="column-menu-container">
						{{/if}}					
						{{#if isgroup}}
							{{#if ../isSaleAvailable}}							
								<ul class="header-menu-level2">
									{{#each ../saleCategory.categories}}
										<li class="sale-wrapper">
											<a class="{{class}}" {{objectToAtrributes this}}>
												{{translate text}}
											</a>
										</li>
									{{/each}}
								</ul>
							{{/if}}
						{{/if}}
						<ul class="header-menu-level2">
							{{#if enableColumnMenu}}
								<li class="column-menu-heading">
									<a class="column-menu-heading-link header-menu-level3-anchor" {{objectToAtrributes ../this}}>
										{{translate text}}
									</a>
								</li>
							{{/if}}	
							{{#each categories}}
							<li class="{{ternary isgroup 'header' 'category'}} {{translate text}}" {{#if ../enableColumnMenu}}data-trigger="{{translate text}}" data-action="column-menu-trigger-point"{{/if}}>

								{{#if isgroup}}
									<p> {{translate text}} </p>
								{{else}}
									<a {{objectToAtrributes this}} class="{{#unless has-no-third-level-category}}{{#if @first}}column-menu-link-active{{/if}}{{/unless}}  {{#ifCond ../enableColumnMenu '&&' has-no-third-level-category}}has-no-third-level-category{{/ifCond}}">{{translate text}}
										{{#if ../enableColumnMenu}}
											<i class="fa fa-angle-right" aria-hidden="true"></i>
										{{/if}}
									</a>
								{{/if}}
								{{#unless ../enableColumnMenu}}
									{{#if categories}}
										<ul class="header-menu-level3">
											{{#each categories}}
											<li class="{{#if categories}}hasChild{{/if}}">
												<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
												{{#if categories}}
												<ul class="header-menu-level4">
													{{#each categories}}
														<li>
															<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
														</li>
													{{/each}}
												</ul>
											{{/if}}
											</li>
											{{/each}}
										</ul>
									{{/if}}
								{{/unless}}
							</li>
							{{/each}}
							<div class="clearfix"></div>
						</ul>
						<div class="header-menu-level3-column-container">
							{{#if enableColumnMenu}}
								{{#each categories}}
									{{#if categories}}
										<ul class="header-menu-level3 {{#if @first}}column-menu-link-active{{/if}}" data-target="{{translate text}}">
											{{#each categories}}
												<!-- {{#ifCond @index '==' 0}}
													<li>
														<ul class="third-level-menu-column">
												{{/ifCond}} -->
														<li class="{{#if categories}}hasChild{{/if}}">
															<a class="{{class}} {{#if markAsSaleLink}}column-menu-sale-link{{/if}}" {{objectToAtrributes this}}>{{translate text}}</a>
														</li>
												<!-- {{#if breakColumn}}
														</ul>
													</li>
													<li>
														<ul class="third-level-menu-column">
												{{/if}} -->
											{{/each}}
												<!-- </ul>
											</li> -->
										</ul>
									{{/if}}
								{{/each}}
							{{/if}}
						</div>
						{{#if isBannersEnabled}}
							{{#if banners}}
								<ul class="banners-wrapper">
									{{#each banners}}
										{{#if title}}
											<li class="banner-wrapper">
												<div class="header-menu-brand-cat-action-container">
													<div class="latest-external-review img-title-box-up">
														<a class="bg-external-review-link">
															<img class="bg-external-review" src="{{brightedgeImageDomain 'addWebsiteDomain' 'nothumb' }}{{imageurl}}" alt="{{bannerAltText}}">
														</a>
														<div class="title-external-review">
															<div class="latest-re">Latest Review </div>
															<div class="latest-external-review-title">{{title}} </div> 
															<div class="learn-more-url">
																<a href="{{redirecturl}}" rel="noopener noreferrer nofollow" target="_blank"> LEARN MORE </a>
															</div>
														</div>
													</div>					
												</div>
											</li>
										{{else}}
											<li class="banner-wrapper">
												<div class="header-menu-brand-cat-action-container">
													<img class="header-menu-brand-cat-img" src="{{brightedgeImageDomain 'addWebsiteDomain' 'nothumb'}}{{imageurl}}" alt="{{bannerAltText}}">
													<a class="header-menu-brand-cat-button" href="{{redirecturl}}" data-touchpoint="home" data-hashtag="#{{redirecturl}}" data-promotion-id="{{bannerPromotionID}}" data-promotion-name="{{bannerPromotionName}}">
														Shop Now
													</a>
												</div>
											</li>
										{{/if}}
									{{/each}}	
								</ul>															
							{{/if}}
						{{/if}}
						<div class="clearfix"></div>
						{{#if enableColumnMenu}}
							</div>
						{{/if}}	
					</div>
					{{/if}}
				</li>
			{{/if}}
		{{/unless}}
		{{/each}}
	</ul>
</nav>




{{!----
Use the following context variables when customizing this template: 
	
	categories (Array)
	showExtendedMenu (Boolean)
	showLanguages (Boolean)
	showCurrencies (Boolean)

----}}
