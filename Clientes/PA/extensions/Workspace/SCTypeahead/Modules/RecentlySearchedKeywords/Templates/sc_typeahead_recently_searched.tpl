{{#if recentKeywordsPositiveLength}}
    <div class="recently-searched">    
        <div class="label-recently-searched">
            <strong>Recently Searched</strong>
        </div>
        <ul>
            {{#each recentKeywords}}
                <li>
                    <div class="recent-search-keyword">
                        <a class="recent-keyword-link" data-action="apply-rencent-search">{{this.key}}</a>
                        <a class="recent-search-keyword-remove-icon" data-action="remove-key" data-index="{{this.data_index}}" data-key="{{this.key}}"></a>
                    </div>
                </li>
            {{/each}}
        </ul>
    </div>
{{/if}}