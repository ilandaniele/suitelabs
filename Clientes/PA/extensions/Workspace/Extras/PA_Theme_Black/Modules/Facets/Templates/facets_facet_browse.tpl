<section class="facets-facet-browse">
	<div data-cms-area="item_list_banner" data-cms-area-filters="page_type"></div>
	<div data-cms-area="media_kit_advertise_top" data-cms-area-filters="path"></div>

	{{#if showResults}}
		<header class="facets-facet-browse-header">
			{{!-- {{#if isDesktopDevice}}
				<div class="facet-category-title">
				{{#ifEquals title 'Products'}}
					<h1 class="facets-browse-category-heading">{{translate 'Shop'}}</h1>
				{{else}}
					<h1 class="facets-browse-category-heading">{{title}}</h1>
				{{/ifEquals}}	
				{{#unless showItems}}
				</div>
				{{/unless}}
			{{/if}} --}}
			{{#if showItems}}
				
					<div class="facets-facet-browse-title" data-quantity="{{total}}">
						{{#if keywords}}
							<div class="facets-facet-browse-title-number">
								{{#if isTotalProductsOne}}
								{{translate '1 Result for'}}
								{{else}}
								{{translate '$(0) Results for' total}}
								{{/if}}
							</div>
							<div class="facets-facet-browse-title-container">
								<h1>{{translate '$(0)' keywords}}{{additionalFilters}}</h1>
							</div>
						{{else}}
							<div class="facets-facet-browse-title-number">
								{{#if isTotalProductsOne}}
								{{translate '1'}}
								{{else}}
								{{translate '$(0)' total}}
								{{/if}}
							</div>
							<div class="facets-facet-browse-title-container">
								<h1>{{category}}{{additionalFilters}}</h1>
							</div>
						{{/if}}
					</div>
				</div>
				
			<nav class="facets-facet-browse-list-header">
				<div class="facets-facet-browse-list-header-actions" data-view="Facets.ItemListDisplaySelector"></div>

				<div class="facets-facet-browse-list-header-expander">
					<button class="facets-facet-browse-list-header-expander-button sort-n-filter collapsed" data-toggle="collapse" data-target="#list-header-filters" aria-expanded="true" aria-controls="list-header-filters">
						{{translate 'Sort'}}
						<i class="facets-facet-browse-list-header-expander-icon"></i>
					</button>
					{{#if hasItemsAndFacets}}
						<div class="facets-facet-browse-list-header-filter-column narrow-by">
							<button class="facets-facet-browse-list-header-filter-facets narrow-by" data-type="sc-pusher" data-target="product-search-facets">
								{{translate 'Filter'}}
								<i class="facets-facet-browse-list-header-filter-facets-icon"></i>
							</button>
						</div>
					{{/if}}
				</div>

				<div class="facets-facet-browse-list-header-filters collapse" id="list-header-filters">
					<div class="facets-facet-browse-list-header-filters-wrapper">

						<div class="facets-facet-browse-list-header-filters-row">

							<div class="facets-facet-browse-list-header-filter-column" data-view="Facets.ItemListShowSelector">
							</div>

							<div class="facets-facet-browse-list-header-filter-column" data-view="Facets.ItemListSortSelector">
							</div>
						</div>

					</div>
				</div>
        
			</nav>
			<div class="hide-out-of-stock-header">
				<div data-view="Hide.OutOfStock.View"></div>
			</div>
			{{/if}}
			{{#if isCompareEnabled }}
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
						<div class="compare-panel" data-view="ComparePanelFooter"></div>
					</div>
				</div>
			</div>
			{{/if}}
		</header>
		<hr class="divider">
		<div class="facets-facet-browse-content">

			<div class="facets-facet-browse-facets" data-action="pushable" data-id="product-search-facets">

				<div data-cms-area="facet_navigation_top" data-cms-area-filters="page_type"></div>
				<div data-cms-area="media_kit_advertise_navigation-section" data-cms-area-filters="path"></div>
				{{#if isCategory}}
					<div data-view="Facets.CategorySidebar" class="facets-facet-browse-facets-sidebar"></div>
				{{else}}
					{{!-- <div data-view="Facets.FacetedNavigation.Item" data-facet-id="custitem_cc_1"></div> --}}
					<div data-view="Facets.Related.CategorySidebar" class="facets-facet-browse-facets-sidebar"></div>
				{{/if}}

				<div data-view="Facets.FacetedNavigation" data-exclude-facets="commercecategoryname,category, custitem_cc_1, custitem_cc_2, custitem_cc_3"></div>

				<div data-cms-area="facet_navigation_bottom" data-cms-area-filters="page_type"></div>
			</div>

			<!--
			Sample of how to add a particular facet into the HTML. It is important to specify the data-facet-id="<facet id>"
			properly <div data-view="Facets.FacetedNavigation.Item" data-facet-id="custitem1"></div>
			 -->

			<div class="facets-facet-browse-results">

				{{#if isCategory}}
					<div class="facets-facet-browse-category">
						<div data-view="Facets.Browse.CategoryHeading"></div>
						{{#if hasSubcategories}}
							<div class="sub-category-dropdown-wrapper">
								<button type="button" data-toggle="collapse" data-target="#sub-category-dropdown" aria-expanded="false" aria-controls="sub-category-dropdown" class="collapsed">
									{{#if isDesktopDevice}}
										{{ translate 'Popular Categories' }}
									{{else}}
										{{#ifEquals title 'Products'}}
											<h1 class="facets-browse-category-heading">{{translate 'Shop'}}</h1>
										{{else}}
											<h1 class="facets-browse-category-heading">{{title}}</h1>
										{{/ifEquals}}
										{{#if showItems}}
											<p class="facets-facet-browse-title" data-quantity="{{total}}"> {{#if keywords}}
													{{#if isTotalProductsOne}}
														({{translate '1 Result for <span class="facets-facet-browse-title-alt">$(0)</span>' keywords}})
													{{else}}
														({{translate '$(0) Results for <span class="facets-facet-browse-title-alt">$(1)</span>' total keywords}})
													{{/if}}
												{{else}}
													{{#if isTotalProductsOne}}
														({{translate '1 Product'}})
													{{else}}
														({{translate '$(0) Products' total}})
													{{/if}}
												{{/if}}
											</p>
										{{/if}}
									{{/if}}
								</button>
								<div class="collapse" id="sub-category-dropdown">
									<div class="card card-body">
										<div data-view="Facets.CategoryCells"></div>
									</div>
								</div>
							</div>
						{{else}}
							{{#unless isDesktopDevice}}
								<div class="sub-category-dropdown-wrapper">
									<button class="without-angle">
										{{#ifEquals title 'Products'}}
											<h1 class="facets-browse-category-heading">{{translate 'Shop'}}</h1>
										{{else}}
											<h1 class="facets-browse-category-heading">{{title}}</h1>
										{{/ifEquals}}
										{{#if showItems}}
											<p class="facets-facet-browse-title" data-quantity="{{total}}"> {{#if keywords}}
													{{#if isTotalProductsOne}}
														({{translate '1 Result for <span class="facets-facet-browse-title-alt">$(0)</span>' keywords}})
													{{else}}
														({{translate '$(0) Results for <span class="facets-facet-browse-title-alt">$(1)</span>' total keywords}})
													{{/if}}
												{{else}}
													{{#if isTotalProductsOne}}
														({{translate '1 Product'}})
													{{else}}
														({{translate '$(0) Products' total}})
													{{/if}}
												{{/if}}
											</p>
										{{/if}}
									</button>
								</div>
							{{/unless}}
						{{/if}}
					</div>
				{{/if}}

				{{#unless isDesktopDevice}}
					{{#ifEquals title 'Products'}}
						<div class="facets-facet-browse-category">
							<div class="sub-category-dropdown-wrapper">
								<button class="without-angle shop-page-tab-heading">
									<h1 class="facets-browse-category-heading">{{translate 'Shop'}}</h1>
								</button>
							</div>
						</div>
					{{/ifEquals}}
				{{/unless}}

				

				<meta itemprop="name" content="{{title}}"/>

				<div data-cms-area="facets_facet_browse_cms_area_1" data-cms-area-filters="page_type"></div>

				<div id="banner-section-top" class="content-banner banner-section-top" data-cms-area="item_list_banner_top" data-cms-area-filters="path"></div>
				
				
				<div class="deal-plp-clock {{#if showDealCounter}}active{{/if}}" data-view="deal-clock"></div>
				

				{{#if showItems}}
					<div class="facets-facet-browse-narrowedby" data-view="Facets.FacetsDisplay"></div>

					{{#if isEmptyList}}
						<div data-view="Facets.Items.Empty"></div>
					{{else}}
						<div class="facets-facet-browse-items" data-view="Facets.Items"></div>
						{{#if infiniteScrollEnabled}}
							{{#unless autoLoadPages}}
								{{#if showLoadMoreButton}}
									<div class="inifinte-scroll-wrapper text-center">
										<button class="load-more" data-action="loadMore"> Load More Products </button>
									</div>					
								{{/if}}			
							{{/unless}}
						{{/if}}
					{{/if}}
				{{/if}}
			</div>

			<div class="facets-facet-browse-pagination" data-view="GlobalViews.Pagination"></div>
		</div>

		<div class="facets-facet-browse-cms-area-2" data-cms-area="media_kit_advertise_bottom" data-cms-area-filters="path"></div>
		<div class="facets-facet-browse-cms-area-2" data-cms-area="facets_facet_browse_cms_area_2" data-cms-area-filters="page_type"></div>

	{{else}}
		<div class="facets-facet-browse-empty-items" data-view="Facets.Items.Empty"></div>
	{{/if}}
	
	<!-- <div data-view="PLP.Related.Blogs" class="plp-related-blogs"></div> -->
	<div data-cms-area="media_kit_advertise_bottom_final" data-cms-area-filters="path"></div>
	<div data-view="Listrak.Recommender"></div>
	<div id="banner-section-bottom" class="content-banner banner-section-bottom facets-facet-browse-banner-section-bottom" data-cms-area="item_list_banner_bottom" data-cms-area-filters="page_type"></div>
	
</section>
{{!----
Use the following context variables when customizing this template:

	total (Number)
	isTotalProductsOne (Boolean)
	title (String)
	hasItemsAndFacets (Boolean)
	collapseHeader (Boolean)
	keywords (undefined)
	showResults (Boolean)
	isEmptyList (Boolean)
	isCategory (Boolean)
	showItems (Number)

----}}