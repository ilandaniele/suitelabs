<div id="banner-breadcrumb-top" class="content-banner banner-breadcrumb-top" data-cms-area="breadcrumb_top" data-cms-area-filters="global"></div>
<ol class="global-views-breadcrumb" itemscope  itemtype="https://schema.org/BreadcrumbList">
	{{#each pages}}
		{{#if @last}}
			<li  itemprop="itemListElement" itemscope
          itemtype="https://schema.org/ListItem" class="global-views-breadcrumb-item-active">
		  		<span itemprop="name">{{text}}</span>
				<meta itemprop="position" content={{plus @index}} />
			</li>
		{{else}}
			<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="global-views-breadcrumb-item">
				<a itemprop="item" href="{{href}}" 
					{{#if hasDataTouchpoint}} data-touchpoint="{{data-touchpoint}}" {{/if}}
					{{#if hasDataHashtag}} data-hashtag="{{data-hashtag}}" {{/if}}
				> 
					<span itemprop="name">{{text}}</span>
					<meta itemprop="position" content={{plus @index}} />
				</a>
			</li>
			<li class="global-views-breadcrumb-divider"><span class="global-views-breadcrumb-divider-icon"></span></li>
		{{/if}}
	{{/each}}
</ul>
<div id="banner-breadcrumb-bottom" class="content-banner banner-breadcrumb-bottom" data-cms-area="breadcrumb_bottom" data-cms-area-filters="global"></div>



{{!----
Use the following context variables when customizing this template: 
	
	pages (Array)

----}}
