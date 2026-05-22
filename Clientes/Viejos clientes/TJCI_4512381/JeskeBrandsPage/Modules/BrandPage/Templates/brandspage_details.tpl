<div class="facets-items-collection-view-cell-span3">
    <div class="facets-item-cell-grid">
        <div class="facets-item-cell-grid-image-wrapper">
            <a class="facets-item-cell-grid-link-image" href="{{brandlink}}">
                <img class="facets-item-cell-grid-image" src="{{brandimage}}" />
            </a>
        </div>
        <div class="facets-item-cell-grid-details">
            {{#if brandname}}
            <a class="facets-item-cell-grid-title" href="{{brandlink}}">{{brandname}}</a>
            {{else}}
            <a class="facets-item-cell-grid-title" href="{{brandlink}}">No Name</a>
            {{/if}}
        </div>
    </div>
</div>