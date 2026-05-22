<section class="store-credits-list">
	<header class="store-credits-list-header">
		<h2>{{pageHeader}}</h2>
	</header>

	<div data-view="ListHeader" {{#if openIsActive}}style="display:none;"{{/if}}></div>

	{{#if collectionLengthGreaterThan0}}
	<div class="store-credits-list-recordviews-container">
		<table class="store-credits-list-recordviews-actionable-table">
			<thead class="store-credits-list-recordviews-actionable-header">
				<tr>
                    {{#each columns}}
                        <th class="store-credits-list-recordviews-actionable-{{type}}-header">
                            <span>{{label}}</span>
                        </th>
                    {{/each}}
				</tr>
			</thead>
			<tbody class="store-credits-list" data-view="StoreCredits.Results"></tbody>
		</table>
	</div>

	{{else}}
		{{#if isLoading}}
			<p class="store-credits-list-empty">{{translate 'Loading...'}}</p>
		{{else}}
			<div class="store-credits-list-empty-section">
				<h5>{{translate 'You don\'t have any store credits in your account right now'}}</h5>
			</div>
		{{/if}}

	{{/if}}

	{{#if showPagination}}
		<div class="store-credits-list-case-list-paginator">
			<div data-view="GlobalViews.Pagination"></div>
			{{#if showCurrentPage}}
				<div data-view="GlobalViews.ShowCurrentPage"></div>
			{{/if}}
		</div>
	{{/if}}
</section>



{{!----
Use the following context variables when customizing this template:

	pageHeader (String)
	collectionLengthGreaterThan0 (Boolean)
	isLoading (Boolean)
	showPagination (Boolean)
	showBackToAccount (Boolean)
	isSCISIntegrationEnabled (Boolean)
	allIsActive (Boolean)
	openIsActive (Boolean)
	inStoreIsActive (Boolean)

----}}
