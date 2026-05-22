{{#if showTrendingCategories}}
    <div class="top-trending-categories">
    <div class="label-top-trending-categories">
        <strong>Trending Categories</strong>
    </div>
        <ul>
            {{#each trendingSearchCategories}}
                <li>
                    <div class="trending-category" >
                        <a class="trending-category-link" data-hashtag="{{custrecord_tsc_related_cat_link}}" data-touchpoint="home" >{{custrecord_tsc_corrected_search_term}}</a>
                    </div>                
                </li>
            {{/each}}
        </ul>
    </div>
{{/if}}