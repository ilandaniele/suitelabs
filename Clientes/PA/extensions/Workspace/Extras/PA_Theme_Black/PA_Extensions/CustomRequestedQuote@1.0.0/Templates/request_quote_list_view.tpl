<section>
    <header class="order-history-list-header">
		<h2>{{pageHeader}}</h2>
        <p class="requested-quotes-instruction-message">{{requestedQuotesMessage}}</p>
    </header>
    
    <div data-view="ListHeader"></div>

    {{#if collectionLengthGreaterThan0}}
        <div class="product-reviews-list-items-container">
            <table class="quote-list-quotes-table">
				<thead class="quote-list-content-table">
					<tr class="quote-list-content-table-header-row">
						{{#each headcolumns}}
							<th class="quote-list-content-table-header-row-request">
								{{label}}
							</th>	
						{{/each}}
					</tr>
				</thead>
				<tbody>
                    {{#each datacolumns}}
                        <tr class="recordviews-row">
                            {{#each datacolumnvalue}}
                                <td>
                                    <span class="recordviews-label">{{label}} </span>   
                                    <span class="recordviews-value">{{value}}</span>
                                </td>
                             {{/each}}
                        </tr>
                    {{/each}}
                </tbody>
			</table>
        </div>
    {{else}}
		{{#if isLoading}}
            <p class="order-history-list-empty">{{translate 'Loading...'}}</p>
        {{else}}
            <div class="product-reviews-collection-empty-message-wrapper">
                <h4>You don't have any Requested Quotes yet.</h4>
            </div>
        {{/if}}
    {{/if}}

    {{#if showPagination}}
    <div class="order-history-list-case-list-paginator">
        <div data-view="GlobalViews.Pagination"></div>
        {{#if showCurrentPage}}
            <div data-view="GlobalViews.ShowCurrentPage"></div>
        {{/if}}
    </div>
	{{/if}}
</section>