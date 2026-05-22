<div class="facets-horizontal-nav-container">
    {{#each standaloneFacets}}
        <div class="facets-horizontal-nav facets-faceted-navigation-item-facet-group-expander collapsed" data-action="show-facet-menu" data-facet-id="{{id}}">
            {{name}}
            <i class="facets-faceted-navigation-item-facet-group-expander-icon" data-action="show-facet-menu" data-facet-id="{{id}}"></i>
        </div>
    {{/each}}

    <div class="facets-horizontal-more-filters" data-action="show-facet-menu" data-facet-id="all">More Filters</div>
</div>