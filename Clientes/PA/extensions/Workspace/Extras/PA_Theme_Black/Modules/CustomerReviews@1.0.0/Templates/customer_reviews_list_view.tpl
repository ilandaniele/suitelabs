<section>
    <header class="order-history-list-header">
		<h2>{{pageHeader}}</h2>
    </header>
    
    <div data-view="ListHeader"></div>

    {{#if collectionLengthGreaterThan0}}
        {{#if false}}
            <div data-view="Reviews.Collection.View"></div> 
        {{/if}}
        {{!---- 
            <table class="product-list-details-list-items reviews" data-type="product-list-items">
                <tbody data-view="Reviews.Collection.View"></tbody>
            </table> 
        ----}}
        <div class="product-reviews-list-items-container">
            <div data-view="Reviews.Collection.View"></div>
        </div>
    {{else}}
		{{#if isLoading}}
            <p class="order-history-list-empty">{{translate 'Loading...'}}</p>
        {{else}}
            <div class="product-reviews-collection-empty-message-wrapper">
                <h4>You have not reviewed any product yet.</h4>
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