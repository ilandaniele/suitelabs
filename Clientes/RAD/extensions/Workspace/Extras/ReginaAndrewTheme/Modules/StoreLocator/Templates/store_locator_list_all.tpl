<div class="store-locator-list-all-main">
	<h3>{{translate 'Store List'}}</h3>

	{{#if showList}}
		<ul data-view="StoreLocatorListAllStoreView" class="store-locator-list-all-container clearfix"></ul>
        <div>
            <a href="/storelist" data-hashtag="#stores" data-touchpoint="home" class="button-secondary button-medium">{{translate 'Back to store locator'}}</a>
        </div>
        <br>
		<div data-view="GlobalViews.Pagination"></div>
	{{else}}
		<div class="store-locator-list-all-container">
			<p>{{translate 'The list of stores is not available.'}}</p>
		</div>
	{{/if}}
</div>



{{!----
Use the following context variables when customizing this template:

	showList (Boolean)

----}}
