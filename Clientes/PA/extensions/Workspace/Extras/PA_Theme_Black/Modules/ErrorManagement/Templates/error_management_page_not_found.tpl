<div class="error-management-page-not-found">
	<div data-cms-area="error_management_page_not_found_cms_area_1" data-cms-area-filters="path"></div>

    <div class="error-management-page-not-found-header">
	{{#if pageHeader}}
		<h1>{{pageHeader}}</h1>
	{{/if}}
    </div>
    <div id="page-not-found-content" class="error-management-page-not-found-content">
    	{{pageNotFoundText}}
    </div>
	{{#if show404Banner}}
	<div id="main-banner" class="error-management-page-not-found-main-banner">
		<a href="{{pageLink}}" class="error-management-page-not-found-main-banner-link">
			<img src="{{bannerLink}}" alt="{{bannerAltText}}" class="error-management-page-not-found-main-banner-img">
		</a>
	</div>
	{{/if}}
	<div class="page-not-found-top-selling-section">
		<div data-view="PageNotFound.Items.TopSelling"></div>
	</div>
    <div data-cms-area="error_management_page_not_found_cms_area_2" data-cms-area-filters="path"></div>
</div>



{{!----
Use the following context variables when customizing this template:

	title (String)
	pageHeader (String)

----}}
