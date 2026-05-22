<div class="header-sidebar-wrapper" data-type="header-sidebar-menu">
	<a href="#" class="hide-sidebar-button" data-action="header-sidebar-hide">
		<i class="icon-times"></i>
	</a>
	<div class="header-sidebar-profile-menu" data-view="Header.Profile"></div>
	<div class="header-sidebar-menu-wrapper">

		<ul class="header-sidebar-menu">
			<li>
                <a class="header-menu-home-anchor" id="home-icon" href="/" data-touchpoint="home" data-hashtag="#/"><i class="header-menu-home-icon" id="header-menu-home-icon-mobile"></i></a>
            </li>
			{{#if showExtendedMenu}}
			<li class="header-sidebar-menu-myaccount" data-view="Header.Menu.MyAccount" data-parent-menu="false"></li>
			{{!-- <li>
				<a href="http://track.primaryarms.com/" target="_blank" class="get-tracking-button"> 
					<img class="pa-icon icon-trakmy-order" src="{{getThemeAssetsPathWithDefault iconTrackOrder 'img/Icons/track-order-icon.svg'}}" alt="Track My Order" width="20" height="20">
					<span class="pa-caption tracking-order-text">
						{{translate 'Track my Order'}} 
					</span>
				</a>
			</li> --}}
			<!-- <li class="QuickOrderHeaderLink" data-view="QuickOrderHeaderLink"></li> -->
			{{/if}}
            <li>
				<a class="header-menu-scope-finder" id="scope-finder-sm" href="/productfinder" data-action="trigger-product-finder" data-touchpoint="home" data-hashtag="#/productfinder">{{translate 'Scope Finder'}}</a>
			</li>
		    {{#unless isStandalone}}
			{{#each categories}}
			{{#unless hideformobile}}
				{{#if text}}
				<li class="{{#if @last}}header-sidebar-menu-lastoption{{/if}}" data-parent-menu="false">
					<a {{#unless categories}}{{objectToAtrributes this}}{{/unless}} class="header-sidebar-menu-lv1-anchor collapsed {{#ifEquals text 'Deals'}} dealblock {{/ifEquals}}" id={{id}} {{#if categories}}data-toggle="collapse" data-target="#{{id}}-categories"{{/if}} name="{{text}}">
						{{#ifEquals text "Deals"}}
						<img class="dealsImage" src="{{getThemeAssetsPath 'img/deals.svg'}}">{{text}}
						{{else}}
						{{text}}
						{{/ifEquals}}
						{{#if categories}}<i class="header-sidebar-menu-accordion-icon"></i>{{/if}}
					</a>
					{{#if categories}}
					<ul class="header-sidebar-menu-lv2-wrapper" id="{{id}}-categories">
						{{!-- <li>
							<a href="#" class="header-sidebar-menu-back" data-action="pop-menu" name="back-sidebar">
								<i class="header-sidebar-menu-pop-icon"></i>
								{{translate 'Back'}}
							</a>
						</li> --}}
						{{#each categories}}
							{{#if class}}
								<li>
									<a class="{{class}}" {{#unless categories}}{{objectToAtrributes this}}{{/unless}} {{#if categories}}data-action="push-menu"{{/if}}  name="{{text}}">
										{{text}}
										{{#if categories}}<i class="header-sidebar-menu-push-icon"></i>{{/if}}
									</a>
									<ul class="header-sidebar-menu-lv3-wrapper">
										{{#if categories}}
										<li class="header-sidebar-menu-action-button-wrapper">
											<a href="#" class="header-sidebar-menu-back" data-action="pop-menu" name="back-sidebar">
												<i class="header-sidebar-menu-pop-icon"></i>{{text}}
											</a>
											<a href="#" class="header-sidebar-menu-close" data-action="header-sidebar-hide">
												<i class="icon-times"></i>
											</a>
										</li>
										{{#each categories}}
											{{#if class}}
											<li>
												<a class="{{class}}" {{objectToAtrributes this}} name="{{text}}" {{#if categories}}data-action="push-menu"{{/if}}>{{text}}{{#if categories}}<i class="header-sidebar-menu-push-icon"></i>{{/if}}</a>
												{{#if categories}}
												<ul class="header-sidebar-menu-lv4-wrapper">
													<li class="header-sidebar-menu-action-button-wrapper">
														<a href="#" class="header-sidebar-menu-back" data-action="pop-menu">
															<i class="header-sidebar-menu-pop-icon"></i>{{text}}
														</a>
														<a href="#" class="header-sidebar-menu-close" data-action="header-sidebar-hide">
															<i class="icon-times"></i>
														</a>
													</li>
													<li>
														<a {{objectToAtrributes this}} name="{{text}}">
															{{translate 'All '}}{{text}}{{translate ' products'}}
														</a>
													</li>
													{{#each categories}}
													<li>
														<a {{objectToAtrributes this}} name="{{text}}">{{text}}</a>
													</li>
													{{/each}}
												</ul>
												{{/if}}
											</li>
											{{/if}}
										{{/each}}
									{{/if}}
									</ul>
								</li>
							{{/if}}
						{{/each}}
					</ul>
					{{/if}}
				</li>
				{{/if}}
			{{/unless}}
			{{/each}}
			{{/unless}}

			{{!-- {{#if showExtendedMenu}}
				<li class="header-sidebar-menu-myaccount" data-view="Header.Menu.MyAccount"></li>
			{{/if}} --}}
			{{!--#unless isStandalone}}
			<!-- <li data-view="QuickOrderHeaderLink"></li> -->
			<li data-view="RequestQuoteWizardHeaderLink"></li>
			<li data-view="StoreLocatorHeaderLink"></li>
			{{/unless--}}
			<li>
				<a class="header-menu-faq-button" id="header-menu-faq-button" href="/faq" data-action="navigateToFaqPage" data-touchpoint="home" data-hashtag="#/faq">{{translate 'FAQ'}}</a>
			</li>
			<li>
				<a class="header-menu-agencies-button" id="header-menu-agencies-button" href="/agencies-dealers" data-action="navigateToagenciesPage" data-touchpoint="home" data-hashtag="#/agencies-dealers">{{translate 'Agencies & Dealers'}}</a>
			</li>
			<li>
				<a class="header-menu-help-button" id="header-menu-help-button" href="/contact-us" data-touchpoint="home" data-hashtag="#/contact-us" data-action="navigateToHelpWindow" >{{translate 'Help'}}</a>
			</li>
		</ul>

	</div>

	{{#if showExtendedMenu}}
	<a class="header-sidebar-user-logout" href="#" data-touchpoint="logout" name="logout">
		<i class="header-sidebar-user-logout-icon"></i>
		{{translate 'Sign Out'}}
	</a>
	{{/if}}

	{{#if showLanguages}}
	<div data-view="Global.HostSelector"></div>
	{{/if}}
	{{#if showCurrencies}}
	<div data-view="Global.CurrencySelector"></div>
	{{/if}}

</div>



{{!----
Use the following context variables when customizing this template:

	categories (Array)
	showExtendedMenu (Boolean)
	showLanguages (Boolean)
	showCurrencies (Boolean)

----}}
