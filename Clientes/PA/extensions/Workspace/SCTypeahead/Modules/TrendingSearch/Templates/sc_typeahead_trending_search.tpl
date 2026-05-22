{{#if showView}}
    <div class="trending-searches">
        {{#if showTrendingCategories}}
            <div class="trending-catgories" data-view="Trending.Categories"></div>
        {{/if}}

        {{#if showTrendingProducts}}
            <div class="trending-products" data-view="Trending.Products"></div>
        {{/if}}

        {{#if showRecentlySearched}}
            <div class="recently-search" data-view="Recently.Search"></div>
        {{/if}}

        {{#if showCloseIcon}}
            {{#if isMobile}}
                <a class="close-trending-searches" data-action="close-trending-searches"></a>
            {{/if}}
        {{/if}}
    </div>
{{/if}}