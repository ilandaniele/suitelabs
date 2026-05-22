<div class="user-sitemap">
    <div class="container">
        <div class="row">
            <div class="col-xs-12" data-cms-area="site_map_cms_a" data-cms-area-filters="path">
            </div>
        </div>
        {{#each categories}}
            <div class="row sitemap-row">
                <div class="col-xs-12">
                    <h2>{{title}}</h2>
                </div>
                {{#each values}}
                    {{#if label}}
                    <div class="col-xs-12 col-sm-4">
                        <a href="/{{../url}}/{{url}}">
                            {{label}}
                        </a>
                    </div>
                    {{/if}}
                {{/each}}
            </div>
            <br>
            <br>
        {{/each}}
        <!--
        This prints out all the facets and corresponding url's
        {{#each facets}}
        <div class="row">
            <h1>{{url}}:</h1>
            {{#each values}}
            <div class="col-sm-4">
                <a href="{{../url}}+{{url}}">
                    {{label}}
                </a>
            </div>
            {{/each}}
        </div>
        <br>
        <br>
        {{/each}}-->
        <div class="row">
            <div class="col-xs-12" data-cms-area="site_map_cms_b" data-cms-area-filters="path">
            </div>
        </div>
    </div>
</div>